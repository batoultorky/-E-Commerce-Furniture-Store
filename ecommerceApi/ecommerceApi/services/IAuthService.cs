using ecommerceApi.Model;

namespace ecommerceApi.services
{
    public interface IAuthService
    {
        Task<AuthModel> RegisterAsync(Register model);
        Task<AuthModel> GetTokenAsync(TokenRequestModel model);
     
       Task <AuthModel> AddAdminAsync(Register model);
    }
}
