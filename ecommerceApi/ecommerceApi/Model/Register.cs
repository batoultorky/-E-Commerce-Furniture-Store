using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ecommerceApi.Model
{
    public class Register
    {
        [Required, StringLength(20, MinimumLength = 3)]
        public string FullName { get; set; }

        [Required, StringLength(50)]
        public string Username { get; set; }
        [Required, StringLength(128)]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        [Required]
        [NotMapped]
        [Compare("Password")]
        public string confirmPassword {  get; set; }

        [Required, StringLength(256)]
        [DataType(DataType.EmailAddress)]

        public string Email { get; set; }

       // public string roleName { get; set; }
    }
}