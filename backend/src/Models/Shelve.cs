using System.Collections;

namespace Supermarket.Models;

public class Shelve
{
    public int? Id { get; set; }
    required public string Type { get; set; }
    public int[]? Products { get; set; }
}