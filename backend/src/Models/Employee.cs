
namespace Supermarket.Models;

public enum Task
{
    StockTheShelves,
    CleanUp,
    Cashier
}

public class Employee
{
    public int? Id { get; set; }
    required public string FirstName { get; set; }
    required public string LastName { get; set; }
    public Task? Task { get; set; }
}