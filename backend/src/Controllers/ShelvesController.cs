using Microsoft.AspNetCore.Mvc;
namespace Supermarket.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ShelvesController : ControllerBase
{
    private readonly Data.ShopDbContext _context;

    public ShelvesController(Data.ShopDbContext context)
    {
        _context = context;
    }

    [HttpGet("{Id}")]
    public async Task<ActionResult<Models.Shelve>> GetShelve(int Id)
    {
        var shelve = await _context.Shelves.FindAsync(Id);

        if (shelve == null)
        {
            return NotFound("This Shelve doens't exists!");
        }

        return shelve;
    }

    [HttpPost]
    public async Task<ActionResult<Models.Shelve>> CreateShelve(Models.Shelve shelve)
    {
        _context.Add(shelve);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetShelve), new { id = shelve.Id }, shelve);
    }

}