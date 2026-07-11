using DataAcceslayer_lab_nurse.Entites;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAcceslayer_lab_nurse.DbContextFolder
{
    public abstract class BaseEntityConfig<TEntity> : IEntityTypeConfiguration<TEntity> where TEntity : Base

    {
        public virtual void Configure(EntityTypeBuilder<TEntity> builder)
        {
            builder.HasKey(x => x.ID);

            builder.Property(x => x.ID)
                .IsRequired()
                .ValueGeneratedOnAdd();

            builder.Property(x => x.CreatedAt)
                .IsRequired()
                .HasColumnType("datetime2")
                .HasDefaultValueSql("SYSUTCDATETIME()");

            builder.Property(x => x.UpdatedAt)
                .IsRequired()
                .HasColumnType("datetime2")
                .HasDefaultValueSql("SYSUTCDATETIME()");



            builder.Property(x => x.IsActive)
                .IsRequired()
                .HasDefaultValue(true);

            builder.Property(x => x.IsDeleted)
                .IsRequired()
                .HasDefaultValue(false);

            builder.HasIndex(x => x.IsDeleted);
            builder.HasIndex(x => x.IsActive);


        }
    }

}
