using Microsoft.EntityFrameworkCore;
namespace Supermarket.Data;

public class UserDbContext : DbContext
{
    public UserDbContext(DbContextOptions<UserDbContext> options) : base(options) { }

    public DbSet<Models.Employee> Employees { get; set; }
}