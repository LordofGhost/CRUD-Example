using System.ComponentModel.DataAnnotations;

namespace Jupiter.Models;

public class Shelf
{
    [Key]
    public int ShelfId { get; set; }
    required public Category Category { get; set; }
    public virtual ICollection<Product>? Products { get; set; }
}