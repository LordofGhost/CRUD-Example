using System.Collections.Generic;

namespace Jupiter.Models.Shelves;

public class SUpdate
{
    public required int ShelfId { get; set; }
    public required ulong?[] ProductIds { get; set; }
}
