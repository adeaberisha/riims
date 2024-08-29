using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using riims.Data;
using riims.Models.Domain;
using riims.Models.DTO.EksperiencDto;
using riims.Repositories;

namespace riims.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EksperiencaController : ControllerBase
    {
        private readonly IEksperiencaRepository eksperiencaRepository;
        private readonly IMapper mapper;

        public EksperiencaController(IEksperiencaRepository eksperiencaRepository, IMapper mapper)
        {
            this.eksperiencaRepository=eksperiencaRepository;
            this.mapper=mapper;
        }

        [HttpGet("user/{userId:guid}")]
        public async Task<IActionResult> GetAll([FromRoute] Guid userId)
        {
            var eksperiencatDomain = await eksperiencaRepository.GetAllAsync(userId);
            return Ok(mapper.Map<List<EksperiencaDto>>(eksperiencatDomain));
        }

        [HttpGet("id/{id:guid}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var eksperiencaDomain = await eksperiencaRepository.GetByIdAsync(id);

            if (eksperiencaDomain == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<EksperiencaDto>(eksperiencaDomain));
        }

        [HttpPost("user/{userId:guid}")]
        public async Task<IActionResult> Create([FromRoute] Guid userId, [FromBody] AddEksperiencaRequestDto addEksperiencaRequestDto)
        {         
            var eksperiencaDomainModel = mapper.Map<Eksperienca>(addEksperiencaRequestDto);
            
            eksperiencaDomainModel = await eksperiencaRepository.CreateAsync(userId, eksperiencaDomainModel);
         
            var eksperiencaDto = mapper.Map<EksperiencaDto>(eksperiencaDomainModel);
           
            return CreatedAtAction(nameof(GetById), new { id = eksperiencaDto.Id }, eksperiencaDto);
        }

        [HttpPut]
        [Route("{id:guid}")]

        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateEksperiencaRequestDto updateEksperiencaRequestDto) 
        {

            var eksperiencaDomainModel = mapper.Map<Eksperienca>(updateEksperiencaRequestDto);

            //check nese eksperienca ekziston
            eksperiencaDomainModel = await eksperiencaRepository.UpdateAsync(id, eksperiencaDomainModel);

            if (eksperiencaDomainModel == null) {
                return NotFound();
            }
 
            return Ok(mapper.Map<Eksperienca>(eksperiencaDomainModel));
        }

        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var eksperiencaDomainModel = await eksperiencaRepository.DeleteAsync(id);

            if (eksperiencaDomainModel == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<Eksperienca>(eksperiencaDomainModel));
        }
    }
}
