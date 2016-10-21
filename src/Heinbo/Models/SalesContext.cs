using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Heinbo.Models
{
    public class SalesContext : IdentityDbContext<User>
    {
        private IConfigurationRoot _config;

        public SalesContext(IConfigurationRoot config, DbContextOptions options) : base(options)
        {
            _config = config;
        }


        public DbSet<Product> Product { get; set; }
        public new DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseSqlServer(_config["ConnectionStrings:HeinboContextConnection"]);
     
        }

    }
}
