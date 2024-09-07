using AutoMapper;
using riims.Models.Domain;
using riims.Models.DTO;
using riims.Models.DTO.AftesiteDto;
using riims.Models.DTO.DepartamentiDto;
using riims.Models.DTO.EdukimiDto;
using riims.Models.DTO.EksperiencDto;
using riims.Models.DTO.GjuhetDto;
using riims.Models.DTO.HonorsAndAwards;
using riims.Models.DTO.InstitucioniDto;
using riims.Models.DTO.LicensatDto;
using riims.Models.DTO.NiveliGjuhesorDto;
using riims.Models.DTO.ProjektiDto;
using riims.Models.DTO.Publikimi;
using riims.Models.DTO.PunaVullnetareDto;
using riims.Models.DTO.SpecializimiDto;
using riims.Models.DTO.UserDTO;
using riims.Models.DTO.UserGjuhetDto;

namespace riims.Mappings
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            //Eksperienca
            CreateMap<Eksperienca, EksperiencaDto>();
            CreateMap<AddEksperiencaRequestDto, Eksperienca>();
            CreateMap<UpdateEksperiencaRequestDto, Eksperienca>();
            CreateMap<Eksperienca, EksperiencaDto>()
           .ForMember(dest => dest.EmriInstitucionit, opt => opt.MapFrom(src => src.Institucioni.Emri));

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
            CreateMap<Licensat, LicensatDto>()
           .ForMember(dest => dest.EmriInstitucionit, opt => opt.MapFrom(src => src.Institucioni.Emri));

            //Projekti
            CreateMap<Projekti, ProjektiDto>();
            CreateMap<ProjektiDto, Projekti>();
            CreateMap<AddProjektiRequestDto, Projekti>();
            CreateMap<UpdateProjektiRequestDto, Projekti>();

            //Edukimi
            CreateMap<Edukimi, EdukimiDTO>()
                .ForMember(dest => dest.Institucioni, opt => opt.MapFrom(src => src.Institucioni.Emri))
                .ForMember(dest => dest.NiveliAkademik, opt => opt.MapFrom(src => src.NiveliAkademik.lvl));

            CreateMap<AddEdukimiRequestDTO, Edukimi>()
                .ForMember(dest => dest.Institucioni, opt => opt.Ignore())
                .ForMember(dest => dest.NiveliAkademik, opt => opt.Ignore());

            CreateMap<UpdateEdukimiRequestDTO, Edukimi>()
                .ForMember(dest => dest.Institucioni, opt => opt.Ignore())
                .ForMember(dest => dest.NiveliAkademik, opt => opt.Ignore());

            //Institucioni
            CreateMap<Institucioni, InstitucioniDto>().ReverseMap();
            CreateMap<AddInstitucioniRequestDto, Institucioni>().ReverseMap();
            CreateMap<UpdateInstitucioniRequestDTO, Institucioni>().ReverseMap();

            //Publikimi
            CreateMap<Publikimi, PublikimiDTO>();
            CreateMap<PublikimiDTO, Publikimi>();
            CreateMap<AddPublikimiRequestDTO, Publikimi>();
            CreateMap<UpdatePublikimiRequestDTO, Publikimi>();

            //PunaVullnetare
            CreateMap<PunaVullnetare, PunaVullnetareDTO>().ReverseMap();
            CreateMap<AddPunaVullnetareRequestDTO, PunaVullnetare>().ReverseMap();
            CreateMap<UpdatePunaVullnetareRequestDTO, PunaVullnetare>().ReverseMap();

            //Aftesite
            CreateMap<Aftesite, AftesiteDTO>().ReverseMap();
            CreateMap<AddAftesiteRequestDTO, Aftesite>().ReverseMap();
            CreateMap<UpdateAftesiteRequestDTO, Aftesite>().ReverseMap();
            CreateMap<Aftesite, AftesiteDTO>()
            .ForMember(dest => dest.EmriInstitucionit, opt => opt.MapFrom(src => src.Institucioni.Emri));

            //Gjuhet
            CreateMap<Gjuhet, GjuhetDto>().ReverseMap();
            CreateMap<AddGjuhetDto, Gjuhet>().ReverseMap();
            CreateMap<UpdateGjuhetDto, Gjuhet>().ReverseMap();

            //Specializimet
            CreateMap<Specializimet, SpecializimetDTO>().ReverseMap();
            CreateMap<AddSpecializimetRequestDTO, Specializimet>().ReverseMap();
            CreateMap<UpdateSpecializimetRequestDTO, Specializimet>().ReverseMap();
            CreateMap<Specializimet, SpecializimetDTO>()
            .ForMember(dest => dest.EmriInstitucionit, opt => opt.MapFrom(src => src.Institucioni.Emri));

            //Departamenti
            CreateMap<Departamenti, DepartamentiDto>().ReverseMap();
            CreateMap<AddDepartamentiRequestDto, Departamenti>().ReverseMap();
            CreateMap<UpdateDepartamentiRequestDto, Departamenti>().ReverseMap();

            //User
            CreateMap<User, UserDTO>()
            .ForMember(dest => dest.NiveliAkademik, opt => opt.MapFrom(src => src.NiveliAkademik.lvl))
            .ForMember(dest => dest.NiveliAkademikId, opt => opt.MapFrom(src => src.NiveliAkademik.Id))
            .ReverseMap();
            CreateMap<AddUserRequestDTO, User>()
                .ForMember(dest => dest.NiveliAkademik, opt => opt.Ignore())
                .ReverseMap();
            CreateMap<UpdateUserRequestDTO, User>()
                .ForMember(dest => dest.NiveliAkademik, opt => opt.Ignore()) // Handle separately
                .ReverseMap();
            CreateMap<NiveliAkademik, UserDTO>()
                .ForMember(dest => dest.NiveliAkademik, opt => opt.MapFrom(src => src.lvl))
                .ReverseMap();

            //NiveliGjuhesor
            CreateMap<NiveliGjuhesor, NiveliGjuhesorDTO>().ReverseMap();
            CreateMap<AddNiveliGjuhesorRequestDTO, NiveliGjuhesor>().ReverseMap();
            CreateMap<UpdateNiveliGjuhesorRequestDto, NiveliGjuhesor>().ReverseMap();

            //UserGjuhet
            CreateMap<UserGjuhet, UserGjuhetDTO>().ReverseMap();
            CreateMap<AddUserGjuhetRequestDTO, UserGjuhet>().ReverseMap();
            CreateMap<UpdateUserGjuhetRequestDTO, UserGjuhet>().ReverseMap();
            CreateMap<UserGjuhet, UserGjuhetDTO>()
            .ForMember(dest => dest.EmriGjuhes, opt => opt.MapFrom(src => src.Gjuha.EmriGjuhes))
            .ForMember(dest => dest.NiveliGjuhesor, opt => opt.MapFrom(src => src.NiveliGjuhesor.Niveli));

        }
    }
}
