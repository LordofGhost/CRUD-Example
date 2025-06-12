using System.Collections;

namespace Supermarket.Models;

public class Shelve
{
    public int? Id { get; set; }
    required public Category Category { get; set; }
    public ICollection<Product>? Products { get; set; }
}