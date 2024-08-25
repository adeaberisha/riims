namespace riims.Models.DTO.ProjektiDto
{
    public class UpdateProjektiRequestDto
    {
        public string emriProjektit { get; set; }

        public DateTime startDate { get; set; }

        public DateTime? endDate { get; set; }

        public string? collaborators { get; set; }

        public string description { get; set; }

        public string asocohet { get; set; }
    }
}
