using AutoMapper;
using riims.Models.Domain;
using riims.Models.DTO.EksperiencDto;
using riims.Models.DTO.HonorsAndAwards;
using riims.Models.DTO.LicensatDto;

namespace riims.Mappings
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            //Eksperienca
            CreateMap<Eksperienca, EksperiencaDto>();
            CreateMap<EksperiencaDto, Eksperienca>();
            CreateMap<AddEksperiencaRequestDto, Eksperienca>();
            CreateMap<UpdateEksperiencaRequestDto, Eksperienca>();

            //HonorsAndAwards
            CreateMap<HonorsAndAwards, HonorsAndAwardsDto>();
            CreateMap<HonorsAndAwardsDto, HonorsAndAwards>();
            CreateMap<AddHonorsAndAwardsRequestDto, HonorsAndAwards>();
            CreateMap<UpdateHonorsAndAwardsRequestDto, HonorsAndAwards>();

            //licensat
            CreateMap<Licensat, LicensatDto>();
            CreateMap<LicensatDto, Licensat>();
            CreateMap<AddLicensatRequestDto, Licensat>();
            CreateMap<UpdateLicensatRequestDto, Licensat>();
        }
    }
}
