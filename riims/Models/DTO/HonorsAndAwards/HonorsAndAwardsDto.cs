using riims.Models.Domain;

namespace riims.Models.DTO.HonorsAndAwards
{
    public class HonorsAndAwardsDto
    {
        public Guid Id { get; set; }

        public string titulli { get; set; }

        public string issuer { get; set; }

        public DateTime dataEleshimit { get; set; }

        public string pershkrimi { get; set; }

        public Guid UserId { get; set; }

        public Guid InstitucioniId { get; set; }

    }
}
