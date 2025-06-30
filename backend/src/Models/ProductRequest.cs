using System.Diagnostics.CodeAnalysis;

namespace Jupiter.Models;

public class ProductRequest : Product
{
    public required int InStock { get; set; } = 0;
    public required int OnTheShelf { get; set; } = 0;

    public ProductRequest() { }

    [SetsRequiredMembers]
    public ProductRequest(Product product, Stock stock) 
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