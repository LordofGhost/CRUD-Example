using Microsoft.AspNetCore.Mvc;
namespace Supermarket.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EmployeesController : ControllerBase
{
    private readonly Data.UserDbContext _context;

    public EmployeesController(Data.UserDbContext context)
    {
        _context = context;
    }
}