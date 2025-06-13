
namespace Supermarket.Models;

public enum Task
{
    Manager,
    StockTheShelves,
    Cashier
}

public class Employee
{
    public int? Id { get; set; }
    required public string FirstName { get; set; }
    required public string LastName { get; set; }
    required public string Password { get; set; }
    public Task? Task { get; set; }
}