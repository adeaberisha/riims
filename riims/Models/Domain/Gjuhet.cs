namespace riims.Models.Domain
{
    public class Gjuhet
    {
        public Guid Id { get; set; }

        public string EmriGjuhes { get; set; }
        
        public bool? meKurs { get; set; }

        public string UserId { get; set; }

        //[ForeignKey("UserId")]
        public User User { get; set; }
    }
}
