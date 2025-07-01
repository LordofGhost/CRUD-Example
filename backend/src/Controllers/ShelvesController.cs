using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
namespace Jupiter.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ShelvesController : ControllerBase
{
    private readonly Data.Context.ShopDbContext _context;

    public ShelvesController(Data.Context.ShopDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    [Authorize]
    public async Task<ActionResult<IEnumerable<Models.Shelves.Shelf>>> GetShelves(int ShelfId)
    {
        return await _context.Shelves.ToListAsync();
    }

    [HttpGet("{ShelfId}")]
    [Authorize]
    public async Task<ActionResult<Models.Shelves.Shelf>> GetShelve(int ShelfId)
    {
        var shelve = await _context.Shelves.FindAsync(ShelfId);

        if (shelve == null)
        {
            return NotFound("This Shelve doens't exists!");
        }

        return shelve;
    }

    [HttpPost]
    [Authorize(Roles = "Manager")]
    public async Task<ActionResult<Models.Shelves.Shelf>> CreateShelve(Models.Shelves.SCreate shelf)
    {
        _context.Add(new Models.Shelves.Shelf(shelf));
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetShelve), new { shelf.ShelfId }, shelf);
    }

    [HttpPatch]
    [Authorize(Roles = "Manager")]
    public async Task<IActionResult> UpdateShelf(Models.Shelves.SUpdate updateShelfRequest)
    {
        var shelf = await _context.Shelves.FindAsync(updateShelfRequest.ShelfId);

        if (shelf == null)
        {
            return NotFound();
        }

        var nonNullProductIds = updateShelfRequest.ProductIds.Where(id => id.HasValue);
        if (nonNullProductIds.Count() != nonNullProductIds.Distinct().Count())
        {
            return BadRequest("Duplicate product IDs are not allowed in the same shelf.");
        }

        foreach (int? ProductId in updateShelfRequest.ProductIds)
        {
            if (ProductId != null)
            {
                if (await CheckForProductReference((int)ProductId, shelf.ShelfId))
                {
                    return BadRequest("Product reference allready exists!");
                }
            }
        }

        await RemoveShelfIdReferences(updateShelfRequest.ProductIds);

        shelf.ProductIds = updateShelfRequest.ProductIds;

        await AddShelfIdReferences(updateShelfRequest.ProductIds, shelf.ShelfId);

        _context.Entry(shelf).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return Ok();
    }

    [HttpDelete("{ShelfId}")]
    [Authorize(Roles = "Manager")]
    public async Task<IActionResult> DeleteShelf(int ShelfId)
    {
        var shelf = await _context.Shelves.FindAsync(ShelfId);

        if (shelf == null)
        {
            return NotFound();
        }

        await RemoveShelfIdReferences(shelf.ProductIds);

        _context.Shelves.Remove(shelf);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool ShelfExists(int ShelfId)
    {
        return _context.Shelves.Any(e => e.ShelfId == ShelfId);
    }

    private async Task<bool> RemoveShelfIdReferences(int?[] ProductIds)
    {
        foreach (int? ProductId in ProductIds)
        {
            if (ProductId != null)
            {
                var product = await _context.Products.FindAsync(ProductId);
                if (product != null)
                {
                    product.ShelfId = null;
                    _context.Entry(product).State = EntityState.Modified;
                }
            }
        }
        return true;
    }

    private async Task<bool> AddShelfIdReferences(int?[] ProductIds, int ShelfId)
    {
        foreach (int? ProductId in ProductIds)
        {
            if (ProductId != null)
            {
                var product = await _context.Products.FindAsync(ProductId);
                if (product != null)
                {
                    product.ShelfId = ShelfId;
                    _context.Entry(product).State = EntityState.Modified;
                }
            }
        }
        return true;
    }

    private async Task<bool> CheckForProductReference(int checkProductId, int ShelfId)
    {
        var shelves = await _context.Shelves.ToListAsync();
        foreach (var shelf in shelves)
        {
            // Skip current Shelf
            if (shelf.ShelfId == ShelfId) continue;
            foreach (int? ProductId in shelf.ProductIds)
            {
                if (ProductId != null)
                {
                    if ((int)ProductId == checkProductId) return true;
                }
            }
        }
        return false;
    }
}