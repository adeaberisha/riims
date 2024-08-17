namespace riims.Models.Domain
{
    public class Edukimi
    {
        public Guid Id { get; set; }

        public string FushaStudimit { get; set; }

        public string Lokacioni { get; set; }

        public DateTime DataFillimit { get; set; }

        public DateTime? DataMbarimit { get; set; }

        public string? Pershkrimi { get; set; }

        public string UserId { get; set; }

        //[ForeignKey("UserId")]
        public User User { get; set; }

    }
}
