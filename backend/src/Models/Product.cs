using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Jupiter.Models;

public enum Category
{
    Food,
    Drinks,
    HouseholdGoods,
    Electronics,
    Other
}
public class Product
{
    [Key]
    public int ProductId { get; set; }
    required public string Name { get; set; }
    public string? Description { get; set; }
    public string? Image { get; set; }
    required public Category Category { get; set; }
    [ForeignKey(nameof(Shelf))]
    public int? ShelfId { get; set; }
    [DeleteBehavior(DeleteBehavior.SetNull)]
    public virtual Shelf? Shelf { get; set; }
    required public int InStock { get; set; }
    required public int Sold { get; set; }
    [Column(TypeName = "decimal(6, 2)")]
    required public decimal PurchasePrice { get; set; }
    [Column(TypeName = "decimal(6, 2)")]
    required public decimal SellingPrice { get; set; }
    [Column(TypeName = "decimal(6, 2)")]
    required public decimal TaxRate { get; set; }
}