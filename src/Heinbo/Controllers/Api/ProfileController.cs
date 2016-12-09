using Heinbo.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Heinbo.Controllers.Api
{
    public class ProfileController : Controller
    {
        private ISalesRepository _repository;

        public ProfileController(ISalesRepository repository)
        {
            _repository = repository;
        }
    }
}
