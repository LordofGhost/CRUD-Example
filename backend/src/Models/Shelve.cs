using System.ComponentModel.DataAnnotations;

namespace Supermarket.Models;

public class Shelve
{
    [Key]
    public int Id { get; set; }
    required public Category Category { get; set; }
    public ICollection<Product>? Products { get; set; }
}