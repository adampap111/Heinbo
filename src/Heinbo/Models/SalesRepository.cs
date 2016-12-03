using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using NuGet.Packaging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Heinbo.Models
{
    public class SalesRepository : ISalesRepository
    {
        private SalesContext _context;
        private ILogger<SalesRepository> _logger;
        private UserManager<User> _userManager;

        public SalesRepository(SalesContext context, ILogger<SalesRepository> logger, UserManager<User> userManager)
        {
            _context = context;
            _logger = logger;
            _userManager = userManager;
        }

        public Product GetProductByName(string productName)
        {
            return _context.Product
                .Where(t => t.ProductName == productName)
                .FirstOrDefault();
        }

        public IEnumerable<Product> GetAllProducts()
        {
            _logger.LogInformation("Getting all trips from the database");
            return _context.Product.ToList();
        }

        public async Task AddUser(User user, string password)
        {
            var _user = user;
            _user.UserName = _user.Email;

            await _userManager.CreateAsync(_user, password);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;

        }

        public ProductContainer GetProductsByCategory(string category)
        {

            ProductContainer product = new ProductContainer(

            );
            
            product.Product.AddRange(_context.Product.ToList()
                  .Where(t => t.Category == category))
                  ;

            product.Size.AddRange(_context.Product.ToList().Where(c => c.Category == category)
                                 .Select(p => p.Size).Distinct());

            product.Brand.AddRange(_context.Product.ToList().Where(c => c.Category == category)
                                    .Select(p => p.Brand).Distinct());

            product.Category.AddRange(_context.Product.ToList().Where(c => c.Category == category)
                                .Select(p => p.SubCategory).Distinct());


            return product;
        }





        //Old implementations
        //public IEnumerable<Trip> GetAllTrips()
        //{
        //    _logger.LogInformation("Getting all trips from the database");
        //    return _context.Trips.ToList();

        //}

        //public Trip GetTripByName(string tripName, string username)
        //{
        //    return _context.Trips
        //         .Include(t => t.Stops)
        //         .Where(t => t.Name == tripName && t.UserName == username)
        //         .FirstOrDefault();
        //}

        //public IEnumerable<Trip> GetUserTrips(string name)
        //{
        //    try
        //    {
        //        return _context.Trips
        //            .Include(t => t.Stops)
        //            .OrderBy(t => t.Name)
        //            .Where(t => t.UserName == name)
        //            .ToList();
        //    }
        //    catch (Exception ex)
        //    {
        //        _logger.LogError("Could not get the trips", ex);
        //        return null;
        //    }
        //}

        //public void AddStop(string tripName, string username, Stop newStop)
        //{
        //    var trip = GetTripByName(tripName, username);
        //    if (trip != null)
        //    {
        //        trip.Stops.Add(newStop);
        //        _context.Add(newStop);
        //    }
        //}

        //public void AddTrip(Trip trip)
        //{
        //    _context.Add(trip);
        //}

    }
}
