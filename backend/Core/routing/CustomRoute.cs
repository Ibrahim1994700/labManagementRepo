using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.routing
{
    public class CustomRoute
    {

        [FromRoute]
        public int id { get; set; }
        [FromQuery]
        public string name { get; set; }
        [FromHeader(Name ="client")]
        public bool isActice { get; set; }

    }
}
