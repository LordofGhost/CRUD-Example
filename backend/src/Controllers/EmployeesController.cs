using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace Jupiter.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EmployeesController : ControllerBase
{
    private readonly UserManager<Models.Employee> _userManager;
    private readonly SignInManager<Models.Employee> _signInManager;

    public EmployeesController(UserManager<Models.Employee> userManager, SignInManager<Models.Employee> signInManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
    }

    [HttpGet]
    [Authorize(Roles = "Manager")]
    public async Task<ActionResult<IEnumerable<Models.Employee>>> GetEmployees()
    {
        var users = await _userManager.Users.ToListAsync();
        var userWithRoles = new List<object>();

        foreach (var user in users)
        {
            var roles = await _userManager.GetRolesAsync(user);
            string? role = roles.ElementAtOrDefault(0);

            userWithRoles.Add(new
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Role = role
            });
        }

        return Ok(userWithRoles);
    }

    [HttpGet("{employeeEMail}")]
    [Authorize(Roles = "Manager")]
    public async Task<ActionResult<Models.Employee>> GetEmployee(string employeeEMail)
    {
        var user = await _userManager.FindByEmailAsync(employeeEMail.ToUpper());

        if (user == null)
        {
            return NotFound("This Employee doens't exists!");
        }

        var roles = await _userManager.GetRolesAsync(user);
        string? role = roles.ElementAtOrDefault(0);

        return Ok(new
        {
            Id = user.Id,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Email = user.Email,
            Role = role
        });
    }

    [HttpGet("me")]
    [Authorize]
    public async Task<ActionResult<Models.Employee>> GetMe()
    {
        var userEmail = User.Identity?.Name;
        if (string.IsNullOrEmpty(userEmail))
        {
            return Unauthorized();
        }

        var user = await _userManager.FindByNameAsync(userEmail);
        if (user == null)
        {
            return NotFound("This Employee doens't exists!");
        }

        var roles = await _userManager.GetRolesAsync(user);
        string? role = roles.ElementAtOrDefault(0);

        return Ok(new
        {
            Id = user.Id,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Email = user.Email,
            Role = role
        });
    }

    [HttpGet("role/{employeeEMail}")]
    [Authorize(Roles = "Manager")]
    public async Task<ActionResult<string>> GetEmployeeRole(string employeeEMail)
    {
        var user = await _userManager.FindByEmailAsync(employeeEMail.ToUpper());

        if (user == null) return NotFound("This Employee doens't exists!");

        var roles = await _userManager.GetRolesAsync(user);
        string? role = roles.ElementAtOrDefault(0);

        return Ok(role);
    }

    [HttpPost("register")]
    [Authorize(Roles = "Manager")]
    public async Task<IActionResult> Register(Models.Employee employee)
    {
        if (ModelState.IsValid)
        {
            employee.Email = $"{employee.FirstName}.{employee.LastName}@jupiter.com";
            employee.UserName = employee.Email.ToLower();
            var result = await _userManager.CreateAsync(employee);

            if (result.Succeeded)
            {
                return Ok("The user " + employee.FirstName + " " + employee.LastName + " was succesfully created!");
            }

            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }
        }

        return BadRequest(ModelState);
    }

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login(Models.Employee employee)
    {
        if (employee.Email == null || employee.PasswordHash == null)
        {
            return Unauthorized("Invalid login attempt.");
        }

        var result = await _signInManager.PasswordSignInAsync(employee.Email.ToLower(), employee.PasswordHash, isPersistent: false, lockoutOnFailure: false);

        if (result.Succeeded)
        {
            return Ok("The user " + employee.Email + " was succesfully logged in!");
        }

        return Unauthorized("Invalid login attempt.");
    }

    [HttpPost("logout")]
    [AllowAnonymous]
    public async Task<IActionResult> Logout()
    {
        await _signInManager.SignOutAsync();
        return Ok();
    }

    [HttpPatch("{role}")]
    [Authorize(Roles = "Manager")]
    public async Task<ActionResult<Models.Employee>> UpdateEmployee(string role, Models.Employee newEmployee)
    {
        if (newEmployee.Email == null) return NotFound();
        var employee = await _userManager.FindByEmailAsync(newEmployee.Email);

        if (employee == null) return NotFound();
        IList<string> currentRoles = await _userManager.GetRolesAsync(employee);
        // Remove old roles
        await _userManager.RemoveFromRolesAsync(employee, currentRoles);
        // Add new role
        await _userManager.AddToRoleAsync(employee, role);

        return Ok(employee.Email + " is now " + role);
    }

    [HttpDelete("{employeeEMail}")]
    [Authorize(Roles = "Manager")]
    public async Task<IActionResult> DeleteEmployee(string employeeEMail)
    {
        var employee = await _userManager.FindByEmailAsync(employeeEMail);

        // In case the employee with the given email doesn't exist
        if (employee == null)
        {
            return NotFound();
        }

        var result = await _userManager.DeleteAsync(employee);
        if (!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }

        return NoContent();
    }
}