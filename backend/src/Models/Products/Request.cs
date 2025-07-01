using System.Diagnostics.CodeAnalysis;

namespace Jupiter.Models.Products;

public class PRequest : Product
{
    public required int InStock { get; set; } = 0;
    public required int OnTheShelf { get; set; } = 0;

    public PRequest() { }

    [SetsRequiredMembers]
    public PRequest(Product product, Stock.Stock stock) 
    {
        ProductId = product.ProductId;
        Name = product.Name;
        Description = product.Description;
        Image = product.Image;
        Category = product.Category;
        ShelfId = product.ShelfId;
        PurchasePrice = product.PurchasePrice;
        SellingPrice = product.SellingPrice;

        InStock = stock.InStock;
        OnTheShelf = stock.OnTheShelf;
    }
}