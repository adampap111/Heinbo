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


        }

       
        public void CanGetWeaherEtvents()
        {
            _context = CreateAndSeedContext();
            try
            {
                var controller = new CartService(_context, null);
                var results = controller.GetCartItems("adwa33dda");
                Object.Equals(7, results.Count());
            }
            finally
            {
            }
        }



        private SalesContext CreateAndSeedContext()
        {
            var optionsBuilder = new DbContextOptionsBuilder<SalesContext>();
            optionsBuilder.UseInMemoryDatabase();

            var context = new SalesContext(optionsBuilder.Options);
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
                CartItem.Create("vdfvfxvdda",5,10),
                CartItem.Create("adwa33dda",4,200),
                CartItem.Create("cyscezdda",2,4),
                CartItem.Create("adwa33dda",3,7),
                CartItem.Create("543gsvsdda",2,88)
            };
            return cartItems;
        }
    }
}