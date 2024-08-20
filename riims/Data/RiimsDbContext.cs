using Microsoft.EntityFrameworkCore;
using riims.Models.Domain;

namespace riims.Data
{
    public class RiimsDbContext : DbContext
    {
        public RiimsDbContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {

        }
        public DbSet<User> User { get; set; }
        public DbSet<Eksperienca> Eksperienca { get; set; }
        public DbSet<Gjuhet> Gjuhet { get; set; }
        public DbSet<MbikqyresITemave> MbikqyresITemave { get; set; }
        public DbSet<Specializimet> Specializimet { get; set; }
        public DbSet<PunaVullnetare> PunaVullnetare { get; set; }
        public DbSet<Edukimi> Edukimi { get; set; }
        public DbSet<Aftesite> Aftesite { get; set; }
        public DbSet<HonorsAndAwards> HonorsAndAwards { get; set; }
        public DbSet<Licensat> Licensat { get; set; }
        public DbSet<Publikimi> Publikimi { get; set; }
        public DbSet<Projekti> Projekti { get; set; }
        public DbSet<Institucioni> Institucioni { get; set; }
        public DbSet<Departamenti> Departamenti { get; set; }
        public DbSet<NiveliAkademik> NiveliAkademik { get; set; }
        public DbSet<NiveliGjuhesor> NiveliGjuhesor { get; set; }
        public DbSet<UserGjuhet> UserGjuhet { get; set; }
    }
}
