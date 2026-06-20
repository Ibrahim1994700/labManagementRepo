using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Entities
{
    public class Branches :Base
    {
        [Required, MaxLength(30)]
        public string BranchCode { get; set; }

        [Required, MaxLength(200)]
        public string NameAr { get; set; }

        [MaxLength(200)]
        public string NameEn { get; set; }

        [MaxLength(100)]
        public string City { get; set; }

        [MaxLength(100)]
        public string District { get; set; }

        public string Address { get; set; }

        [Column(TypeName = "decimal(10,7)")]
        public decimal? Latitude { get; set; }

        [Column(TypeName = "decimal(10,7)")]
        public decimal? Longitude { get; set; }

        public ICollection<LabBranchDaysOn> ?Days { get; set; }
        public ICollection<Packages> ? ListOfPackages { get; set; }

        public ICollection<ListOfTests> ?  Tests { get; set; }

    }
}

