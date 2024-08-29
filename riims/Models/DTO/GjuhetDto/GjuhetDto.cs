using riims.Models.Domain;

namespace riims.Models.DTO.GjuhetDto
{
    public class GjuhetDto
    {
        public Guid Id { get; set; }

        public string EmriGjuhes { get; set; }

        public ICollection<UserGjuhet> UserGjuhet { get; set; } = new HashSet<UserGjuhet>();

    }
}
