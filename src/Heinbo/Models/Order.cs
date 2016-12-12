using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Heinbo.Models
{
    public class Order
    {

        public Order()
        {
            OrderDate = DateTimeOffset.Now;
            OrderStatus = OrderStatus.Pending;
        }

        public int OrderId { get; set; }
        public DateTimeOffset OrderDate { get; set; }
        public virtual List<OrderItem> OrderItems { get; set; }
        public OrderStatus OrderStatus { get; set; }
        public int TotalPrice { get; set; }
        public string UserId { get; set; }
        public virtual User User { get; set; }

        public void AddOrderItem(OrderItem item)
        {
            item.Order = this;
            OrderItems.Add(item);
        }
    }
}
