namespace riims.Models.Domain
{
    public class Projekti
    {
        public Guid Id { get; set; }

        public string emriProjektit { get; set; }

        public DateTime startDate { get; set; }

        public DateTime? endDate { get; set; }

        public string? collaborators { get; set; }

        public string description { get; set; }
        
        public string asocohet { get; set; }

        public string UserId { get; set; }
        public User User { get; set; }

        public Guid InstitucioniId { get; set; }
        public Institucioni Institucioni { get; set; }



    }
}
