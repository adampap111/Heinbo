﻿using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Heinbo.Models;

namespace Heinbo.Controllers.Api
{
    [Route("api/product")]
    public class ProductController : Controller
    {
        private ILogger<ProductController> _logger;
        private ISalesRepository _repository;

        public ProductController(ISalesRepository repository, ILogger<ProductController> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        [HttpGet("")]
        public IActionResult Get()
        {
            try
            {
                var product = _repository.GetAllProducts();
                return Ok(Mapper.Map<IEnumerable<Product>>(product));

            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get Trips {ex}");
                return BadRequest("Error occured");
            }
        }

        [HttpGet("{category}")]
        public IActionResult GetProductsByCategory(string category)
        {
            try
            {
                var product = _repository.GetProductsByCategory(WebUtility.UrlDecode(category));
                return Json((product));

            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get Trips {ex}");
                return BadRequest("Error occured");
            }
        }



        [HttpGet("{productName}")]
        public IActionResult Get(string productName)
        {
            try
            {
                var product = _repository.GetProductByName(productName);

                return Ok(Mapper.Map<IEnumerable<Product>>(product));

            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get Trips {ex}");
                return BadRequest("Error occured");
            }
        }


    }


}
