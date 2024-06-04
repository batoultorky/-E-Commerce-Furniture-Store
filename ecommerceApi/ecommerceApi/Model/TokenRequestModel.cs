using System.ComponentModel.DataAnnotations;

namespace ecommerceApi.Model
{
    public class TokenRequestModel
    {
        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email  { get; set; }
        [Required]
        [DataType (DataType.Password)]
        public string Password { get; set; }
    }
}
