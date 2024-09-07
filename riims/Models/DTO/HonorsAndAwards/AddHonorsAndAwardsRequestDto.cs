namespace riims.Models.DTO.HonorsAndAwards
{
    public class AddHonorsAndAwardsRequestDto
    {

        public string titulli { get; set; }

        public string issuer { get; set; }

        public DateTime dataEleshimit { get; set; }

        public string pershkrimi { get; set; }

        public string UserId { get; set; }

        public Guid InstitucioniId { get; set; }
    }
}
