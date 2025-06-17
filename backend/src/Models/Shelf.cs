using System.ComponentModel.DataAnnotations;

namespace Supermarket.Models;

public class Shelf
{
    [Key]
    public int ShelfId { get; set; }
    required public Category Category { get; set; }
    public virtual ICollection<Product>? Products { get; set; }
}