using Microsoft.AspNetCore.Identity;
namespace Jupiter.Models;

public enum Job
{
    ShelfFiller,
    Cashier,
    Manager
}

public class Employee : IdentityUser
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public Job? Job { get; set; }
}