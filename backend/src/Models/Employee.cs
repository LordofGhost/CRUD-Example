
namespace Supermarket.Models;

public enum Job
{
    ShelfFiller,
    Cashier,
    Manager
}

public class Employee
{
    public int? EmployeeId { get; set; }
    required public string FirstName { get; set; }
    required public string LastName { get; set; }
    required public string Password { get; set; }
    public Job? Job { get; set; }
}