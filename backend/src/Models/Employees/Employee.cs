using Microsoft.AspNetCore.Identity;
namespace Jupiter.Models.Employees;

public class Employee : IdentityUser
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
}