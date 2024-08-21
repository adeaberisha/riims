namespace riims.Models.DTO
{
    public class UpdateEksperiencaRequestDto
    {
        public string Titulli { get; set; }

        public string LlojiPunesimit { get; set; }

        public string Lokacioni { get; set; }

        public string LlojiLokacionit { get; set; }

        public DateTime DataFillimit { get; set; }

        public DateTime? DataMbarimit { get; set; }

        public String? Pershkrimi { get; set; }

    }
}
