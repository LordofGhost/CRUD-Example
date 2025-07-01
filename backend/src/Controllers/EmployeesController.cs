using System.Net.Mail;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace Jupiter.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EmployeesController : ControllerBase
{
    private readonly UserManager<Models.Employees.Employee> _userManager;
    private readonly SignInManager<Models.Employees.Employee> _signInManager;

    public EmployeesController(UserManager<Models.Employees.Employee> userManager, SignInManager<Models.Employees.Employee> signInManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
    }

    [HttpGet]
    [Authorize(Roles = "Manager")]
    public async Task<ActionResult<IEnumerable<Models.Employees.ERequest>>> GetEmployees()
    {
        var users = await _userManager.Users.ToListAsync();
        var usersWithRoles = new List<object>();

        foreach (var user in users)
        {
            usersWithRoles.Add(await createUserWithRoles(user));
        }

        return Ok(usersWithRoles);
    }

    [HttpGet("{employeeEMail}")]
    [Authorize(Roles = "Manager")]
    public async Task<ActionResult<Models.Employees.ERequest>> GetEmployee(string employeeEMail)
    {
        var user = await _userManager.FindByEmailAsync(employeeEMail.ToUpper());

        if (user == null) return NotFound("This Employee doens't exists!");

        return Ok(await createUserWithRoles(user));
    }

    [HttpGet("me")]
    [Authorize]
    public async Task<ActionResult<Models.Employees.ERequest>> GetMe()
    {
        var userEmail = User.Identity?.Name;
        if (string.IsNullOrEmpty(userEmail)) return Unauthorized();

        var user = await _userManager.FindByNameAsync(userEmail);

        if (user == null) return NotFound("This Employee doens't exists!");

        return Ok(await createUserWithRoles(user));
    }

    [HttpPost("register")]
    [Authorize(Roles = "Manager")]
    public async Task<IActionResult> Register(Models.Employees.Register request)
    {
        if (ModelState.IsValid)
        {
            if (request.FirstName.Length < 2 || request.LastName.Length < 2) 
                return BadRequest();

            var employee = new Models.Employees.Employee
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = $"{request.FirstName}.{request.LastName}@jupiter.com",
                UserName = $"{request.FirstName}.{request.LastName}@jupiter.com".ToLower()
            };

            var result = await _userManager.CreateAsync(employee, request.Password);
            
            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(employee, request.Role);
                return Ok($"User {employee.FirstName} {employee.LastName} was successfully created!");
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
    public async Task<IActionResult> Login(Models.Employees.Login request)
    {
        if (request.Email == null || request.Password == null) return Unauthorized("Invalid login attempt.");

        var result = await _signInManager.PasswordSignInAsync(request.Email.ToLower(), request.Password, isPersistent: false, lockoutOnFailure: false);

        if (result.Succeeded) return Ok("The user " + request.Email + " was succesfully logged in!");

        return Unauthorized("Invalid login attempt.");
    }

    [HttpPost("logout")]
    [AllowAnonymous]
    public async Task<IActionResult> Logout()
    {
        await _signInManager.SignOutAsync();
        return Ok();
    }

    [HttpPatch("{employeeEMail}")]
    [Authorize(Roles = "Manager")]
    public async Task<ActionResult<Models.Employees.ERequest>> UpdateEmployee(string employeeEMail, Models.Employees.ERequest request)
    {
        var employee = await _userManager.FindByEmailAsync(employeeEMail);
        if (employee == null) return NotFound();

        // Set role
        IList<string> currentRoles = await _userManager.GetRolesAsync(employee);
        await _userManager.RemoveFromRolesAsync(employee, currentRoles);
        await _userManager.AddToRoleAsync(employee, request.Role);

        employee.FirstName = request.FirstName;
        employee.LastName = request.LastName;
        employee.Email = $"{request.FirstName}.{request.LastName}@jupiter.com";
        employee.UserName = $"{request.FirstName}.{request.LastName}@jupiter.com".ToLower();

        // Update employee
        await _userManager.UpdateAsync(employee);

        return Ok(await createUserWithRoles(employee));
    }

    [HttpDelete("{employeeEMail}")]
    [Authorize(Roles = "Manager")]
    public async Task<IActionResult> DeleteEmployee(string employeeEMail)
    {
        var employee = await _userManager.FindByEmailAsync(employeeEMail);

        if (employee == null) return NotFound();

        var result = await _userManager.DeleteAsync(employee);

        if (!result.Succeeded) return BadRequest(result.Errors);

        return NoContent();
    }

    private async Task<Models.Employees.ERequest> createUserWithRoles(Models.Employees.Employee user)
    {
        var roles = await _userManager.GetRolesAsync(user);
        string? role = roles.ElementAtOrDefault(0);

        return new Models.Employees.ERequest
        {
            FirstName = user.FirstName ?? " ",
            LastName = user.LastName ?? " ",
            Email = user.Email ?? " ",
            Role = role ?? " "
        };
    }
}