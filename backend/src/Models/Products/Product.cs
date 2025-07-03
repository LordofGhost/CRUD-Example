using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Jupiter.Models.Products;

public enum Category
{
    Laptops,
    PCs,
    Tablets,
    Monitore,
    Drucker,
    Scanner,
    Speichermedien,
    Tastaturen,
    Mäuse,
    Zubehör
}
public class Product
{
    [Key]
    public ulong ProductId { get; set; }
    required public string Name { get; set; }
    public string? Description { get; set; }
    public string? Image { get; set; }
    required public Category Category { get; set; }
    public int? ShelfId { get; set; }
    [Column(TypeName = "decimal(6, 2)")]
    required public decimal PurchasePrice { get; set; }
    [Column(TypeName = "decimal(6, 2)")]
    required public decimal SellingPrice { get; set; }
}