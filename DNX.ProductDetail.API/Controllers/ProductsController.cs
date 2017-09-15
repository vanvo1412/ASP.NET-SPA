using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DNX.ProductDetail.API.Contracts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DNX.ProductDetail.API.Models;
using MassTransit;
using Microsoft.AspNetCore.Authorization;

namespace DNX.ProductDetail.API.Controllers
{
    [Produces("application/json")]
    [Route("api/Products")]
    [Authorize]
    public class ProductsController : Controller
    {
        private readonly DnxContext _context;
        private readonly IBus _bus;
        private readonly IPublishEndpoint _endpoint;
        public ProductsController(DnxContext context, IBus bus, IPublishEndpoint endpoint)
        {
            _context = context;
            _bus = bus;
            _endpoint = endpoint;
        }
        //public ProductsController(DnxContext context)
        //{
        //    _context = context;
        //}

        // GET: api/Products
        [HttpGet]
        public IEnumerable<Product> GetProduct()
        {
            return _context.Product;
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct([FromRoute] int id)
        {
            //var endpoint = await _bus.GetSendEndpoint(new Uri("rabbitmq://localhost:5672/GetProductById"));
            //await endpoint.Send(new TestContract
            //{
            //    Description = id.ToString(),
            //    Guid = new Guid()
            //});

            await _endpoint.Publish(new TestContract
            {
                Description = id.ToString(),
                Guid = new Guid()
            });
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var product = await _context.Product.SingleOrDefaultAsync(m => m.ProductId == id);

            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        // PUT: api/Products/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct([FromRoute] int id, [FromBody] Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != product.ProductId)
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
                if (!ProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Products
        [HttpPost]
        public async Task<IActionResult> PostProduct([FromBody] Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Product.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProduct", new { id = product.ProductId }, product);
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var product = await _context.Product.SingleOrDefaultAsync(m => m.ProductId == id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Product.Remove(product);
            await _context.SaveChangesAsync();

            return Ok(product);
        }

        private bool ProductExists(int id)
        {
            return _context.Product.Any(e => e.ProductId == id);
        }
    }
}