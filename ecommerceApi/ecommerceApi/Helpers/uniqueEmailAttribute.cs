//using ecommerceApi.Model;
//using System.ComponentModel.DataAnnotations;

//namespace ecommerceApi.Helpers
//{
//    public class uniqueEmailAttribute : ValidationAttribute
//    {
//        public ecommerceDbcontext db;
//        public uniqueEmailAttribute()
//        {

//        }


//        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
//        {
//            string? email = value?.ToString();

//            if (email != null && validationContext.ObjectInstance is Register r)
//            {
//                var db = (ecommerceDbcontext)validationContext.GetService(typeof(ecommerceDbcontext));
//                if (!db.Register.Any(s => s.Email == email))
//                    return ValidationResult.Success;
//            }
//            return new ValidationResult("Email must be unique!");


//        }
//    }
//}
