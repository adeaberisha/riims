namespace riims.Models.Domain
{
    public class Departamenti
    {
        public Guid Id { get; set; }

        public string Emri { get; set; }

        public Guid InstitucioniId { get; set; }

        public Institucioni Institucioni { get; set; }

        //public ICollection<MbikqyresITemave> Mbikqyresit { get; set; } = new HashSet<MbikqyresITemave>();
        //public ICollection<Publikimi> Publikimet { get; set; } = new HashSet<Publikimi>();
    }
}
