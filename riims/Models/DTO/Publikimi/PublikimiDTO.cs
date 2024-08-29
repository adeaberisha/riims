namespace riims.Models.DTO.Publikimi
{
    public class PublikimiDTO
    {
        public Guid Id { get; set; }

        public string Titulli { get; set; }

        public string LlojiPublikimit { get; set; }

        public string? LinkuPublikimit { get; set; }

        public bool? AutoriKryesor { get; set; }

        public DateTime DataPublikimi { get; set; }
        public Guid DepartamentiId { get; set; }

    }
}
