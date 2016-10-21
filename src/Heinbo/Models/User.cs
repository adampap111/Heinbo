using System;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Heinbo.Models
{
    public class User : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }

    }
}