namespace riims.Models.Domain
{
    public class PunaVullnetare
    {
        public Guid Id { get; set; }

        public string Roli { get; set; }

        public DateTime DataFillimit { get; set; }

        public DateTime? DataMbarimit { get; set; }

        public string? Pershkrimi { get; set; }

        public Guid UserId { get; set; }
        public User User { get; set; }

        public Guid InstitucioniId { get; set; }
        public Institucioni Institucioni { get; set; }

    }
}
