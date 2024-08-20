namespace riims.Models.Domain
{
    public class NiveliAkademik
    {
        public Guid Id { get; set; }

        public string lvl { get; set; }

        public ICollection<User> Users { get; set; } = new HashSet<User>();
        public ICollection<Edukimi> Edukimet { get; set; } = new HashSet<Edukimi>();
    }
}
