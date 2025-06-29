using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
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
    [Authorize]
    public async Task<ActionResult<IEnumerable<Models.Product>>> GetProducts(
        [FromQuery] Models.Category? category = null
    )
    {
        IQueryable<Models.Product> query = _context.Products;

        if (category != null)
        {
            query = query.Where(p => p.Category == category);
        }

        return await query.ToListAsync();
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
    [Authorize(Roles = "Manager")]
    public async Task<ActionResult<Models.Product>> CreateProduct(Models.Product product)
    {
        if (ProductExists(product.ProductId))
        {
            return BadRequest("A Product with the same id already exists");
        }

        if (product.ShelfId != null && !_context.Shelves.Any(e => e.ShelfId == product.ShelfId))
        {
            return BadRequest("The selected shelf does not exist");
        }

        _context.Products.Add(product);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetProduct), new { product.ProductId }, product);
    }

    [HttpPatch("{ProductId}")]
    [Authorize(Roles = "Manager")]
    public async Task<ActionResult<Models.Product>> UpdateProduct(int ProductId, Models.Product product)
    {
        // Remove old Product
        var oldProduct = await _context.Products.FindAsync(ProductId);
        if (oldProduct == null)
        {
            return NotFound();
        }
        _context.Products.Remove(oldProduct);
        await _context.SaveChangesAsync();

        // Create new Product
        return await CreateProduct(product);
    }

    [HttpDelete("{ProductId}")]
    [Authorize(Roles = "Manager")]
    public async Task<IActionResult> DeleteProduct(int ProductId)
    {
        var product = await _context.Products.FindAsync(ProductId);
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