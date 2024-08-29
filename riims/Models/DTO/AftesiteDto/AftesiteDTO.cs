using riims.Models.Domain;

namespace riims.Models.DTO.AftesiteDto
{
    public class AftesiteDTO
    {
        public Guid Id { get; set; }

        public string Emri { get; set; }

        public Guid UserId { get; set; }

        public Guid InstitucioniId { get; set; }

    }
}
