using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
namespace Jupiter.Data.Context;

public class UserDbContext : IdentityDbContext<Models.Employees.Employee>
{
    public UserDbContext(DbContextOptions<UserDbContext> options) : base(options) { }
}