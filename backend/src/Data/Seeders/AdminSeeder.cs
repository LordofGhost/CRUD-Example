using Microsoft.AspNetCore.Identity;

namespace Jupiter.Data.Seeders;

public class AdminSeeder
{
    public static async Task SeedAdmin(UserManager<Models.Employee> userManager)
    {
        // Admin-User erstellen
        var adminUser = new Models.Employee
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