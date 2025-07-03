using Jupiter.Models.Stock;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace Jupiter.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StockController : ControllerBase
{
    private readonly Data.Context.ShopDbContext _context;

    public StockController(Data.Context.ShopDbContext context)
    {
        _context = context;
    }

    [HttpGet("GetTasks")]
    [Authorize]
    public async Task<ActionResult<ICollection<Models.Stock.STask>>> GetTasks()
    {
        ICollection<STask> tasks = [];
        var stocks = await _context.Stock.ToListAsync();

        foreach (var stock in stocks)
        {
            // Skip entry if newer exists
            if (await NewerStockExists(stock.ProductId, stock.Day)) continue;

            if (stock.OnTheShelf < await GetCompartmentsSizeOfProduct(stock.ProductId) && stock.InStock > 0)
            {
                var product = await _context.Products.FindAsync(stock.ProductId);

                if (product == null) return NotFound("The product of the stock could not be found.");
                // If no shelf is set, it can not be filled
                if (product.ShelfId == null) continue;

                tasks.Add(new STask
                {
                    ProductId = stock.ProductId,
                    ProductName = product.Name,
                    Amount = await GetCompartmentsSizeOfProduct(stock.ProductId) - stock.OnTheShelf,
                    ShelfId = (int)product.ShelfId
                });
            }
        }

        return CreatedAtAction(nameof(GetTasks), tasks);
    }

    [HttpPatch("TaskComplete")]
    [Authorize]
    public async Task<IActionResult> TaskComplete(Models.Stock.SProduct product)
    {
        Models.Stock.Stock stock = await GetOrCreateTodayEntry(product.ProductId);

        if (stock.InStock < product.Amount || stock.OnTheShelf + product.Amount > await GetCompartmentsSizeOfProduct(product.ProductId))
        {
            return BadRequest("Not enough Products in stock or to many on the shelf.");
        }

        stock.InStock -= product.Amount;
        stock.OnTheShelf += product.Amount;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpPatch("SellProducts")]
    [Authorize]
    public async Task<IActionResult> SellProducts(Models.Stock.SProduct[] soldProducts)
    {
        if (soldProducts == null || soldProducts.Length == 0)
        {
            return BadRequest("No products selected.");
        }
         
        foreach (var soldProduct in soldProducts)
        {
            Models.Stock.Stock stock = await GetOrCreateTodayEntry(soldProduct.ProductId);

            if (stock.OnTheShelf < soldProduct.Amount)
            {
                return BadRequest("Not enough products on the shelf.");
            }

            stock.OnTheShelf -= soldProduct.Amount;
            stock.PurchasedToday += soldProduct.Amount;
        }

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpPatch("RestockProduct")]
    [Authorize]
    public async Task<IActionResult> RestockProduct(Models.Stock.SProduct productStock)
    {
        Models.Stock.Stock stock = await GetOrCreateTodayEntry(productStock.ProductId);

        stock.InStock += productStock.Amount;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool TodaysEntryExists(ulong ProductId)
    {
        return _context.Stock.Any(e => e.ProductId == ProductId && e.Day == DateTime.Today);
    }

    private async Task<Models.Stock.Stock?> GetLatestEntry(ulong ProductId)
    {
        return await _context.Stock
            .Where(s => s.ProductId == ProductId)
            .OrderByDescending(s => s.Day)
            .FirstOrDefaultAsync();
    }

    private async Task<Models.Stock.Stock> CreateTodaysEntry(ulong ProductId)
    {
        var product = await _context.Products.FindAsync(ProductId);
        if (product == null)
        {
            throw new Exception($"Product with ID {ProductId} does not exist.");
        }
        Models.Stock.Stock? oldEntry = await GetLatestEntry(ProductId);
        return new Models.Stock.Stock
        {
            ProductId = ProductId,
            InStock = oldEntry != null ? oldEntry.InStock : 0,
            OnTheShelf = oldEntry != null ? oldEntry.OnTheShelf : 0,
            PurchasedToday = 0,
            Day = DateTime.Today
        };
    }

    private async Task<Models.Stock.Stock> GetOrCreateTodayEntry(ulong ProductId)
    {
        if (!TodaysEntryExists(ProductId))
        {
            var newEntry = await CreateTodaysEntry(ProductId);
            var entity = _context.Add(newEntry).Entity;
            await _context.SaveChangesAsync();
            return entity;
        }
        else
        {
            return _context.Stock.First(e => e.ProductId == ProductId && e.Day == DateTime.Today);
        }
    }

    private async Task<int> GetCompartmentsSizeOfProduct(ulong ProductId)
    {
        var product = await _context.Products.FindAsync(ProductId);

        if (product == null || product.ShelfId == null) return 0;

        var shelf = await _context.Shelves.FindAsync(product.ShelfId);

        if (shelf == null) return 0;

        return shelf.CompartmentsSize;
    }

    private async Task<bool> NewerStockExists(ulong ProductId, DateTime Day)
    {
        var stocks = await _context.Stock.ToListAsync();

        foreach (var stock in stocks)
        {
            if (stock.ProductId == ProductId && stock.Day > Day)
            {
                return true;
            }
        }
        return false;
    }
}