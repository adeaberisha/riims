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


            //Seed data for Departmenti
            var departmenti = new List<Departamenti>()
            {

                new Departamenti()
                {
                    Id = Guid.Parse("0a2c57ba-17fb-4f79-bcc4-cef9e704bf3d"),
                    Emri = "Menaxhment, Biznes dhe Ekonomi",
                    InstitucioniId = Guid.Parse("496cc2c1-cc09-4c64-a53d-9529c2486b48")
                },
                new Departamenti()
                {
                    Id = Guid.Parse("1efbe13e-9b02-4860-8715-f80b035f93e2"),
                    Emri = "Shkenca Kompjuterike dhe Inxhineri",
                    InstitucioniId = Guid.Parse("496cc2c1-cc09-4c64-a53d-9529c2486b48")
                },
                new Departamenti()
                {
                    Id = Guid.Parse("2c6b9320-7b40-4234-867c-03e3ae05f7ba"),
                    Emri = "Menaxhment i Mekatronikës",
                    InstitucioniId = Guid.Parse("496cc2c1-cc09-4c64-a53d-9529c2486b48")
                },
                 new Departamenti()
                {
                    Id = Guid.Parse("6d76ebfe-ef5b-43e5-8813-bbf98f2e7657"),
                    Emri = "Sistemet e Informacionit",
                    InstitucioniId = Guid.Parse("496cc2c1-cc09-4c64-a53d-9529c2486b48")
                },
                new Departamenti()
                {
                    Id = Guid.Parse("dd90af7b-1852-42af-942d-c51fd8c6e854"),
                    Emri = "Arkitekturë dhe Planifikimi Hapësinor",
                    InstitucioniId = Guid.Parse("496cc2c1-cc09-4c64-a53d-9529c2486b48")
                },
                 new Departamenti()
                {
                    Id = Guid.Parse("f9944afc-5811-4960-96ab-d585f0210707"),
                    Emri = "Inxhineri Ndërtimore(Ndërtimtari) dhe Infrastrukturë",
                    InstitucioniId = Guid.Parse("496cc2c1-cc09-4c64-a53d-9529c2486b48")
                },
                new Departamenti()
                {
                    Id = Guid.Parse("9e789309-441e-4f3f-af5f-69ba940902db"),
                    Emri = "Shkenca Politike",
                    InstitucioniId = Guid.Parse("496cc2c1-cc09-4c64-a53d-9529c2486b48")
                },
                new Departamenti()
                {
                    Id = Guid.Parse("3f6e8e7a-58dc-4e60-9fad-fa4b2be412cd"),
                    Emri = "Juridik",
                    InstitucioniId = Guid.Parse("496cc2c1-cc09-4c64-a53d-9529c2486b48")
                },
                 new Departamenti()
                {
                    Id = Guid.Parse("dc1db886-3100-4ce9-99cc-493d88f603d5"),
                    Emri = "Media dhe Komunikim",
                    InstitucioniId = Guid.Parse("496cc2c1-cc09-4c64-a53d-9529c2486b48")
                },
                new Departamenti()
                {
                    Id = Guid.Parse("b010567e-5b9c-461a-9d4b-1a9c36148f03"),
                    Emri = "Inxhineri e Energjisë",
                    InstitucioniId = Guid.Parse("496cc2c1-cc09-4c64-a53d-9529c2486b48")
                },
                new Departamenti()
                {
                    Id = Guid.Parse("05251f11-0354-4d11-8dca-4422d284160b"),
                    Emri = "Politika Publike dhe Menaxhimi",
                    InstitucioniId = Guid.Parse("496cc2c1-cc09-4c64-a53d-9529c2486b48")
                },
                new Departamenti()
                {
                    Id = Guid.Parse("7bb0e204-8a1a-4d40-b08f-81015d5c3c4e"),
                    Emri = "Infermieri",
                    InstitucioniId = Guid.Parse("496cc2c1-cc09-4c64-a53d-9529c2486b48")
                },
                 new Departamenti()
                {
                    Id = Guid.Parse("5d193df8-ef18-48d8-a722-7d94dbf636c6"),
                    Emri = "Farmaci",
                    InstitucioniId = Guid.Parse("496cc2c1-cc09-4c64-a53d-9529c2486b48")
                },
                new Departamenti()
                {
                    Id = Guid.Parse("985167e8-cb59-4e1a-8bc8-268a3caf2911"),
                    Emri = "Stomatologji",
                    InstitucioniId = Guid.Parse("496cc2c1-cc09-4c64-a53d-9529c2486b48")
                },
                new Departamenti()
                {
                    Id = Guid.Parse("273b38a2-4cd7-47e4-968b-d5d48d364edd"),
                    Emri = "Shkenca e Ushqimit dhe bioteknologji",
                    InstitucioniId = Guid.Parse("496cc2c1-cc09-4c64-a53d-9529c2486b48")
                },
                 new Departamenti()
                {
                    Id = Guid.Parse("7b6a59f2-d536-45c2-b981-ce54917084c0"),
                    Emri = "Dizajn i Integruar",
                    InstitucioniId = Guid.Parse("496cc2c1-cc09-4c64-a53d-9529c2486b48")
                },
                new Departamenti()
                {
                    Id = Guid.Parse("571348c4-aadf-42b2-be6b-c2219e4dd845"),
                    Emri = "AgriKulturë dhe Inxhineri e Ambientit",
                    InstitucioniId = Guid.Parse("496cc2c1-cc09-4c64-a53d-9529c2486b48")
                },
                new Departamenti()
                {
                    Id = Guid.Parse("4debc353-f2cc-4d75-82c8-0e356999a77a"),
                    Emri = "Arti dhe Mediat Digjitale",
                    InstitucioniId = Guid.Parse("496cc2c1-cc09-4c64-a53d-9529c2486b48")
                },
                 new Departamenti()
                {
                    Id = Guid.Parse("9aa12dbb-746c-41de-88b5-19da7de10516"),
                    Emri = "Muzika Moderne, Prodhimi Digjital dhe Menaxhimi",
                    InstitucioniId = Guid.Parse("496cc2c1-cc09-4c64-a53d-9529c2486b48")
                },
                new Departamenti()
                {
                    Id = Guid.Parse("7da76f05-491c-44b4-9377-7e99c3ffd97b"),
                    Emri = "Teknik i Anesteziologjisë",
                    InstitucioniId = Guid.Parse("496cc2c1-cc09-4c64-a53d-9529c2486b48")
                },
                new Departamenti()
                {
                    Id = Guid.Parse("7300a7d2-a6a0-4ca4-96c6-940e7b0c865e"),
                    Emri = "Teknik i Radiologjisë",
                    InstitucioniId = Guid.Parse("496cc2c1-cc09-4c64-a53d-9529c2486b48")
                },
                new Departamenti()
                {
                    Id = Guid.Parse("b47eb467-7e2c-476c-b50b-25751692b447"),
                    Emri = "Aktrim",
                    InstitucioniId = Guid.Parse("496cc2c1-cc09-4c64-a53d-9529c2486b48")
                },
                 new Departamenti()
                {
                    Id = Guid.Parse("1e962ebf-9721-4fab-b489-6f0a1de1f0e8"),
                    Emri = "Psikologji",
                    InstitucioniId = Guid.Parse("496cc2c1-cc09-4c64-a53d-9529c2486b48")
                }
            };

            //Seed departmentet into the database
            modelBuilder.Entity<Departamenti>().HasData(departmenti);
        }
    }
}
