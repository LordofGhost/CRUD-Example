using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace Jupiter.Models.Shelves;

public class Shelf
{
    [Key]
    public int ShelfId { get; set; }
    public required int Compartments { get; set; }
    public required int CompartmentsSize { get; set; }
    public required ulong?[] ProductIds { get; set; }

    public Shelf() { }

    [SetsRequiredMembers]
    public Shelf(SCreate shelf)
    {
        ShelfId = shelf.ShelfId;
        Compartments = shelf.Compartments;
        CompartmentsSize = shelf.CompartmentsSize;
        ProductIds = new ulong?[Compartments];
    }
}