namespace riims.Models.DTO.AftesiteDto
{
    public class AddAftesiteRequestDTO
    {
        public string Emri { get; set; }

        public Guid UserId { get; set; }

        public Guid InstitucioniId { get; set; }
    }
}
