using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using Xunit;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;

namespace test
{
    public class ControllerTests
    {
        private SalesContext _context;
        private ISalesRepository _repository;
        private ILogger<ProductController> _logger;
        private IConfigurationRoot _config;


        [Fact]
        public void CanGetWeatherEvents()
        {
            _context = CreateAndSeedContext();
            using (var controller = new ProductController(_repository, null))
            {
                var results = controller.Get();
                Equals( results.ToString());
            }
        }
       
      

        private SalesContext CreateAndSeedContext()
        {
            var optionsBuilder = new DbContextOptionsBuilder<SalesContext>();
            optionsBuilder.UseInMemoryDatabase();
            var context = new SalesContext(_config,optionsBuilder.Options);
            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();
            context.CartItem.AddRange(BuildCartItems());
            context.SaveChanges();
            return context;

        }
        private List<CartItem> BuildCartItems()
        {
            var cartItems = new List<CartItem>
            {
                CartItem.Create("adwa33dda",1,2),
                CartItem.Create("cyscysa33dda",4,21),
                CartItem.Create("adwa33dda",5,10),
                CartItem.Create("r23fwsda",4,200),
                CartItem.Create("adwa33dda",2,4),
                CartItem.Create("adwa33dda",3,7),
                CartItem.Create("543gsvsdda",2,88)
            };
            return cartItems;
        }
    }
}