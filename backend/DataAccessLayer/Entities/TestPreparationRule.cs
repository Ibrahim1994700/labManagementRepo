using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Entities
{
    public class TestPreparationRule:Base
    {
        public Guid TestId { get; set; }

        [ForeignKey(nameof(TestId))]
        public LabTest Test { get; set; }

        [Required]
        [MaxLength(30)]
        public string RuleType { get; set; }  // أو استخدم Enum: PreparationRuleType

        [Required]
        public string InstructionAr { get; set; }

        public string InstructionEn { get; set; }

        public bool IsRequired { get; set; } = true;
    }
}
