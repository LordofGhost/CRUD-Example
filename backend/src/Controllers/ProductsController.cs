using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace Jupiter.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly Data.Context.ShopDbContext _context;

    public ProductsController(Data.Context.ShopDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Models.Product>>> GetProducts()
    {
        return await _context.Products.ToListAsync();
    }

    [HttpGet("{ProductId}")]
    public async Task<ActionResult<Models.Product>> GetProduct(int ProductId)
    {
        var product = await _context.Products.FindAsync(ProductId);

        if (product == null)
        {
            return NotFound("This Product doens't exists!");
        }

        return product;
    }

    // When creating a product the Shelf attribute should always be null, because otherwise a cycle is created and a 400 Error is sent
    [HttpPost]
    public async Task<ActionResult<Models.Product>> CreateProduct(Models.Product product)
    {
        // Check if Shelf exists
        if (product.ShelfId != null && !_context.Shelves.Any(e => e.ShelfId == product.ShelfId))
        {
            return BadRequest("The selected shelf does not exist");
        }

        _context.Products.Add(product);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetProduct), new { product.ProductId }, product);
    }

    [HttpPatch("{ProductId}")]
    public async Task<ActionResult<Models.Product>> UpdateProduct(int ProductId, Models.Product product)
    {
        if (ProductId != product.ProductId)
        {
            return BadRequest();
        }

        _context.Entry(product).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!ProductExists(product.ProductId))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return CreatedAtAction(nameof(GetProduct), new { product.ProductId }, product);
    }

    [HttpDelete("{ProductId}")]
    public async Task<IActionResult> DeleteProduct(int ProductId)
    {
        var product = await _context.Products.FindAsync(ProductId);

        // In case the product with the given ProductId doesn't exist
        if (product == null)
        {
            return NotFound();
        }

        _context.Products.Remove(product);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool ProductExists(int ProductId)
    {
        return _context.Products.Any(e => e.ProductId == ProductId);
    }

}