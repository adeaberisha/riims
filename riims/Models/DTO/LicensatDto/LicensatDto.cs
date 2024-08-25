namespace riims.Models.DTO.LicensatDto
{
    public class LicensatDto
    {
        public Guid Id { get; set; }

        public string Emri { get; set; }

        public DateTime DataLeshimit { get; set; }

        public DateTime? DataSkadimit { get; set; }

        public string? CredentialId { get; set; }

        public string? CredentialUrl { get; set; }

    }
}
