using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Jupiter.Models;
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
    public async Task<ICollection<Models.ProductRequest>> GetProducts(
        [FromQuery] Models.Category? category = null
    )
    {
        IQueryable<Models.Product> query = _context.Products;

        if (category != null)
        {
            query = query.Where(p => p.Category == category);
        }

        var products = await query.ToListAsync();
        ICollection<Models.ProductRequest> productRequests = new List<Models.ProductRequest>();

        foreach (var product in products)
        {
            var stock = await _context.Stock
                .Where(s => s.ProductId == product.ProductId)
                .OrderByDescending(s => s.Day)
                .FirstOrDefaultAsync();
            
            if (stock == null)
            {
                stock = new Models.Stock
                {
                    ProductId = product.ProductId,
                    InStock = 0,
                    OnTheShelf = 0,
                    PurchasedToday = 0,
                    Day = DateTime.Today
                };
            }

            productRequests.Add(new ProductRequest(product, stock));
        }

        return productRequests;
    }

    [HttpGet("{ProductId}")]
    public async Task<ActionResult<Models.ProductRequest>> GetProduct(int ProductId)
    {
        var product = await _context.Products.FindAsync(ProductId);
        var stock = await _context.Stock
            .Where(s => s.ProductId == ProductId)
            .OrderByDescending(s => s.Day)
            .FirstOrDefaultAsync();

        if (product == null)
        {
            return NotFound("This Product doens't exists!");
        }
        
        if (stock == null)
        {
            stock = new Models.Stock
            {
                ProductId = product.ProductId,
                InStock = 0,
                OnTheShelf = 0,
                PurchasedToday = 0,
                Day = DateTime.Today
            };
        }

        return new Models.ProductRequest(product, stock);
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