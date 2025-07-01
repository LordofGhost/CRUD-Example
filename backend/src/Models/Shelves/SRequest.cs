namespace Jupiter.Models.Shelves;

public class SRequest
{
    public int ShelfId { get; set; }
    public required int Compartments { get; set; }
    public required int CompartmentsSize { get; set; }
    public required int?[] ProductIds { get; set; }
}