namespace riims.Models.DTO.PublikimiDto
{
    public class PublikimiDto
    {
        public Guid Id { get; set; }

        public string Titulli { get; set; }

        public string LlojiPublikimit { get; set; }

        public string Institucioni { get; set; }

        public string Departamenti { get; set; }

         public string? LinkuPublikimit { get; set; }

        public bool? AutoriKryesor { get; set; }

         public DateTime DataPublikimi { get; set; }


        public string? Pershkrimi { get; set; }

    }
}