using Microsoft.EntityFrameworkCore;//za dbContext

namespace Models
{
    public class SerijaContext : DbContext
    {
        public DbSet<Serija> Serije { get; set; }
        public DbSet<Sezona> Sezone { get; set; }
        public DbSet<Epizoda> Epizode { get; set; }
        public DbSet<Zanr> Zanrovi { get; set; }
        public DbSet<Reziser> Reziseri { get; set; }

        public SerijaContext(DbContextOptions options) : base(options){
            
        }
    }
}