using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using riims.Data;
using riims.Models.Domain;
using riims.Models.DTO.GjuhetDto;
using riims.Models.DTO.InstitucioniDto;
using riims.Repositories;

namespace riims.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GjuhetController : ControllerBase
    {
        private readonly RiimsDbContext dbContext;
        private readonly IGjuhetRepostory gjuhetRepository;
        private readonly IMapper mapper;

        public GjuhetController(RiimsDbContext dbContext, IGjuhetRepostory gjuhetRepository, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.gjuhetRepository = gjuhetRepository;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() 
        {
            var gjuhetDomain = await gjuhetRepository.GetAllAsync();

            return Ok(mapper.Map<List<GjuhetDto>>(gjuhetDomain));
        }


        [HttpGet("get-gjuhet/{id}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var gjuhetDomain = await gjuhetRepository.GetByIdAsync (id);

            if(gjuhetDomain == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<GjuhetDto>(gjuhetDomain));
        }


        [HttpPost("add-gjuha")]
        public async Task<IActionResult> Create([FromBody] AddGjuhetDto addGjuhetDto)
        {
            var gjuhetDomain = mapper.Map<Gjuhet>(addGjuhetDto);

            gjuhetDomain = await gjuhetRepository.CreateAsync(gjuhetDomain);

            var gjuhetDto = mapper.Map<GjuhetDto>(gjuhetDomain);
   
            return CreatedAtAction(nameof(GetById), new { id = gjuhetDto.Id }, gjuhetDto);
        }


        [HttpPut("update-gjuha-by-id/{id}")]
        //[Route("{id:Guid}")]
        public async Task<IActionResult> Update([FromRoute]Guid id, [FromBody] UpdateGjuhetDto updateGjuhetDto)
        {

            var gjuhetDomain = mapper.Map<Gjuhet>(updateGjuhetDto);
            
            gjuhetDomain = await gjuhetRepository.UpdateAsync(id, gjuhetDomain);

            if (gjuhetDomain == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<GjuhetDto>(gjuhetDomain));
        }

        [HttpDelete("delete-gjuha-by-id/{id}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var gjuhetDomain = await gjuhetRepository.DeleteAsync(id);

            if (gjuhetDomain == null) { return NotFound(); }

            var gjuhetDto = mapper.Map<GjuhetDto>(gjuhetDomain);

            return Ok();
        }

        // GET GJUHA BY NAME
        [HttpGet("get-Institucionin-by-name/{name}")]
        public async Task<IActionResult> GetByName([FromRoute] string name)
        {
            // Getting the gjuha domain model from the database by name
            var gjuhaDomain = await gjuhetRepository.GetByNameAsync(name);

            if (gjuhaDomain == null)
            {
                return NotFound();
            }

            // Mapping the gjuha domain model to DTO
            // Returning DTO back to the client
            return Ok(mapper.Map<GjuhetDto>(gjuhaDomain));
        }
    }
}
