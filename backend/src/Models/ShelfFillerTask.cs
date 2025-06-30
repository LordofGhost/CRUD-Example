namespace Jupiter.Models;

public class ShelfFillerTask
{
    public required int ProductId { get; set; }
    public required string ProductName { get; set; }
    public required int Amount { get; set; }
    public required int ShlefId { get; set; }
}