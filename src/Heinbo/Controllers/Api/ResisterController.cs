using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Heinbo.Models;
using Heinbo.ViewModels;
using Heinbo.Services;

namespace Heinbo.Controllers.Api
{
    [Route("api/register")]
    public class ResisterController : Controller
    {
        private ISalesRepository _repository;


        public ResisterController(ISalesRepository repository)
        {
            _repository = repository;
        }

        [HttpPost("")]
        public async Task<IActionResult> Post([FromBody]UserViewModel theUser)
        {
            if (ModelState.IsValid)
            {
                var password = theUser.Password;
                var newUser = Mapper.Map<User>(theUser);
                //Save to the database
                await _repository.AddUser(newUser, password);
               
                return RedirectToAction("Index", "App");
            }
            return BadRequest("failed to save");
        }
    }
}
