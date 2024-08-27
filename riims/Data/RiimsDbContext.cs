using Microsoft.EntityFrameworkCore;
using riims.Models.Domain;
using System.Linq.Expressions;

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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //Seed data for Institucioni
            //UBT, UP

            var institucionet = new List<Institucioni>()
            {

                new Institucioni()
                {
                    Id = Guid.Parse("496cc2c1-cc09-4c64-a53d-9529c2486b48"),
                    Emri = "UBT"
                },
                new Institucioni()
                {
                    Id = Guid.Parse("94c1f26d-3feb-4b96-91e5-68d077a5b804"),
                    Emri = "UP"
                }

            };

            //Seed institucionet into the database
            modelBuilder.Entity<Institucioni>().HasData(institucionet);


            //Seed data for NiveliAkademik
            //B.Sc., M.Sc., Ph.D.

            var niveletAkademike = new List<NiveliAkademik>()
            {

                new NiveliAkademik()
                {
                    Id = Guid.Parse("fe75fb45-6c06-4324-a2a2-092b6e4a493e"),
                    lvl = "B.Sc."
                },
                new NiveliAkademik()
                {
                    Id = Guid.Parse("6f67cd1a-d096-4dc6-a011-f733be57f74c"),
                    lvl = "M.Sc."
                },
                new NiveliAkademik()
                {
                    Id = Guid.Parse("f53512ec-7466-4a98-90bd-862ca65e5cfd"),
                    lvl = "Ph.D."
                }

            };

            //Seed nivelet akademike into the database
            modelBuilder.Entity<NiveliAkademik>().HasData(niveletAkademike);



        }
    }
}
