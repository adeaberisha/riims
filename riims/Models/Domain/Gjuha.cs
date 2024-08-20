namespace riims.Models.Domain
{
    public class Gjuha
    {
        public Guid Id { get; set; }

        public string EmriGjuhes { get; set; }

        public ICollection<UserGjuhet> UserGjuhet { get; set; } = new HashSet<UserGjuhet>();

    }
}
