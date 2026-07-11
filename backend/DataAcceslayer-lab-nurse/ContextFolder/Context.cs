using DataAcceslayer_lab_nurse.Entites;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAcceslayer_lab_nurse.ContextFolder
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options) : base(options)
        {


        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Booking>(entity =>
            {
                entity.ToTable("Bookings");

                // Branch
                entity.Property(x => x.BranchId)
                    .IsRequired();

                entity.Property(x => x.BranchName)
                    .IsRequired()
                    .HasMaxLength(100);


             

                // Booking Date
                entity.Property(x => x.DayName)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(x => x.MonthName)
                    .IsRequired()
                    .HasMaxLength(50);


                // Time
                entity.Property(x => x.FromTime)
                    .IsRequired();

                entity.Property(x => x.FromTimePeriod)
                    .IsRequired()
                    .HasMaxLength(10);


                entity.Property(x => x.ToTime)
                    .IsRequired();

                entity.Property(x => x.ToTimePeriod)
                    .IsRequired()
                    .HasMaxLength(10);


                // Location
                entity.Property(x => x.Lat)
                    .HasColumnType("decimal(10,8)")
                    .IsRequired();

                entity.Property(x => x.Lng)
                    .HasColumnType("decimal(11,8)")
                    .IsRequired();

                entity.Property(x => x.PlaceName)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(x => x.FullAddress)
                    .IsRequired()
                    .HasMaxLength(500);


                // Payment
                entity.Property(x => x.PaymentMethod)
                    .IsRequired()
                    .HasMaxLength(50);


                // Created At Auto Generate
                entity.Property(x => x.CreatedAt)
                    .HasDefaultValueSql("GETUTCDATE()")
                    .IsRequired();


                // Relations

                entity.HasMany(x => x.Patients)
                    .WithOne(x => x.Booking)
                    .HasForeignKey(x => x.BookingId)
                    .OnDelete(DeleteBehavior.Cascade);


                entity.HasMany(x => x.Packages)
                    .WithOne(x => x.Booking)
                    .HasForeignKey(x => x.BookingId)
                    .OnDelete(DeleteBehavior.Cascade);


                entity.HasMany(x => x.Tests)
                    .WithOne(x => x.Booking)
                    .HasForeignKey(x => x.BookingId)
                    .OnDelete(DeleteBehavior.Cascade);

            });


            // Booking -> Patients
            modelBuilder.Entity<BookingPatient>(entity =>
            {
                entity.ToTable("BookingPatients");

              

                entity.Property(x => x.Name)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(x => x.Age)
                    .IsRequired();


                entity.HasOne(x => x.Booking)
                    .WithMany(x => x.Patients)
                    .HasForeignKey(x => x.BookingId)
                    .OnDelete(DeleteBehavior.Cascade);
            });


            // Booking -> Packages
            modelBuilder.Entity<BookingPackage>(entity =>
            {
                entity.ToTable("BookingPackages");

           


                entity.Property(x => x.PackageId)
                    .IsRequired();

                entity.Property(x => x.PackageName)
                    .IsRequired()
                    .HasMaxLength(150);


                entity.HasOne(x => x.Booking)
                    .WithMany(x => x.Packages)
                    .HasForeignKey(x => x.BookingId)
                    .OnDelete(DeleteBehavior.Cascade);
            });


            // Booking -> Tests
            modelBuilder.Entity<BookingTest>(entity =>
            {
                entity.ToTable("BookingTests");

            


                entity.Property(x => x.TestId)
                    .IsRequired();

                entity.Property(x => x.TestName)
                    .IsRequired()
                    .HasMaxLength(150);


                entity.HasOne(x => x.Booking)
                    .WithMany(x => x.Tests)
                    .HasForeignKey(x => x.BookingId)
                    .OnDelete(DeleteBehavior.Cascade);
            });
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            ApplyAuditValues();
            return base.SaveChangesAsync(cancellationToken);
        }
        private void ApplyAuditValues()
        {
            var entries = ChangeTracker
                .Entries<Base>()
                .Where(e => e.State == EntityState.Added || e.State == EntityState.Modified);

            foreach (var entry in entries)
            {
                if (entry.State == EntityState.Added)
                {
                    entry.Entity.ID = entry.Entity.ID == Guid.Empty
                        ? Guid.NewGuid()
                        : entry.Entity.ID;

                    entry.Entity.CreatedAt = DateTime.UtcNow;
                    entry.Entity.IsActive = true;
                    entry.Entity.IsDeleted = false;
                }

                entry.Entity.UpdatedAt = DateTime.UtcNow;
            }
        }


        public DbSet<Booking> Bookings { get; set; }
        public DbSet<BookingPatient> BookingPatients { get; set; }
        public DbSet<BookingPackage> BookingPackages { get; set; }
        public DbSet<BookingTest> BookingTests { get; set; }
    }
}