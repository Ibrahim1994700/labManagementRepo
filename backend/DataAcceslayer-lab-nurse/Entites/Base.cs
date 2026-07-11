using System;
using System.Collections.Generic;
using System.Text;

namespace DataAcceslayer_lab_nurse.Entites
{
    public class Base
    {
        public Guid ID { get; set; }

        public DateTime? CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }

        public Guid? CreatedBy { get; set; }

        public Guid? UpdatedBy { get; set; }

        public bool? IsActive { get; set; }

        public bool? IsDeleted { get; set; }
    }
}
