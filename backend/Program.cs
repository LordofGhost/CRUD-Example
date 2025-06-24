using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

var builder = WebApplication.CreateBuilder(args);

// Add Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add services to the container.
builder.Services.AddControllers();

// Create CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

// Add authentication
builder.Services.AddAuthorization();
builder.Services.AddIdentityApiEndpoints<Jupiter.Models.Employee>(options =>
{
    options.SignIn.RequireConfirmedEmail = false;
    options.User.RequireUniqueEmail = true;

    // @ sign is required because email and username are identical
    options.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
})
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<Jupiter.Data.Context.UserDbContext>();

// Add shop database context
builder.Services.AddDbContext<Jupiter.Data.Context.ShopDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("ShopDbConnection")));

// Add user database context
builder.Services.AddDbContext<Jupiter.Data.Context.UserDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("UserDbConnection")));

var app = builder.Build();

// Database seeder
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
    var userManager = services.GetRequiredService<UserManager<Jupiter.Models.Employee>>();

    await Jupiter.Data.Seeders.RoleSeeder.SeedRoles(roleManager);
    await Jupiter.Data.Seeders.AdminSeeder.SeedAdmin(userManager);
}

// CORS aktivieren
app.UseCors("AllowReactApp");

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

// Map Swagger
app.UseSwagger();
app.UseSwaggerUI();
app.MapSwagger().RequireAuthorization();

app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthorization();

app.MapControllers();

app.Run();

