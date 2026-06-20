using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Entities
{
    public class Packages:Base
    {
     

        [Required]
        [MaxLength(150)]
        public string NameAr { get; set; }

        [MaxLength(150)]
        public string NameEn { get; set; }

        [Required]
        [MaxLength(160)]
        public string Slug { get; set; }

        [MaxLength(100)]
        public string Icon { get; set; }

        public int SortOrder { get; set; } = 0;


        public ICollection<ListOfTests> ListOfTests { get; set; }


        public ICollection<Branches>   ListOfbranches { get; set; }


    }
}
