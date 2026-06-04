using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Dtos
{
    public class HmacRequestDto
    {
        public string Data { get; set; }
        public string Signature { get; set; }
        public string Timestamp { get; set; }
    }
}
