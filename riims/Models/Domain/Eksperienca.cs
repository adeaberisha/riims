namespace riims.Models.Domain
{
    public class Eksperienca
    {
        public Guid Id { get; set; }

        public string Titulli { get; set; }

        public string LlojiPunesimit { get; set; }

        public string Lokacioni { get; set; }

        public string LlojiLokacionit { get; set; }

        public DateTime DataFillimit { get; set; }

        public DateTime? DataMbarimit { get; set; }

        public String? Pershkrimi { get; set; }

        public Guid UserId { get; set; }
        public User User { get; set; }
        public Guid InstitucioniId { get; set; }
        public Institucioni Institucioni { get; set; }

    }
}
