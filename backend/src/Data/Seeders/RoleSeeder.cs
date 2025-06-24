using Microsoft.AspNetCore.Identity;

namespace Supermarket.Data.Seeders;

public class RoleSeeder
{
    public static async Task SeedRoles(RoleManager<IdentityRole> roleManager)
    {
        // Definierte Rollen
        string[] roleNames = { "Manager", "Cashier", "ShelfFiller" };

        foreach (var roleName in roleNames)
        {
            // Check if role exists
            var roleExists = await roleManager.RoleExistsAsync(roleName);

            if (!roleExists)
            {
                // Create role
                await roleManager.CreateAsync(new IdentityRole(roleName));
            }
        }
    }
}