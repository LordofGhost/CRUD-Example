using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Supermarket.Models;

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
    public int Id { get; set; }
    required public string Name { get; set; }
    public string? Description { get; set; }
    public string? Image { get; set; }
    required public Category Category { get; set; }
    required public int ShelveId { get; set; } // foreign key
    [ForeignKey(nameof(ShelveId))]
    public virtual Shelve? Shelve { get; set; }
    required public int InStock { get; set; }
    required public int Sold { get; set; }
    [Column(TypeName = "decimal(6, 2)")]
    required public decimal PurchasePrice { get; set; }
    [Column(TypeName = "decimal(6, 2)")]
    required public decimal SellingPrice { get; set; }
    [Column(TypeName = "decimal(6, 2)")]
    required public decimal TaxRate { get; set; }
    required public bool IsActive { get; set; }
}