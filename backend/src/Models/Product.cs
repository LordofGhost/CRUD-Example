using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Jupiter.Models;

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
    public int ProductId { get; set; }
    required public string Name { get; set; }
    public string? Description { get; set; }
    public string? Image { get; set; }
    required public Category Category { get; set; }
    [ForeignKey(nameof(Shelf))]
    public int? ShelfId { get; set; }
    [DeleteBehavior(DeleteBehavior.SetNull)]
    public virtual Shelf? Shelf { get; set; }
    [Column(TypeName = "decimal(6, 2)")]
    required public decimal PurchasePrice { get; set; }
    [Column(TypeName = "decimal(6, 2)")]
    required public decimal SellingPrice { get; set; }
}