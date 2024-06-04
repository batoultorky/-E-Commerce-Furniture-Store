using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;


namespace ecommerceApi.Model
{
    public class ecommerceDbcontext:IdentityDbContext<users>
    {
        public virtual DbSet<users> Users { get; set; }
        public virtual DbSet<products> products { get; set; }
      // public virtual DbSet<rating> rating { get; set; }
     
        //  public virtual DbSet<admin> Admin { get; set; }
        public ecommerceDbcontext(DbContextOptions options) : base(options)
        { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

           // modelBuilder.Entity<IdentityUserLogin<string>>().HasKey(l => new { l.LoginProvider, l.ProviderKey });


           // modelBuilder.Entity<rating>().HasKey("userId", "proId");

        }
    }

}
