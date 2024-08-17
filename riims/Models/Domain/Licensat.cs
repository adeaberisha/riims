namespace riims.Models.Domain
{
    public class Licensat
    {
        public Guid Id { get; set; }

        public string Emri { get; set; }

        public DateTime DataLeshimit { get; set; }

        public DateTime? DataSkadimit { get; set; }

        public string? CredentialId { get; set; }

        public string? CredentialUrl { get; set; }

        public string UserId { get; set; }

        //[ForeignKey("UserId")]
        public User User { get; set; }
    }
}
