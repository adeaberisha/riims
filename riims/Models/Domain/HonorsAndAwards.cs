namespace riims.Models.Domain
{
    public class HonorsAndAwards
    {
        public Guid Id { get; set; }

        public string titulli { get; set; }

        public string issuer { get; set; }

        public DateTime dataEleshimit { get; set; }
        
        public string pershkrimi { get; set; }

        public string UserId { get; set; }
        public User User { get; set; }
        public Guid InstitucioniId { get; set; }
        public Institucioni Institucioni { get; set; }

    }
}
