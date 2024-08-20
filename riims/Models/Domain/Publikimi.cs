namespace riims.Models.Domain
{
    public class Publikimi
    {
        public Guid Id { get; set; }

        public string Titulli { get; set; }

        public string LlojiPublikimit { get; set; }

        public string? LinkuPublikimit { get; set; }

        public bool? AutoriKryesor { get; set; }

        public DateTime DataPublikimi { get; set; }

        public Guid UserId { get; set; }
        public User User { get; set; }

        public Guid DepartamentiId { get; set; }
        public Departamenti Departamenti { get; set; }
    }
}
