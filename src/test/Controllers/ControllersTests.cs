using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using Heinbo.Controllers.Api;
using Heinbo.Services;
using Heinbo.Models;

namespace test
{
    public class ControllerTests
    {
        private SalesContext _context;

        public ControllerTests(SalesContext context)
        {
            _context = context;
            var controller = new CartController();
            
        }


        public void CanGetWeatherEvents()
        {
            //_context = CreateAndSeedContext();
            //using (var controller = new CartService(_context, null))
            //{
            //    var results = controller.List();
            //    Assert.Equal(7, results.Count());
            //}
        }
       
      

        private SalesContext CreateAndSeedContext()
        {
            var optionsBuilder = new DbContextOptionsBuilder<SalesContext>();
            optionsBuilder.UseInMemoryDatabase();

            _context.Database.EnsureDeleted();
            _context.Database.EnsureCreated();
            _context.CartItem.AddRange(BuildCartItems());
            _context.SaveChanges();
            return _context;

        }
        private List<CartItem> BuildCartItems()
        {
            var cartItems = new List<CartItem>
            {
                CartItem.Create("adwa33dda",1,2),
                CartItem.Create("cyscysa33dda",4,21),
                CartItem.Create("vdfvfxvdda",5,10),
                CartItem.Create("r23fwsda",4,200),
                CartItem.Create("cyscezdda",2,4),
                CartItem.Create("abrnerdda",3,7),
                CartItem.Create("543gsvsdda",2,88)
            };
            return cartItems;
        }
    }
}