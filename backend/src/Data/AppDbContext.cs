using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Supermarket.Models.Product> Products { get; set; }
    public DbSet<Supermarket.Models.Shelve> Shelves { get; set; }
    public DbSet<Supermarket.Models.Employee> Employees { get; set; }
}