namespace riims.Models.Domain
{
    public class User
    {
        //[MaxLength(50)]
        public string emri { get; set; } = "";

        public string mbiemri { get; set; } = "";

        public string? adresa { get; set; } = "";

        public string? gjinia { get; set; } = "";

        public DateTime? dataELindjes { get; set; } 

        public int? numriTelefonit { get; set; }

        public string? PhotoFileName { get; set; }



        /*[InverseProperty("User")]
        public ICollection<Specializimet> Specializimet { get; set; }

        [InverseProperty("User")]
        public ICollection<Gjuhet> Gjuhet { get; set; }

        [InverseProperty("User")]
        public ICollection<Projekti> Projekti { get; set; }


        [InverseProperty("User")]
        public ICollection<HonorsAndAwards> HonorsAwards { get; set; }

        [InverseProperty("User")]
        public ICollection<MbikqyresITemave> MbiKqyresiITemave { get; set; }

        [InverseProperty("User")]
        public ICollection<Aftesite> Aftesite { get; set; }

        [InverseProperty("User")]
        public ICollection<PunaVullnetare> PunaVullnetare { get; set; }

        [InverseProperty("User")]
        public ICollection<Publikimi> Publikimi { get; set; }

        [InverseProperty("User")]
        public ICollection<Licensat> Licensat { get; set; }

        [InverseProperty("User")]
        public ICollection<Eksperienca> Eksperienca { get; set; }

        [InverseProperty("User")]
        public ICollection<Edukimi> Edukimi { get; set; }*/
    }
}