using riims.Models.Domain;

namespace riims.Models.DTO.UserGjuhetDto
{
    public class UserGjuhetDTO
    {
        public Guid Id { get; set; }

        public string UserId { get; set; }

        public Guid GjuhaId { get; set; }

        public string EmriGjuhes { get; set; } 

        public Guid NiveliGjuhesorId { get; set; }

        public string NiveliGjuhesor { get; set; } 
    }
}
