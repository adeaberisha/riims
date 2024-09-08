using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using riims.Data;
using riims.Models.Domain;
using riims.Models.DTO;
using riims.Models.DTO.InstitucioniDto;
using riims.Repositories;

namespace riims.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InstitucioniController : ControllerBase
    {
        private readonly IInstitucioniRepository institucioniRepository;
        private readonly IMapper mapper;

        public InstitucioniController(IInstitucioniRepository institucioniRepository,
            IMapper mapper)
        {
            this.institucioniRepository = institucioniRepository;
            this.mapper = mapper;
        }

        //GET ALL INSTITUCIONET
        [HttpGet("get-all-Institucionet")]
        public async Task<IActionResult> GetAll()
        {
            //Getting the data from database - domain models
            var institucioniDomain = await institucioniRepository.GetAllAsync();

            //Mapping domain models to DTOs
            //Returning DTOs
            return Ok(mapper.Map<List<InstitucioniDto>>(institucioniDomain));

        }

        //GET INSTITUCIONI BY ID
        [HttpGet("get-Institucionet-by-id/{id}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            //Getting the institucioni domain model from the database
            var institucioniDomain = await institucioniRepository.GetByIdAsync(id);

            if (institucioniDomain == null)
            {
                return NotFound();
            }

            //Mapping the institucioni domain model to EdukimiDTO
            //Returning DTO back to the client
            return Ok(mapper.Map<InstitucioniDto>(institucioniDomain));
        }

        //CREATE INSTITUCIONI
        [HttpPost("add-Institucionin")]
        public async Task<IActionResult> Create([FromBody] AddInstitucioniRequestDto addInstitucioniRequestDto)
        {
            //Converting DTO to domain model
            var institucioniDomain = mapper.Map<Institucioni>(addInstitucioniRequestDto);

            //Using domain model to create edukimi
            institucioniDomain = await institucioniRepository.CreateAsync(institucioniDomain);

            //Mapping the domain model back to DTO
            var institucioniDto = mapper.Map<InstitucioniDto>(institucioniDomain);

            return CreatedAtAction(nameof(GetById), new { id = institucioniDto.Id }, institucioniDto);
        }


        [HttpPut("update-Institucionin-by-id/{id}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateInstitucioniRequestDTO updateInstitucioniRequestDTO)
        {
            //Mapping DTO to domain model 
            var institucioniDomain = mapper.Map<Institucioni>(updateInstitucioniRequestDTO);

            institucioniDomain = await institucioniRepository.UpdateAsync(id, institucioniDomain);

            if (institucioniDomain == null)
            {
                return NotFound();
            }

            //Converting domain model back to DTOs
            //Returning the DTO
            return Ok(mapper.Map<InstitucioniDto>(institucioniDomain));
        }


        //DELETE Institucioni
        [HttpDelete("delete-Institucionin-by-id/{id}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var institucioniDomain = await institucioniRepository.DeleteAsync(id);

            if (institucioniDomain == null)
            {
                return NotFound();
            }

            //Mapping the domain model to DTOs
            //Returning the deleted institucioni back
            return Ok(mapper.Map<InstitucioniDto>(institucioniDomain));
        }

        // GET INSTITUCIONI BY NAME
        [HttpGet("get-Institucionin-by-name/{name}")]
        public async Task<IActionResult> GetByName([FromRoute] string name)
        {
            // Getting the institucioni domain model from the database by name
            var institucioniDomain = await institucioniRepository.GetByNameAsync(name);

            if (institucioniDomain == null)
            {
                return NotFound();
            }

            // Mapping the institucioni domain model to DTO
            // Returning DTO back to the client
            return Ok(mapper.Map<InstitucioniDto>(institucioniDomain));
        }
    }
}
