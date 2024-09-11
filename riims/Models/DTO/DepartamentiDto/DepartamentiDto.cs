using riims.Models.Domain;


namespace riims.Models.DTO.DepartamentiDto
{
    public class DepartamentiDto
    {
        public Guid Id { get; set; }

        public string Emri { get; set; }

        public string EmriInstitucionit { get; set; }
        //public Guid InstitucioniId { get; set; }

        //public ICollection<MbikqyresITemave> Mbikqyresit { get; set; } = new HashSet<MbikqyresITemave>();
        //public ICollection<riims.Models.Domain.Publikimi> Publikimet { get; set; } = new HashSet<riims.Models.Domain.Publikimi>();
    }
}