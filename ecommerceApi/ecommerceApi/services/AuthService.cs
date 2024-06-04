using ecommerceApi.Helpers;
using ecommerceApi.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.DotNet.Scaffolding.Shared.Messaging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using NuGet.Common;
using System.Drawing.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ecommerceApi.services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<users> _userManager;
        private readonly Jwt _Jwt;
        private readonly RoleManager<IdentityRole> _roleManager;
        public AuthService(UserManager<users> _UserManeger,IOptions<Jwt> _Jwt, RoleManager<IdentityRole> _roleManeger)
        {
            this._userManager = _UserManeger;
            this._Jwt = _Jwt.Value;
            this._roleManager = _roleManeger;
        }

        public async Task<AuthModel> GetTokenAsync(TokenRequestModel model)
        {
          var authModel=new AuthModel();
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user is null || !await _userManager.CheckPasswordAsync(user, model.Password))
            {
                authModel.Message = "Email or password is wrong";
                return authModel;
            }
            var JwtSecurityToken = await CreateJwtToken(user);
            authModel.Email=user.Email;
            authModel.IsAuthenticated = true;
            authModel.Token= new JwtSecurityTokenHandler().WriteToken(JwtSecurityToken);
            authModel.ExpiresOn = JwtSecurityToken.ValidTo;
            authModel.UserName = user.UserName;
            var RoleList = await _userManager.GetRolesAsync(user);
            authModel.Roles=RoleList.ToList();


            return authModel;
        }

        public async  Task<AuthModel> RegisterAsync(Register model)
        {
            if(await _userManager.FindByEmailAsync(model.Email) is not null)
            
                return new  AuthModel{ Message="Email is already Exist",IsAuthenticated=false};

            if(await _userManager.FindByNameAsync(model.Username) is not null)


                return new AuthModel { Message = "User Name is already taken",IsAuthenticated=false };
            var user = new users
            {
                UserName = model.Username,
                Email = model.Email,
                fullName = model.FullName,
             //   PasswordHash=model.Password
            };
            var result=await _userManager.CreateAsync(user,model.Password);

            if (!result.Succeeded)
            {
                var errors = string.Empty;
                foreach(var error in result.Errors)
                {
                    errors = $"{error.Description},";
                }
                return new AuthModel { Message = errors };
            }
            await _userManager.AddToRoleAsync(user, "User");
            var JwtSecurityToken = await CreateJwtToken(user);
            return new AuthModel
            {
                Email = user.Email,
                ExpiresOn = JwtSecurityToken.ValidTo,
                IsAuthenticated = true,
                Roles = new List<string> { "User" },
                Token = new JwtSecurityTokenHandler().WriteToken(JwtSecurityToken),
                UserName = user.UserName,
                Message="it is created"


            };
        }

        //public async Task<AuthModel> AssignRolesToUser(AssignRole RoleToUser)
        //{
        //    var user = await _userManager.FindByIdAsync(RoleToUser.userId);
        //    if (user == null)
        //    {
        //        throw new ApplicationException($"Unable to find user with ID '{RoleToUser.userId}'.");
        //    }

           
        //        // Check if the role exists
        //        var roleExists = await _roleManager.RoleExistsAsync(RoleToUser.roleName);
        //        if (!roleExists)
        //        {
        //            // Create the role if it doesn't exist
        //            //var role = new IdentityRole(roleName);
        //            //await _roleManager.CreateAsync(role);
        //            throw new ApplicationException($"This Role dosen't exist");
        //        }

        //        // Assign the user to the role
        //        if (await _userManager.IsInRoleAsync(user, RoleToUser.roleName))
        //            throw new ApplicationException($"User Already assigned to this role");

        //       var result= await _userManager.AddToRoleAsync(user, RoleToUser.roleName);
        //    if(!result.Succeeded)
        //        throw new ApplicationException($"field to assign  role to user");

        //    return new AuthModel
        //        {
        //            Email = user.Email,
        //            Roles = new List<string> { $"{RoleToUser.roleName}" },
        //            UserName = user.UserName,
        //            Message = "role added succefully"


        //        };
            
            

            
        //}

            private async Task<JwtSecurityToken> CreateJwtToken(users user)
        {
          var UserClaims= await _userManager.GetClaimsAsync(user);  
         var roles=await _userManager.GetRolesAsync(user);
            var roleClaims = new List<Claim>();
        
            foreach (var role in roles)
                roleClaims.Add(new Claim("roles", role));
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim("uid", user.Id)

            }
          .Union(UserClaims)
          .Union(roleClaims);
           
               SecurityKey symmetricSecrityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_Jwt?.key));

           SigningCredentials   SigningCredintials = new SigningCredentials(symmetricSecrityKey, SecurityAlgorithms.HmacSha256);
            
                var JwtSecurityToken = new JwtSecurityToken(
                    issuer: _Jwt.Issuer,
                    audience: _Jwt.Audience,
                    claims: claims,
                    expires: DateTime.Now.AddDays(_Jwt.DurationInDays),
                    signingCredentials: SigningCredintials);


                return JwtSecurityToken;

            
       
        }

        public async  Task<AuthModel> AddAdminAsync(Register model)
        {
            if (await _userManager.FindByEmailAsync(model.Email) is not null)

                return new AuthModel { Message = "Email is already Exist", IsAuthenticated = false };

            if (await _userManager.FindByNameAsync(model.Username) is not null)


                return new AuthModel { Message = "User Namw is already taken", IsAuthenticated = false };
            var user = new users
            {
                UserName = model.Username,
                Email = model.Email,
                fullName = model.FullName,
                //   PasswordHash=model.Password
            };
            var result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                var errors = string.Empty;
                foreach (var error in result.Errors)
                {
                    errors = $"{error.Description},";
                }
                return new AuthModel { Message = errors };
            }
            await _userManager.AddToRoleAsync(user, "Admin");
            var JwtSecurityToken = await CreateJwtToken(user);
            return new AuthModel
            {
                Email = user.Email,
                Roles = new List<string> { "Admin" },
                UserName = user.UserName,
                Message = "Added succefully"
            };

        }
    }

        
    }
