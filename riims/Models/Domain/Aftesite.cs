namespace riims.Models.Domain
{
    public class Aftesite
    {
        public Guid Id { get; set; }
        
        public string Aftesia { get; set; }

        public string UserId { get; set; }

        //[ForeignKey("UserId")]
        public User User { get; set; }
    }
}
