using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;



namespace Heinbo.Models
{
    public class Product
    {
        public Guid ProductID { get; set; }
        public string ProductName { get; set; }
        public string Category { get; set; }
        public string SubCategory { get; set; }
        public int Quantity { get; set; }
        public int RetailPrice { get; set; }
        public int SupplierPrice { get; set; }
        public int WholeSalePrice { get; set; }
        public string Description { get; set; }
        public string Size { get; set; }
        public string Brand { get; set; }


    }
}
