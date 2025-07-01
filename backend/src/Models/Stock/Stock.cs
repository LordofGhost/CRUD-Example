using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace Jupiter.Models.Stock;

public class Stock
{
    [Key]
    public int StockId { get; set; }
    [ForeignKey(nameof(Product))]
    public required int ProductId { get; set; }
    public virtual Products.Product? Product { get; set; }
    public required int InStock { get; set; } = 0;
    public required int OnTheShelf { get; set; } = 0;
    public required int PurchasedToday { get; set; } = 0;
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public DateTime Day { get; set; } = DateTime.Today;
}