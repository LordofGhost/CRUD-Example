namespace Supermarket.Models;

public class Product
{
    // Id can be Null because it is a auto incremnt value in the db
    public int? Id { get; set; }
    required public string Name { get; set; }
    public string? Description { get; set; }
    required public int CategoryId { get; set; }
    required public int InStock { get; set; }
    required public int OnTheShelf { get; set; }
    required public int Sold { get; set; }
    required public decimal Price { get; set; }
    required public decimal TaxRate { get; set; }
    required public bool IsActive { get; set; }
}