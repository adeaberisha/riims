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


            //Seed data for Niveli Gjuhesor

            var NiveletGjuhesore = new List<NiveliGjuhesor>()
            {
                new NiveliGjuhesor()
                {
                    Id = Guid.Parse("e52fa674-6854-4539-aeb8-89e716698f21") ,
                    Niveli = "A1"
                },
                new NiveliGjuhesor()
                {
                    Id = Guid.Parse("c7c2b680-c679-4de2-83d0-28464165f115"),
                    Niveli = "A2"
                },
                new NiveliGjuhesor()
                {
                    Id = Guid.Parse("4f965348-1db2-4212-88bf-1bc868338209"),
                    Niveli = "B1"
                },
                new NiveliGjuhesor()
                {
                    Id = Guid.Parse("a5c0e948-be3d-4ebd-beba-8b0a9fc0285b"),
                    Niveli = "B2"
                },
                new NiveliGjuhesor()
                {
                    Id = Guid.Parse("2ea9d919-b3ea-4d0e-9e76-311c6955c4e7"),
                    Niveli = "C1"
                },
                new NiveliGjuhesor()
                {
                    Id = Guid.Parse("81ebd457-1e9a-480b-bde1-d62196c51d75"),
                    Niveli = "C2"
                }
            };

            //Seed nivelet gjuhesore into the database

            modelBuilder.Entity<NiveliGjuhesor>().HasData(NiveletGjuhesore);

            //Seed data for Gjuhet

            var gjuhet = new List<Gjuhet>()
            {
                new Gjuhet()
                {
                    Id = Guid.Parse("f63ac235-418d-4b60-93cc-cedd249837be"),
                    EmriGjuhes = "Afrikaans"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("e1a628e0-6a2c-49f4-8371-8b5e21e045b6") ,
                    EmriGjuhes = "Albanian"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("cd001b96-f3de-4857-909d-a8197018b404") ,
                    EmriGjuhes = "Amharic"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("731d2d0c-c77b-4d45-9e5d-b2fccbeebd63"),
                    EmriGjuhes = "Arabic"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("0ac41a4e-01dd-40af-b3fe-b0113a59369c"),
                    EmriGjuhes = "Armenian"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("3436d59f-7d2c-4faf-b871-40f85287b8e2"),
                    EmriGjuhes = "Azerbaijani"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("8022cc56-f02f-4e0b-ae09-fea2726f8d97"),
                    EmriGjuhes = "Basque"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("55ee730c-a579-48eb-aa07-c994e2637f91"),
                    EmriGjuhes = "Belarusian"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("bb5eefbc-c9a6-461a-986d-aa717f33f834"),
                    EmriGjuhes = "Bengali"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("0af1d222-e087-4ce2-9237-63e0ac045c3a"),
                    EmriGjuhes = "Bosnian"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("55a6fd9a-beac-4c06-a697-9d58e662320a"),
                    EmriGjuhes = "Bulgarian"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("eefca401-9791-4aa4-a834-823f94a4593c"),
                    EmriGjuhes = "Catalan"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("cc8f4d07-9c10-4a7f-86cd-6f2a2413ad33") ,
                    EmriGjuhes = "Chinese"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("9629d1fb-bb54-42b0-872f-a41a69a37614"),
                    EmriGjuhes = "Croatian"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("9b19c334-7047-419b-8440-6da592859922"),
                    EmriGjuhes = "Czech"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("2cdc39a5-8f2e-452b-8d4d-14f99b2a6614"),
                    EmriGjuhes = "Danish"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("06ba1732-25ea-43e4-aa9b-11f7ab0c4b21"),
                    EmriGjuhes = "Dutch"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("4fb75533-88eb-4373-9e4e-72c870ff43b9"),
                    EmriGjuhes = "English"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("331e6eca-c849-4a42-bae5-34986d6bbaa3"),
                    EmriGjuhes = "Estonian"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("6f799343-b897-4c01-8c28-686fd89053b8"),
                    EmriGjuhes = "Finnish"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("d181099b-74ff-4120-a78b-f3676ab03bd5"),
                    EmriGjuhes = "French"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("72b4b137-8018-4fe5-b0bd-4f44cc26e604"),
                    EmriGjuhes = "Galician"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("dfa4a645-147a-4d34-8c6e-b9adc38544b7"),
                    EmriGjuhes = "Georgian"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("c6bb8c19-b90f-4554-a80f-c90a21f712b6"),
                    EmriGjuhes = "German"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("c993bdc3-b1de-4103-96d4-e977346e7ed2"),
                    EmriGjuhes = "Greek"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("dff2380e-b62e-4489-940d-155116ab9b91"),
                    EmriGjuhes = "Gujarati"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("1fe293fd-bc1f-40f1-9c79-7af39c00e911"),
                    EmriGjuhes = "Haitian Creole"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("606c241c-3e3e-4730-8cda-28cbbfbbc7f1"),
                    EmriGjuhes = "Hebrew"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("4014b4d6-2656-486c-bda5-7364fdd930ae"),
                    EmriGjuhes = "Hindi"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("c7156ce4-d4b3-4e0b-a4f1-816b02c9bfcc"),
                    EmriGjuhes = "Hungarian"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("9aafe0a4-8229-4974-b44c-ecadf8263a84"),
                    EmriGjuhes = "Icelandic"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("f4ddfa46-6a87-4376-815b-af6cab990d52"),
                    EmriGjuhes = "Indonesian"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("ffd5dabb-63e1-4cb7-acb3-53f2b041cd17"),
                    EmriGjuhes = "Irish"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("ba014c88-de3e-4349-aad4-8e24d5afc2c4"),
                    EmriGjuhes = "Italian"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("74722c3b-f235-49bb-85ad-b257a68c8b17"),
                    EmriGjuhes = "Japanese"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("8644f2b0-339c-45b4-be8b-3c9a10a06f0f"),
                    EmriGjuhes = "Javanese"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("deb1c84f-15b5-4424-b23f-c0cf31e49633"),
                    EmriGjuhes = "Kannada"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("ebd9f689-e11b-44dd-a885-7e3ad24cf336"),
                    EmriGjuhes = "Kazakh"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("ecaee039-3d79-4b68-a2ff-5f999eeeac56"),
                    EmriGjuhes = "Khmer"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("4bcc6295-978d-4bd2-8ff3-34f01d238b74"),
                    EmriGjuhes = "Korean"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("58e004d7-fdbb-47ef-a493-5adedbe02271"),
                    EmriGjuhes = "Kurdish"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("9a18522f-31df-4016-85ec-04d6b9415bcf"),
                    EmriGjuhes = "Kyrgyz"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("b2aef1e5-cbb8-406b-977b-e479380e481f"),
                    EmriGjuhes = "Lao"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("8da15382-61a1-4003-ab59-4946e28603ba"),
                    EmriGjuhes = "Latvian"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("ea81c50e-7068-4d54-a65f-0c2914fefb00"),
                    EmriGjuhes = "Lithuanian"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("60e8cca6-cdc6-488e-9df4-d195207056b1"),
                    EmriGjuhes = "Macedonian"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("5fcc64b1-97af-4ef1-8ff6-024902ed73e6"),
                    EmriGjuhes = "Malay"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("44c0df9d-77e9-46a8-95a1-e1e5abcff685"),
                    EmriGjuhes = "Malayalam"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("17bacb90-b7cb-41ae-bb21-949e7d849231"),
                    EmriGjuhes = "Maltese"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("b820c74b-5342-43e4-9d7c-da7546dc4800"),
                    EmriGjuhes = "Maori"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("6c462ef0-00bc-4cff-a166-4282c7bb3f75"),
                    EmriGjuhes = "Marathi"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("6cb4a59d-43a7-485c-a42a-2d53731e4a42"),
                    EmriGjuhes = "Mongolian"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("e82c10e0-ec34-47ea-8e40-e9f44848daf9"),
                    EmriGjuhes = "Nepali"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("aad60ef4-0b8d-4b99-8b4e-2d68467701a8"),
                    EmriGjuhes = "Norwegian"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("70dd0051-da8c-4533-ab93-0d27beff5e7f"),
                    EmriGjuhes = "Pashto"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("756b040a-501e-447d-a703-0dba28307ca1"),
                    EmriGjuhes = "Persian"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("eb71526f-530e-4477-b808-7c05608d5734"),
                    EmriGjuhes = "Polish"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("351ad052-aa07-4e8e-9a29-b1572bb37977"),
                    EmriGjuhes = "Portuguese"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("d0ea4583-d485-4290-acf1-9e32db784d62"),
                    EmriGjuhes = "Punjabi"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("b9314cdc-d869-451f-b3dc-9e9b678ff115"),
                    EmriGjuhes = "Romanian"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("f43ca4fb-06ca-4068-89d3-0008754cffc9"),
                    EmriGjuhes = "Russian"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("08b5fc95-2576-41fc-85e6-12a5263fc1ee"),
                    EmriGjuhes = "Samoan"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("1eb9b4d9-19c3-4c85-a9e9-50a47147b4b7"),
                    EmriGjuhes = "Serbian"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("9263b275-11a5-4e2c-9d1c-b76c6b7919b9"),
                    EmriGjuhes = "Slovak"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("84bed73e-4f4a-4067-b822-2cefee3bbf45"),
                    EmriGjuhes = "Slovenian"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("df9ffed4-6354-43da-adf6-8be3adcbf46d"),
                    EmriGjuhes = "Somali"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("ac6bc702-67a2-4674-8a8c-600424fc9933"),
                    EmriGjuhes = "Spanish"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("3f47cb97-d7cd-4f40-a59f-2fd2b7125767"),
                    EmriGjuhes = "Swahili"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("b70c7665-1982-4f1e-b6ff-31710f90ad10"),
                    EmriGjuhes = "Swedish"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("437132bc-1985-46a3-9c55-f24dcef3b3f0"),
                    EmriGjuhes = "Tamil"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("82274f16-c47f-4f36-8c04-b403c5e3e55b"),
                    EmriGjuhes = "Telugu"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("50e2df1f-ea8b-43dd-989f-fef6f5cda2c5"),
                    EmriGjuhes = "Thai"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("e5500cac-cbcd-4b41-a3c3-8c7f629c9638"),
                    EmriGjuhes = "Turkish"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("d3d5f4b6-c735-425a-83b4-777456991d90"),
                    EmriGjuhes = "Ukrainian"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("1919d45e-280a-41e1-a330-c314ab487ec0"),
                    EmriGjuhes = "Urdu"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("bded2a98-155d-42e5-afbd-ae8142962b11"),
                    EmriGjuhes = "Uzbek"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("73ff14da-36df-4330-b668-f786f34db78b"),
                    EmriGjuhes = "Vietnamese"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("f2f84fae-17b2-496a-bf91-977b44604f1e"),
                    EmriGjuhes = "Welsh"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("5caa257a-19d7-449e-93a4-f584a1d4c7db"),
                    EmriGjuhes = "Xhosa"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("ea267650-83cb-4817-985c-df11d25a5b61"),
                    EmriGjuhes = "Yiddish"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("e02e91b9-12b6-4981-a94c-c0cb2a1cac42"),
                    EmriGjuhes = "Yoruba"
                },
                new Gjuhet()
                {
                    Id = Guid.Parse("b37fae09-4578-45c8-9e05-5aca670193c6"),
                    EmriGjuhes = "Zulu"
                }

            };

            //Seed Gjuhet into the database

            modelBuilder.Entity<Gjuhet>().HasData(gjuhet);
        }
    }
}
