using AutoMapper;
using riims.Models.Domain;
using riims.Models.DTO;

namespace riims.Mappings
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Eksperienca, EksperiencaDto>();
            CreateMap<EksperiencaDto, Eksperienca>();
            CreateMap<AddEksperiencaRequestDto, Eksperienca>();
            CreateMap<UpdateEksperiencaRequestDto, Eksperienca>();
        }
    }
}
