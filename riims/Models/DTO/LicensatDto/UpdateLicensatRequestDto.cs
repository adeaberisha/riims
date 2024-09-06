namespace riims.Models.DTO.LicensatDto
{
    public class UpdateLicensatRequestDto
    {
        public string Emri { get; set; }

        public DateTime DataLeshimit { get; set; }

        public DateTime? DataSkadimit { get; set; }

        public string? CredentialId { get; set; }

        public string? CredentialUrl { get; set; }

        public string EmriInstitucionit { get; set; }
        //public Guid InstitucioniId { get; set; }

    }
}
