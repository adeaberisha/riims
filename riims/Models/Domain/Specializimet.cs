namespace riims.Models.Domain
{
    public class Specializimet
    {
        public Guid Id { get; set; }

        public string emriIinstitucionit { get; set; }

        public string llojiIspecializimit { get; set; }

        public string? lokacionit { get; set; }

        public DateTime dataEFillimit { get; set; }

        public DateTime? dataEMbarimit { get; set; }

        public string? aftesiteEfituara { get; set; }

        public string? pershkrimi { get; set; }

        public int? nrKredive { get; set; }
        
        public string UserId { get; set; }

        //[ForeignKey("UserId")]
        public User User { get; set; }

    }
}
