using Microsoft.EntityFrameworkCore;
namespace Jupiter.Data.Context;

public class ShopDbContext : DbContext
{
    public ShopDbContext(DbContextOptions<ShopDbContext> options) : base(options) { }

    public DbSet<Models.Products.Product> Products { get; set; }
    public DbSet<Models.Shelves.Shelf> Shelves { get; set; }
    public DbSet<Models.Stock.Stock> Stock { get; set; }
}