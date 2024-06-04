using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace ecommerceApi.Model
{
    public class products
    {
        public int id { get; set; }
        [Required]
        [StringLength(50,MinimumLength =3)]
        public string title { get; set; }
        [Required]
        [StringLength(400, MinimumLength = 3)]
        public string desc { get; set; }
        [Required]
        [Range(1000, int.MaxValue)]
        public int price { get; set; }
        [Required]
        [Range (1, 100)]
        public int quantity { get; set; }
        [AllowNull]
        public string? image { get; set; }
        [Required]
        [StringLength( 100, MinimumLength = 3)]
        public string category { get; set; }
        public int rating { get; set; }
     
        


    }
}
