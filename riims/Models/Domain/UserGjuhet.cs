namespace riims.Models.Domain
{
    public class UserGjuhet
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }
        public User User { get; set; }

        public Guid GjuhaId { get; set; }
        public Gjuha Gjuha { get; set; }

        public Guid NiveliGjuhesorId { get; set; }
        public NiveliGjuhesor NiveliGjuhesor { get; set; }
    }
}
