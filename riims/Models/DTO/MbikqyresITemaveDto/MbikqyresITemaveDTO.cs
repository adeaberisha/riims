using riims.Models.Domain;

namespace riims.Models.DTO.MbikqyresITemaveDto
{
    public class MbikqyresITemaveDTO
    {
        public Guid Id { get; set; }
        public string titulliTemes { get; set; }

        public string studenti { get; set; }

        public DateTime data { get; set; }

        public string EmriDepartamentit { get; set; }

        public string UserId { get; set; }

        public Guid DepartamentiId { get; set; }

    }
}
