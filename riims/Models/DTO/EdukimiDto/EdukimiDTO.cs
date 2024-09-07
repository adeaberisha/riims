namespace riims.Models.DTO.EdukimiDto
{
    public class EdukimiDTO
    {
        public Guid Id { get; set; }

        public string FushaStudimit { get; set; }

        public string Lokacioni { get; set; }

        public DateTime DataFillimit { get; set; }

        public DateTime? DataMbarimit { get; set; }

        public string? Pershkrimi { get; set; }

        public string UserId { get; set; }

        public string Institucioni { get; set; }

        public string NiveliAkademik { get; set; }

        public Guid InstitucioniId { get; set; }

        public Guid NiveliAkademikId { get; set; }
    }
}
