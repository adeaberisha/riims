namespace riims.Models.Domain
{
    public class MbikqyresITemave
    {
        public Guid Id { get; set; }

        public string titulliTemes { get; set; }

        public string studenti { get; set; }
        
        public DateTime data { get; set; }

        public string UserId { get; set; }

        //[ForeignKey("UserId")]
        public User User { get; set; }

    }
}
