using ecommerceApi.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ecommerceApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class adminProductController : ControllerBase
    {
        public ecommerceDbcontext db { get; }

        public adminProductController(ecommerceDbcontext _db)
        {
            this.db = _db;

        }
      
    
        [HttpGet("getallproduct")]
     
        [Authorize(Roles ="User,Admin")]

        public ActionResult GetAllProducts()
        {
            var product = db.products.ToList();
            if (product == null) return NotFound();
            return Ok(product);
        }
        
        [Authorize(Roles = "Admin,User")]
        [HttpGet("getallcat")]

        public ActionResult GetAllCategory()
        {
            var Category = db.products.Select(x => x.category).Distinct().ToList();
            if (Category == null) return NotFound();
            return Ok(Category);
        }
        
        [Authorize(Roles = "Admin,User")]
        [HttpGet("category/{id}")]
        public IActionResult GetCatById(int id)
        {
            if (id == null) return BadRequest();
            var cat = db.products.FirstOrDefault(s => s.id == id).category;
            if (cat == null) return NotFound();
            return Ok(cat);
        }
        
        [Authorize(Roles = "Admin,User")]
        [HttpGet("product/{id}")]
        public IActionResult GetProductById(int id)
        {
            if (id == null) return BadRequest();
            var product = db.products.FirstOrDefault(s => s.id == id);
            if (product == null) return NotFound();
            return Ok(product);
        }
        [HttpPost]
         [Authorize(Roles ="Admin")]
        public IActionResult AddProduct(products p)
        {

            if (p == null) return BadRequest();

            db.products.Add(p);
            db.SaveChanges();
            return Ok(p);

        }
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult UpdateProduct(int id, products p)
        {
            var product = db.products.FirstOrDefault(p => p.id == id);
            if (product == null) return BadRequest();
            product.title = p.title;
            product.desc = p.desc;
            product.price = p.price;
            product.quantity = p.quantity;
            product.category = p.category;
            db.SaveChanges();
            return Ok(product);
        }
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult DeleteProduct(int id)
        {
            if (id == null) return BadRequest();
            var product = db.products.FirstOrDefault(s => s.id == id);
            if (product == null) return NotFound();
            db.products.Remove(product);
            db.SaveChanges();
            return Ok(product);
        }
      
    }
}

