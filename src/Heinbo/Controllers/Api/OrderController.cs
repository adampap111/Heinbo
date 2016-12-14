using Heinbo.Models;
using AutoMapper;
using Heinbo.Services;
using Heinbo.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Heinbo.Controllers.Api
{
    [Route("order/")]
    public class OrderController : Controller
    {
        private ISalesRepository _repository;
        private readonly IOrderService _orderService;
        private UserManager<User> _userManager;

        private ILogger<CartController> _logger;

        public OrderController(UserManager<User> userManager, ISalesRepository repository, IOrderService orderService, ILogger<CartController> logger)
        {
            _orderService = orderService;
            _repository = repository;
            _userManager = userManager;
            _logger = logger;
        }


        [HttpPost("MakeOrder/")]
        public async Task<IActionResult> MakeOrder([FromBody] AddToCartModel model)
        {
            var currentUser = await _repository.GetCurrentUser();
            _orderService.MakeOrder(currentUser.Id);
            return Ok();
        }
    }
}
