namespace riims.Models.Domain
{
    public class User
    {
        public Guid Id { get; set; }
        //[MaxLength(50)]
        public string emri { get; set; } = "";

        public string mbiemri { get; set; } = "";

        public string? adresa { get; set; } = "";

        public string? gjinia { get; set; } = "";

        public DateTime? dataELindjes { get; set; } 

        public string? numriTelefonit { get; set; }

        //public string? PhotoFileName { get; set; }

        //Foreign Key
       // public Guid NiveliAkademikId { get; set; }

        //Navigation Property
        //public NiveliAkademik NiveliAkademik { get; set; }


        //[InverseProperty("User")]
        public ICollection<Specializimet> Specializimet { get; set; } = new HashSet<Specializimet>();

        //[InverseProperty("User")]
        public ICollection<UserGjuhet> Gjuhet { get; set; } = new HashSet<UserGjuhet>();

        //[InverseProperty("User")]
        public ICollection<Projekti> Projektet { get; set; } = new HashSet<Projekti>();

        //[InverseProperty("User")]
        public ICollection<HonorsAndAwards> HonorsAndAwards { get; set; } = new HashSet<HonorsAndAwards>();

        //[InverseProperty("User")]
        public ICollection<MbikqyresITemave> MbiKqyresitETemave { get; set; } = new HashSet<MbikqyresITemave>();

        //[InverseProperty("User")]
        public ICollection<Aftesite> Aftesite { get; set; } = new HashSet<Aftesite>();

        //[InverseProperty("User")]
        public ICollection<PunaVullnetare> PunetVullnetare { get; set; } = new HashSet<PunaVullnetare>();

        //[InverseProperty("User")]
        public ICollection<Publikimi> Publikimet { get; set; } = new HashSet<Publikimi>();

        //[InverseProperty("User")]
        public ICollection<Licensat> Licensat { get; set; } = new HashSet<Licensat>();

        //[InverseProperty("User")]
        public ICollection<Eksperienca> Eksperiencat { get; set; } = new HashSet<Eksperienca>();

        //[InverseProperty("User")]
        public ICollection<Edukimi> Edukimet { get; set; } = new HashSet<Edukimi>();
    }
}