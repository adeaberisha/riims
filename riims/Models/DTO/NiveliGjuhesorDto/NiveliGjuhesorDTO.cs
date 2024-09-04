namespace riims.Models.DTO.NiveliGjuhesorDto
{
    public class NiveliGjuhesorDTO
    {
        public Guid Id { get; set; }

        public string Niveli { get; set; }

        public List<Guid> UserIds { get; set; } = new List<Guid>();

    }
}
