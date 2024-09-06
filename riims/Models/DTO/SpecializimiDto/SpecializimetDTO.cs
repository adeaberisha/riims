using riims.Models.Domain;

namespace riims.Models.DTO.SpecializimiDto
{
    public class SpecializimetDTO
    {
        public Guid Id { get; set; }

        public string llojiIspecializimit { get; set; }

        public string? lokacionit { get; set; }

        public DateTime dataEFillimit { get; set; }

        public DateTime? dataEMbarimit { get; set; }

        public string? aftesiteEfituara { get; set; }

        public string? pershkrimi { get; set; }

        public int? nrKredive { get; set; }

        public string EmriInstitucionit { get; set; }

        public Guid UserId { get; set; }

        public Guid InstitucioniId { get; set; }
    }
}
