using riims.Models.Domain;

namespace riims.Models.DTO.DepartamentiDto
{
    public class DepartamentiDto
    {
        public Guid Id { get; set; }

        public string Emri { get; set; }

        public Guid InstitucioniId { get; set; }

        //public ICollection<MbikqyresITemave> Mbikqyresit { get; set; } = new HashSet<MbikqyresITemave>();
       // public ICollection<Publikimi> Publikimet { get; set; } = new HashSet<Publikimi>();
    }
}