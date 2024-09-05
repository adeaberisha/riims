using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using riims.Data;
using riims.Models.Domain;
using riims.Models.DTO;
using riims.Models.DTO.SpecializimiDto;
using riims.Repositories;

namespace riims.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpecializimetController : ControllerBase
    {
        private readonly RiimsDbContext dbContext;
        private readonly ISpecializimetRepository specializimetRepository;
        private readonly IMapper mapper;
      

        public SpecializimetController(RiimsDbContext dbContext, ISpecializimetRepository specializimetRepository,
            IMapper mapper)
        {
            this.dbContext = dbContext;
            this.specializimetRepository = specializimetRepository;
            this.mapper = mapper;
        }

        //GET ALL SPECIALIZIMET
        [HttpGet("get-specializimet-by-person-id/{userId}")]
        //[Route("users/{userId:Guid}")]
        public async Task<IActionResult> GetAll([FromRoute] Guid userId)
        {
            //Getting the data from database - domain models
            var specializimiDomain = await specializimetRepository.GetAllAsync(userId);

            //Mapping domain models to DTOs
            //Returning DTOs
            return Ok(mapper.Map<List<SpecializimetDTO>>(specializimiDomain));

        }

        //GET SPECIALIZIMI BY ID
        [HttpGet("get-specializim-by-id/{id}")]
        //[Route("{id:Guid}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            //Getting the specializimi domain model from the database
            var specializimiDomain = await specializimetRepository.GetByIdAsync(id);

            if (specializimiDomain == null)
            {
                return NotFound();
            }

            //Mapping the specializimi domain model to SpecializimetDTO
            //Returning DTO back to the client
            return Ok(mapper.Map<SpecializimetDTO>(specializimiDomain));
        }

        //CREATE Specializimi
        [HttpPost("add-specializim")]
        //[Route("{userId:Guid}")]
        public async Task<IActionResult> Create([FromRoute] Guid userId, [FromBody] AddSpecializimetRequestDTO addSpecializimi)
        {
            //Converting DTO to domain model
            var specializimiDomain = mapper.Map<Specializimet>(addSpecializimi);

            //Using domain model to create specializimi
            specializimiDomain = await specializimetRepository.CreateAsync(userId, specializimiDomain);

            //Mapping the domain model back to DTO
            var specializimiDTO = mapper.Map<SpecializimetDTO>(specializimiDomain);

            return CreatedAtAction(nameof(GetById), new { id = specializimiDTO.Id }, specializimiDTO);
        }


        //UPDATE SPECIALIZIMI
        [HttpPut("update-specializim-by-id/{id}")]
        //[Route("{id:Guid}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateSpecializimetRequestDTO updateSpecializimi)
        {
            //Mapping DTO to domain model 
            var specializimiDomain = mapper.Map<Specializimet>(updateSpecializimi);

            specializimiDomain = await specializimetRepository.UpdateAsync(id, specializimiDomain);

            if (specializimiDomain == null)
            {
                return NotFound();
            }

            //Converting domain model back to DTOs
            //Returning the DTO
            return Ok(mapper.Map<SpecializimetDTO>(specializimiDomain));
        }


        //DELETE SPECIALIZIMI
        [HttpDelete("delete-specializim-by-id/{id}")]
        //[Route("{id:Guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var specializimiDomain = await specializimetRepository.DeleteAsync(id);

            if (specializimiDomain == null)
            {
                return NotFound();
            }

            //Mapping the domain model to DTOs
            //Returning the deleted specializimi back
            return Ok(mapper.Map<SpecializimetDTO>(specializimiDomain));
        }
    }
}

