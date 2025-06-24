using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
namespace Supermarket.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EmployeesController : ControllerBase
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly SignInManager<IdentityUser> _signInManager;

    public EmployeesController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
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
                await _signInManager.SignInAsync(employee, isPersistent: false);
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
            return Ok("The user " + employee.FirstName + " " + employee.LastName + " was succesfully logged in!");
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
}