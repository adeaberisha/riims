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
        private readonly RiimsDbContext dbContext;
        private readonly IProjektiRepository projektiRepository;
        private readonly IMapper mapper;

        public ProjektiController(RiimsDbContext dbContext, IProjektiRepository projektiRepository, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.projektiRepository = projektiRepository;
            this.mapper = mapper;
        }

        [HttpGet("user/{userId:guid}")]
        public async Task<IActionResult> GetAll([FromRoute] Guid userId)
        {
            var projektiDomain = await projektiRepository.GetAllAsync(userId);
            return Ok(mapper.Map<List<ProjektiDto>>(projektiDomain));
        }

        [HttpGet("id/{id:guid}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var projektiDomain = await projektiRepository.GetByIdAsync(id);

            if (projektiDomain == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<ProjektiDto>(projektiDomain));
        }

        [HttpPost("user/{userId:guid}")]
        public async Task<IActionResult> Create([FromRoute] Guid userId, [FromBody] AddProjektiRequestDto addProjektiRequestDto)
        {
            var projektiDomainModel = mapper.Map<Projekti>(addProjektiRequestDto);

            projektiDomainModel = await projektiRepository.CreateAsync(userId, projektiDomainModel);

            var projektiDto = mapper.Map<ProjektiDto>(projektiDomainModel);

            return CreatedAtAction(nameof(GetById), new { id = projektiDto.Id }, projektiDto);
        }

        [HttpPut]
        [Route("{id:guid}")]

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

        [HttpDelete]
        [Route("{id:guid}")]
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
