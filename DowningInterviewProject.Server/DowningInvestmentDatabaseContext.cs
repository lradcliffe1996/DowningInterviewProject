using DowningInterviewProject.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace DowningInterviewProject.Server;

public partial class DowningInvestmentDatabaseContext : DbContext
{
    public DowningInvestmentDatabaseContext()
    {
    }

    public DowningInvestmentDatabaseContext(DbContextOptions<DowningInvestmentDatabaseContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Company> Companies { get; set; }

    public virtual DbSet<Investor> Investors { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Data Source=(LocalDb)\\MSSQLLocalDB;Initial Catalog=Downing.Investment.Database;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Company>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Companie__3214EC07C77E8896");

            entity.Property(e => e.Code).HasMaxLength(100);
            entity.Property(e => e.CompanyName).HasMaxLength(100);
            entity.Property(e => e.SharePrice).HasColumnType("money");
        });

        modelBuilder.Entity<Investor>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Investor__3214EC07770867E3");

            entity.Property(e => e.FirstName).HasMaxLength(100);
            entity.Property(e => e.LastName).HasMaxLength(100);
            entity.Property(e => e.Title).HasMaxLength(100);

            entity.HasOne(d => d.Company).WithMany(p => p.Investors)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Investors__Compa__267ABA7A");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
