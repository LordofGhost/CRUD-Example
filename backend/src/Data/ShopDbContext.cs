using Microsoft.EntityFrameworkCore;
namespace Supermarket.Data;

public class ShopDbContext : DbContext
{
    public ShopDbContext(DbContextOptions<ShopDbContext> options) : base(options) { }

    public DbSet<Models.Product> Products { get; set; }
    public DbSet<Models.Shelf> Shelves { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Models.Product>()
            .HasOne(p => p.Shelf)
            .WithMany(s => s.Products)
            .HasForeignKey(p => p.ShelfId);

        modelBuilder.Entity<Models.Shelf>()
            .HasMany(s => s.Products)
            .WithOne(p => p.Shelf)
            .HasForeignKey(p => p.ShelfId)
            .OnDelete(DeleteBehavior.SetNull);

        base.OnModelCreating(modelBuilder);
    }
}