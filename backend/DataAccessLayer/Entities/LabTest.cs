using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Entities
{
    public class LabTest :Base
    {
        [Required, MaxLength(50)]
        public string TestCode { get; set; }

        [Required, MaxLength(250)]
        public string NameAr { get; set; }

        [MaxLength(250)]
        public string NameEn { get; set; }

        public string ShortDescriptionAr { get; set; }
        public string FullDescriptionAr { get; set; }

        // FK إلى نوع العينة
        [Required]
        public Guid SampleTypeId { get; set; }

        [ForeignKey(nameof(SampleTypeId))]
        public SampleType SampleType { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        [Range(0, double.MaxValue)]
        public decimal BasePrice { get; set; }

        [Required, MaxLength(3)]
        public string Currency { get; set; } = "SAR";

        public bool FastingRequired { get; set; } = false;
        public int FastingHours { get; set; } = 0;

        public string PreparationSummaryAr { get; set; }

        public int ResultMinHours { get; set; } = 0;
        public int ResultMaxHours { get; set; } = 24;

        public bool HomeCollectionAllowed { get; set; } = true;
        public bool RequiresPrescription { get; set; } = false;

        public int PopularityScore { get; set; } = 0;

        [Required, MaxLength(20)]
        public string PublicationStatus { get; set; } = "DRAFT";
        public ICollection<LabTestCategory> LabTestCategories { get; set; }
        public ICollection<TestPreparationRule> PreparationRules { get; set; }
        public ICollection<BranchTestCatalog> BranchTestCatalogs { get; set; }
    }
}
