namespace riims.Models.DTO.AftesiteDto
{
    public class UpdateAftesiteRequestDTO
    {
        public string Emri { get; set; }

        public Guid UserId { get; set; }

        public Guid InstitucioniId { get; set; }
    }
}
