using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Heinbo.Models;

namespace Heinbo.Controllers.Api
{
    public class SaleController: Controller
    {
        private ILogger<SaleController> _logger;
        private ISalesRepository _repository;

        public SaleController(ISalesRepository repository, ILogger<SaleController> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        //[HttpGet("")]
        //public IActionResult Get()
        //{
        //    try
        //    {
        //        var product = _repository.GetProductByName("");
        //          return Ok(Mapper.Map<IEnumerable<Product>>(product.ProductName));
              
        //    }
        //    catch (Exception ex)
        //    {
        //        _logger.LogError($"Failed to get Trips {ex}");
        //        return BadRequest("Error occured");
        //    }
        //}
    }
}
