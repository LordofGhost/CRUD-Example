using Microsoft.AspNetCore.Identity;

namespace Supermarket.Data.Seeders;

public class AdminSeeder
{
    public static async Task SeedAdmin(UserManager<IdentityUser> userManager)
    {
        // Admin-User erstellen
        var adminUser = new IdentityUser
        {
            Email = "admin@jupiter.com",
            UserName = "admin@jupiter.com",
            EmailConfirmed = false
        };

        // Check if admin account exists
        var user = await userManager.FindByEmailAsync(adminUser.Email);

        if (user == null)
        {
            await userManager.CreateAsync(adminUser, "AdminPassword123!");

            await userManager.AddToRoleAsync(adminUser, "Manager");
        }
    }
}