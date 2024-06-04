using ecommerceApi.Model;
using ecommerceApi.services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ecommerceApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    { private readonly IAuthService _authService;
        public AuthController( IAuthService _authService)
        {
            this._authService = _authService;
            
        }
        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync(Register model )
        {
            if (ModelState.IsValid)
            {
                var result = await _authService.RegisterAsync(model);
                if (!result.IsAuthenticated)
                    return BadRequest(result.Message);
                return Ok(result);
            }
            return BadRequest(ModelState);
        }
        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync(TokenRequestModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _authService.GetTokenAsync(model);
                if (!result.IsAuthenticated)
                    return BadRequest(result.Message);
                return Ok(result);
            }
            return BadRequest(ModelState);
        }

        //[Authorize(Roles = "Admin")]
        [HttpPost("addadmin")]
        public async Task<IActionResult> AddAdminAsync(Register model)
        {
            if (ModelState.IsValid)
            {
                var result = await _authService.AddAdminAsync(model);
                if (result is null )
                    return BadRequest();
                return Ok(result);
            }
            return BadRequest(ModelState);
        }
    }
}
