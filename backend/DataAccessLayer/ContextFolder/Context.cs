using DataAccessLayer.DbContextFolder;
using DataAccessLayer.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.ContextFolder
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options) : base(options)
        {

            
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Clients



            // Users
            modelBuilder.ApplyConfiguration(new UsersEntityConfig());

            modelBuilder.Entity<UserRole>()
            .HasKey(x => new { x.UserId, x.RoleId });

            modelBuilder.Entity<UserRole>()
                .HasOne(x => x.User)
                .WithMany(x => x.UserRoles)
                .HasForeignKey(x => x.UserId);

            modelBuilder.Entity<UserRole>()
                .HasOne(x => x.Role)
                .WithMany(x => x.UserRoles)
                .HasForeignKey(x => x.RoleId);

            modelBuilder.Entity<RolePermission>()
                .HasKey(x => new { x.RoleId, x.PermissionId });

            modelBuilder.Entity<RolePermission>()
                .HasOne(x => x.Role)
                .WithMany(x => x.RolePermissions)
                .HasForeignKey(x => x.RoleId);

            modelBuilder.Entity<RolePermission>()
                .HasOne(x => x.Permission)
                .WithMany(x => x.RolePermissions)
                .HasForeignKey(x => x.PermissionId);



            modelBuilder.Entity<Role>()
                .HasIndex(x => x.Name)
                .IsUnique();

			modelBuilder.Entity<Role>().HasData(
				new Role { Id = new Guid("36265f7f-079a-411a-bc1d-1ed9abb3c9f0") , Name = "Admin", },
				new Role { Id = new Guid("74255ae3-b405-404b-9e10-00eee735e2b2"), Name = "Editor" },
				new Role { Id = new Guid("ea704b42-ecc7-480d-8097-5f017edc367c"), Name = "User" }
			);



			modelBuilder.Entity<Clients>().HasData(
			  new Clients
			  {
				  Id = new Guid("36265f7f-070a-411a-bc1d-1ed9abb3c9f0"),
				  ClientId = "Client1",
				  Name = "Web Application 1",
				  ClientURL = "https://client1.com"
			  },
			  new Clients
			  {
				  Id = new Guid("ea704b42-ecc7-380d-8097-5f017edc367c"),
				  ClientId = "Client2",
				  Name = "Mobile Application 2",
				  ClientURL = "https://client2.com"
			  }
		  );

			modelBuilder.Entity<Permission>()
                .HasIndex(x => x.Name)
                            .IsUnique();
                        modelBuilder.Entity<Role>()
               .Property(x => x.Id)
               .ValueGeneratedOnAdd();

            modelBuilder.Entity<Permission>()
                .Property(x => x.Id)
                .ValueGeneratedOnAdd();


            modelBuilder.Entity<LabServices>(entity =>
            {
                entity.ToTable("LabServices");

                entity.HasKey(s => s.ID);

                entity.Property(s => s.ID).ValueGeneratedOnAdd();

                entity.Property(s => s.Name)
                      .IsRequired()
                      .HasMaxLength(150);

                entity.Property(s => s.Description)
                      .IsRequired()
                      .HasMaxLength(500);

                entity.Property(s => s.Icon)
                      .HasMaxLength(50);



                entity.Property(s => s.IsActive)
                      .HasDefaultValue(true);

                entity.Property(s => s.DisplayOrder)
                      .HasDefaultValue(0);
            });

        }

        // Many-to-Many (UsersAndServices)

        public DbSet<LabServices>  LabServices { get; set; }

        public DbSet<Users> Users { get; set; }
		public DbSet<SigningKey>  signingKeys { get; set; }
		public DbSet<Clients>  Clients { get; set; }
		public DbSet<RefreshToken>  refreshTokens { get; set; }


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
    }
}
