namespace riims.Models.Domain
{
    public class MbikqyresITemave
    {
        public Guid Id { get; set; }

        public string titulliTemes { get; set; }

        public string studenti { get; set; }
        
        public DateTime data { get; set; }

        public Guid UserId { get; set; }
        public User User { get; set; }

        public Guid DepartamentiId { get; set; }
        public Departamenti Departamenti { get; set; }

    }
}
