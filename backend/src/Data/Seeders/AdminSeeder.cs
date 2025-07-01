using Microsoft.AspNetCore.Identity;

namespace Jupiter.Data.Seeders;

public class AdminSeeder
{
    public static async Task SeedAdmin(UserManager<Models.Employees.Employee> userManager)
    {
        // Admin-User erstellen
        var adminUser = new Models.Employees.Employee
        {
            Email = "admin@jupiter.com",
            UserName = "admin@jupiter.com",
            FirstName = " ",
            LastName = "Admin",
            EmailConfirmed = false
        };

        // Check if admin account exists
        var user = await userManager.FindByEmailAsync(adminUser.Email);

        if (user == null)
        {
            await userManager.CreateAsync(adminUser, "Start123!");

            await userManager.AddToRoleAsync(adminUser, "Manager");
        }
    }
}