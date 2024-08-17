namespace riims.Models.Domain
{
    public class PunaVullnetare
    {
        public Guid Id { get; set; }

        public string EmriOrganizates { get; set; }

        public string Roli { get; set; }

        public DateTime DataFillimit { get; set; }

        public DateTime? DataMbarimit { get; set; }

        public string? Pershkrimi { get; set; }

        public string UserId { get; set; }

        //[ForeignKey("UserId")]
        public User User { get; set; }

    }
}
