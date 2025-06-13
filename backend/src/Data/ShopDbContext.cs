using Microsoft.EntityFrameworkCore;
namespace Supermarket.Data;

public class ShopDbContext : DbContext
{
    public ShopDbContext(DbContextOptions<ShopDbContext> options) : base(options) { }

    public DbSet<Models.Product> Products { get; set; }
    public DbSet<Models.Shelve> Shelves { get; set; }
}