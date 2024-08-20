namespace riims.Models.Domain
{
    public class Institucioni
    {
        public Guid Id { get; set; }

        public string Emri { get; set; }

        public ICollection<Departamenti> Departamentet { get; set; } = new HashSet<Departamenti>();
        public ICollection<Aftesite> Aftesia { get; set; } = new HashSet<Aftesite>();
        public ICollection<Edukimi> Edukimet { get; set; } = new HashSet<Edukimi>();
        public ICollection<Eksperienca> Eksperiencat { get; set; } = new HashSet<Eksperienca>();
        public ICollection<HonorsAndAwards> HonorsAndAwards { get; set; } = new HashSet<HonorsAndAwards>();
        public ICollection<Licensat> Licensat { get; set; } = new HashSet<Licensat>();
        public ICollection<Projekti> Projektet { get; set; } = new HashSet<Projekti>();
        public ICollection<PunaVullnetare> PunetVullnetare { get; set; } = new HashSet<PunaVullnetare>();
        public ICollection<Specializimet> Specializimet { get; set; } = new HashSet<Specializimet>();



    }
}
