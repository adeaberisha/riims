using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using riims.Data;
using riims.Models.Domain;
using riims.Models.DTO.ProjektiDto;
using riims.Repositories;

namespace riims.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjektiController : ControllerBase
    {
        private readonly IProjektiRepository projektiRepository;
        private readonly IMapper mapper;

        public ProjektiController(IProjektiRepository projektiRepository, IMapper mapper)
        {
            this.projektiRepository = projektiRepository;
            this.mapper = mapper;
        }

        [HttpGet("get-projekti-by-person-id/{userId}")]
        public async Task<IActionResult> GetAll([FromRoute] string userId)
        {
            var projektiDomain = await projektiRepository.GetAllAsync(userId);
            return Ok(mapper.Map<List<ProjektiDto>>(projektiDomain));
        }

        [HttpGet("get-projekti-by-id/{id}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var projektiDomain = await projektiRepository.GetByIdAsync(id);

            if (projektiDomain == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<ProjektiDto>(projektiDomain));
        }

        [HttpPost("add-projekti/{userId}")]
        public async Task<IActionResult> Create([FromRoute] string userId, [FromBody] AddProjektiRequestDto addProjektiRequestDto)
        {
            var projektiDomainModel = mapper.Map<Projekti>(addProjektiRequestDto);

            projektiDomainModel = await projektiRepository.CreateAsync(userId, projektiDomainModel);

            var projektiDto = mapper.Map<ProjektiDto>(projektiDomainModel);

            return CreatedAtAction(nameof(GetById), new { id = projektiDto.Id }, projektiDto);
        }

        [HttpPut("update-projekti-by-id/{id}")]
        //[Route("{id:guid}")]

        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateProjektiRequestDto updateProjektiRequestDto)
        {

            var projektiDomainModel = mapper.Map<Projekti>(updateProjektiRequestDto);


            projektiDomainModel = await projektiRepository.UpdateAsync(id, projektiDomainModel);

            if (projektiDomainModel == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<Projekti>(projektiDomainModel));
        }

        [HttpDelete("delete-projekti-by-id/{id}")]
        //[Route("{id:guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var projektiDomainModel = await projektiRepository.DeleteAsync(id);

            if (projektiDomainModel == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<Projekti>(projektiDomainModel));
        }
    }
}
