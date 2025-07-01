namespace Jupiter.Models.Shelves;

public class STask
{
    public required int ProductId { get; set; }
    public required string ProductName { get; set; }
    public required int Amount { get; set; }
    public required int ShlefId { get; set; }
}