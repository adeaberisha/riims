namespace riims.Models.Domain
{
    public class UserGjuhet
    {
        public Guid Id { get; set; }

        public string UserId { get; set; }
        public User User { get; set; }

        public Guid GjuhaId { get; set; }
        public Gjuhet Gjuha { get; set; }

        public Guid NiveliGjuhesorId { get; set; }
        public NiveliGjuhesor NiveliGjuhesor { get; set; }
    }
}
