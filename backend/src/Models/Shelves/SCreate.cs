namespace Jupiter.Models.Shelves;

public class SCreate
{
    public int ShelfId { get; set; }
    public required int Compartments { get; set; }
    public required int CompartmentsSize { get; set; }
}