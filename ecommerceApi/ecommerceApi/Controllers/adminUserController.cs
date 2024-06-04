using ecommerceApi.DTos;
using ecommerceApi.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ecommerceApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
   
    public class adminUserController : ControllerBase
    {
        public ecommerceDbcontext db { get; }

        public adminUserController(ecommerceDbcontext _db)
        {
            this.db = _db;

        }

        
        [HttpGet]
        [Authorize(Roles = "Admin")]


        public IActionResult GetAllUsers()
        {
           
            var users = db.Users.ToList();
            List<UserDto> userDto = new List<UserDto>();
            foreach (var user in users)
            {
                UserDto DtoModel = new UserDto();
                DtoModel.id = user.Id;
                DtoModel.fullName = user.fullName;
                DtoModel.UserName = user.UserName;
                DtoModel.Email = user.Email;
                userDto.Add(DtoModel);
                
            }
            if (users == null) return BadRequest();
            return Ok(userDto);
        }
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult DeleteUser(string id)
        {
            if (id == null) return BadRequest();
            var user = db.Users.FirstOrDefault(s => s.Id == id);
            if (user == null) return NotFound();
            db.Users.Remove(user);
            db.SaveChanges();
            return Ok(user);
        }



    }
}

