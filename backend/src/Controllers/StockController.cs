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

    /*
        [HttpGet("ShelfFillerTasks")]
        [Authorize]
        public async Task<Models.ShelfFillerTask> GetShelfFillerTasks()
        {
            // TODO
        }

        [HttpPatch("ShelfFillerTaskComplete")]
        [Authorize]
        public async Task<IActionResult> SetShelfFillerTaskComplete()
        {
            // TODO
            return NoContent();
        }
    **/

    [HttpPatch("SellProducts")]
    [Authorize]
    public async Task<IActionResult> SellProducts(Models.ProductStock[] soldProducts)
    {
        foreach (var soldProduct in soldProducts)
        {
            Models.Stock stock = await GetOrCreateTodayEntry(soldProduct.ProductId);

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
    public async Task<IActionResult> RestockProduct(Models.ProductStock productStock)
    {
        Models.Stock stock = await GetOrCreateTodayEntry(productStock.ProductId);

        stock.InStock += productStock.Amount;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool TodaysEntryExists(int ProductId)
    {
        return _context.Stock.Any(e => e.ProductId == ProductId && e.Day == DateTime.Today);
    }

    private async Task<Models.Stock?> GetLatestEntry(int ProductId)
    {
        return await _context.Stock
            .Where(s => s.ProductId == ProductId)
            .OrderByDescending(s => s.Day)
            .FirstOrDefaultAsync();
    }

    private async Task<Models.Stock> CreateTodaysEntry(int ProductId)
    {
        Models.Stock? oldEntry = await GetLatestEntry(ProductId);
        return new Models.Stock
        {
            ProductId = ProductId,
            InStock = oldEntry != null ? oldEntry.InStock : 0,
            OnTheShelf = oldEntry != null ? oldEntry.OnTheShelf : 0,
            PurchasedToday = 0,
            Day = DateTime.Today
        };
    }

    private async Task<Models.Stock> GetOrCreateTodayEntry(int ProductId)
    {
            if (!TodaysEntryExists(ProductId))
            {
                return _context.Add(await CreateTodaysEntry(ProductId)).Entity;
            }
            else
            {
                return _context.Stock.First(e => e.ProductId == ProductId && e.Day == DateTime.Today);
            }
    }
}