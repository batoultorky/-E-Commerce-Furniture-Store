using ecommerceApi.Helpers;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace ecommerceApi.Model
{
    public class users:IdentityUser
    {
     
        [StringLength(20, MinimumLength = 3)]
        public string fullName { get; set; }
        
        
    }
}
