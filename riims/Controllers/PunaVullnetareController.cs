using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using riims.Data;
using riims.Models.Domain;
using riims.Models.DTO;
using riims.Models.DTO.PunaVullnetareDto;
using riims.Repositories;

namespace riims.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PunaVullnetareController : ControllerBase
    {
        private readonly IPunaVullnetareRepository punaVullnetareRepository;
        private readonly IMapper mapper;

        public PunaVullnetareController(IPunaVullnetareRepository punaVullnetareRepository,
            IMapper mapper)
        {
            this.punaVullnetareRepository = punaVullnetareRepository;
            this.mapper = mapper;
        }

        [HttpGet("get-punet-vullnetare-by-person-id/{userId}")]
        //[Route("users/{userId:Guid}")]
        public async Task<IActionResult> GetAll([FromRoute] Guid userId)
        {
            var punetVullnetareDomain = await punaVullnetareRepository.GetAllAsync(userId);

            return Ok(mapper.Map<List<PunaVullnetareDTO>>(punetVullnetareDomain));
        }

        [HttpGet("get-puna-vullnetare-by-id/{id}")]
        //[Route("{id:Guid}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var punaVullnetareDomain = await punaVullnetareRepository.GetByIdAsync(id);

            if (punaVullnetareDomain == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<PunaVullnetareDTO>(punaVullnetareDomain));
        }

        [HttpPost("add-puna-vullnetare/{userId}")]
        //[Route("{userId:Guid}")]

        public async Task<IActionResult> Create([FromRoute] Guid userId,
            [FromBody] AddPunaVullnetareRequestDTO addPunaVullnetare)
        {
            //Converting the DTO to a domain model
            var punaVullnetareDomain = mapper.Map<PunaVullnetare>(addPunaVullnetare);

            //Using the domain model to create a pune vullnetare
            punaVullnetareDomain = await punaVullnetareRepository.CreateAsync(userId, punaVullnetareDomain);

            //Mapping the domain model back to DTO
            var punaVullnetareDto = mapper.Map<PunaVullnetareDTO>(punaVullnetareDomain);

            //Returning the created pune vullnetare
            return CreatedAtAction(nameof(GetById), new { id = punaVullnetareDto.Id }, punaVullnetareDto);
        }

        [HttpPut("update-puna-vullnetare-by-id/{id}")]
        //[Route("{id:Guid}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, 
            UpdatePunaVullnetareRequestDTO  updatePunaVullnetare)
        {
            var punaVullnetareDomain = mapper.Map<PunaVullnetare>(updatePunaVullnetare);

            punaVullnetareDomain = await punaVullnetareRepository.UpdateAsync(id, punaVullnetareDomain);

            if(punaVullnetareDomain == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<PunaVullnetareDTO>(punaVullnetareDomain));
        }

        [HttpDelete("delete-puna-vullnetare-by-id/{id}")]
        //[Route("{id:Guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var punaVullnetareDomain = await punaVullnetareRepository.DeleteAsync(id);

            if(punaVullnetareDomain == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<PunaVullnetareDTO>(punaVullnetareDomain));
        }
    }
}
