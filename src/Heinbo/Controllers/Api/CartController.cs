﻿using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Heinbo.Models;
using Heinbo.ViewModels;
using Heinbo.Services;
using AutoMapper;
using System.Collections.Generic;
using System;
using Microsoft.Extensions.Logging;

namespace Heinbo.Controllers.Api
{
    [Route("cart/")]
    public class CartController : Controller
    {

        private readonly ICartService _cartService;
        private UserManager<User> _userManager;
        private ISalesRepository _repository;
         private ILogger<CartController> _logger;

        public CartController(UserManager<User> userManager, ISalesRepository repository, ICartService cartService, ILogger<CartController> logger)
        {
            _cartService = cartService;
            _repository = repository;
            _userManager = userManager;
            _logger = logger;
        }
        public CartController()
        {

        }


        [HttpPost("AddToCart/")]
        public async Task<IActionResult> AddToCart([FromBody] AddToCartModel model)
        {
            var currentUser = await _repository.GetCurrentUser();
            CartItem cartItem = _cartService.AddToCart(currentUser.Id, model.ProductId, model.VariationName, model.Quantity);

            return RedirectToAction("AddToCartResult", new { cartItemId = cartItem.ProductID });
        }

        [HttpPost("RemoveFromCart/")]
        public async Task<IActionResult> Remove([FromBody] AddToCartModel model)
        {
            var currentUser = await _repository.GetCurrentUser();
            try
            {
              _cartService.RemoveCartItem(currentUser.Id, model.ProductId, model.VariationName);
                return await List();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get the items {ex}");
                return BadRequest("Error occured");
            }

        }

        //[HttpGet]
        //public async Task<IActionResult> AddToCartResult(long cartItemId)
        //{
        //    var currentUser = await _repository.GetCurrentUser();
        //    var cartItem =
        //        _cartItemRepository.Query()
        //            .Include(x => x.Product).ThenInclude(x => x.ThumbnailImage)
        //            .First(x => x.Id == cartItemId);

        //    var model = new AddToCartResult
        //    {
        //        ProductName = cartItem.Product.Name,
        //        ProductImage = _mediaService.GetThumbnailUrl(cartItem.Product.ThumbnailImage),
        //        ProductPrice = cartItem.Product.Price,
        //        Quantity = cartItem.Quantity
        //    };

        //    var cartItems = _cartService.GetCartItems(currentUser.Id);
        //    model.CartItemCount = cartItems.Count;
        //    model.CartAmount = cartItems.Sum(x => x.Quantity * x.Product.Price);

        //    return PartialView(model);
        //}



        [HttpGet("")]
        public async Task<IActionResult> List()
        {
            try
            {
                var currentUser = await _repository.GetCurrentUser();
                var cartItems = _cartService.GetCartItems(currentUser.Id);
                return Ok(Mapper.Map<IEnumerable<CartItem>>(cartItems));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get the items {ex}");
                return BadRequest("Error occured");
            }
        }

        //[HttpPost]
        //public async Task<IActionResult> UpdateQuantity([FromBody] CartQuantityUpdate model)
        //{
        //    var cartItem = _cartItemRepository.Query().FirstOrDefault(x => x.Id == model.CartItemId);
        //    cartItem.Quantity = model.Quantity;

        //    _cartItemRepository.SaveChange();

        //    return await List();
        //}

      
    }
}