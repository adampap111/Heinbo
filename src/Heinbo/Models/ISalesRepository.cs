using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Routing;

namespace Heinbo.Models
{
    public interface ISalesRepository
    {
        Product GetProductByName(string productName);
        IEnumerable<Product> GetAllProducts();
  
        Task AddUser(User user, string password);
        Task<bool> SaveChangesAsync();
        ProductContainer GetProductsByCategory(string category);
    }
}
