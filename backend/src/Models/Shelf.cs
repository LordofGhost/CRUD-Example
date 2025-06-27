using System.ComponentModel.DataAnnotations;

namespace Jupiter.Models;

public class Shelf
{
    [Key]
    public int ShelfId { get; set; }
    public required int Compartments { get; set; }
    public required int CompartmentsSize { get; set; }
    public virtual ICollection<Product>? Products { get; set; }
}