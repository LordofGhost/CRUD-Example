namespace Jupiter.Models.Stock;

public class STask
{
    public required ulong ProductId { get; set; }
    public required string ProductName { get; set; }
    public required int Amount { get; set; }
    public required int ShelfId { get; set; }
}