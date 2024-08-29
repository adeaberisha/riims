using riims.Models.Domain;

namespace riims.Models.DTO.PunaVullnetareDto
{
    public class PunaVullnetareDTO
    {
        public Guid Id { get; set; }

        public string Roli { get; set; }

        public DateTime DataFillimit { get; set; }

        public DateTime? DataMbarimit { get; set; }

        public string? Pershkrimi { get; set; }

        public Guid UserId { get; set; }

        public Guid InstitucioniId { get; set; }
    }
}
