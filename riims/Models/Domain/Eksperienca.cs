namespace riims.Models.Domain
{
    public class Eksperienca
    {
        public Guid Id { get; set; }

        public string Titulli { get; set; }

        public string LlojiPunesimit { get; set; }

        public string EmriKompanise { get; set; }

        public string Lokacioni { get; set; }

        public string LlojiLokacionit { get; set; }

        public DateTime DataFillimit { get; set; }

        public DateTime? DataMbarimit { get; set; }

        public String? Pershkrimi { get; set; }

        public string UserId { get; set; }

        //[ForeignKey("UserId")]
        public User User { get; set; }

    }
}
