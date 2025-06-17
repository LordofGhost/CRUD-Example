using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Models.Shelf>>> GetShelves(int ShelfId)
    {
        return await _context.Shelves.ToListAsync();
    }

    [HttpGet("{ShelfId}")]
    public async Task<ActionResult<Models.Shelf>> GetShelve(int ShelfId)
    {
        var shelve = await _context.Shelves.FindAsync(ShelfId);

        if (shelve == null)
        {
            return NotFound("This Shelve doens't exists!");
        }

        return shelve;
    }

    [HttpPost]
    public async Task<ActionResult<Models.Shelf>> CreateShelve(Models.Shelf shelf)
    {
        _context.Add(shelf);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetShelve), new { shelf.ShelfId }, shelf);
    }

    [HttpPatch("{ShelfId}")]
    public async Task<ActionResult<Models.Shelf>> UpdateShelf(int ShelfId, Models.Shelf shelf)
    {
        if (ShelfId != shelf.ShelfId)
        {
            return BadRequest();
        }

        _context.Entry(shelf).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!ShelfExists(shelf.ShelfId))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return CreatedAtAction(nameof(GetShelve), new { shelf.ShelfId }, shelf);
    }

    private bool ShelfExists(int ShelfId)
    {
        return _context.Shelves.Any(e => e.ShelfId == ShelfId);
    }
    public int test;
}