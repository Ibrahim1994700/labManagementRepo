using DataAccessLayer.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.DbContextFolder
{
    public  class UsersEntityConfig : BaseEntityConfig<Users>
    {
        public override void Configure(EntityTypeBuilder<Users> builder)
        {
            base.Configure(builder);

            builder.ToTable("Users");

            builder.Property(x => x.FullName)
              .IsRequired()
              .HasMaxLength(150);



            builder.Property(x => x.PhoneNumber)
                .IsRequired()
                .HasMaxLength(20);


            builder.Property(x => x.NormalizedPhoneNumber)
               .IsRequired()
               .HasMaxLength(20);

            builder.Property(x => x.UserName)
                .IsRequired()
                .HasMaxLength(100);
            builder.Property(x => x.NormalizedUserName)
               .IsRequired()
               .HasMaxLength(150);

            builder.Property(x => x.PasswordHash)
                .IsRequired()
                .HasColumnType("varbinary(64)");

            builder.Property(x => x.PassworSalt)
                .IsRequired()
                .HasColumnType("varbinary(128)");

            builder.HasIndex(x => x.UserName)
                .IsUnique();
            builder.Property(x => x.PasswordIterations)
              .IsRequired();
            builder.HasIndex(x => x.PhoneNumber)

                .IsUnique();

            builder.HasQueryFilter(x => !x.IsDeleted);

            builder.ToTable(t =>
            {


                t.HasCheckConstraint(
                    "CK_Users_PhoneNumber_MinLength",
                    "LEN([PhoneNumber]) >= 7");
            });

            builder.Property(x => x.FailedLoginAttempts)
                               .IsRequired()
                               .HasDefaultValue(0);

            builder.Property(x => x.IsEmailConfirmed)
                .IsRequired()
                .HasDefaultValue(false);
            builder.HasIndex(x => x.NormalizedUserName)
               .IsUnique();
            builder.HasIndex(x => x.NormalizedPhoneNumber)
               .IsUnique();
        }
    }
    
   
}
