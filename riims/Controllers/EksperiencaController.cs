using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using riims.Data;
using riims.Models.Domain;
using riims.Models.DTO.EksperiencDto;
using riims.Models.DTO.PunaVullnetareDto;
using riims.Models.DTO.SpecializimiDto;
using riims.Repositories;
using System.Security.Claims;

namespace riims.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EksperiencaController : ControllerBase
    {
        private readonly IInstitucioniRepository institucioniRepository;
        private readonly IEksperiencaRepository eksperiencaRepository;
        private readonly IMapper mapper;

        public EksperiencaController(IInstitucioniRepository institucioniRepository, IEksperiencaRepository eksperiencaRepository, IMapper mapper)
        {
            this.institucioniRepository = institucioniRepository;
            this.eksperiencaRepository=eksperiencaRepository;
            this.mapper=mapper;
        }

        [HttpGet("get-eksperiencat-by-person-id")]
        public async Task<IActionResult> GetAll()
        {
            // Extract user ID from the token
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User ID not found in the token.");
            } 
            var eksperiencatDomain = await eksperiencaRepository.GetAllAsync(userId);
            
            return Ok(mapper.Map<List<EksperiencaDto>>(eksperiencatDomain));
        }

        [HttpGet("get-eksperienca-by-id/{id}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var eksperiencaDomain = await eksperiencaRepository.GetByIdAsync(id);

            if (eksperiencaDomain == null)
            {
                return NotFound();
            }

            
            return Ok(mapper.Map<EksperiencaDto>(eksperiencaDomain));
        }

        [HttpPost("add-eksperienca")]
        public async Task<IActionResult> Create([FromBody] AddEksperiencaRequestDto addEksperiencaRequest)
        {
            // Extract user ID from the token
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized(); // Or handle as appropriate
            }

            // Check if the institution exists by name
            var institucion = await institucioniRepository.GetByNameAsync(addEksperiencaRequest.EmriInstitucionit);

            // If the institution doesn't exist, create it
            if (institucion == null)
            {
                institucion = new Institucioni
                {
                    Id = Guid.NewGuid(),
                    Emri = addEksperiencaRequest.EmriInstitucionit
                };

                institucion = await institucioniRepository.CreateAsync(institucion);
            }
            // Convert the DTO to a domain model
            var eksperiencaDomain = mapper.Map<Eksperienca>(addEksperiencaRequest);
            eksperiencaDomain.UserId = userId;
            eksperiencaDomain.InstitucioniId = institucion.Id;

            // Use the domain model to create a Eksperienca
            eksperiencaDomain = await eksperiencaRepository.CreateAsync(userId, eksperiencaDomain);

            // Map the domain model back to DTO
            var eksperiencaDto = mapper.Map<EksperiencaDto>(eksperiencaDomain);

            return CreatedAtAction(nameof(GetById), new { id = eksperiencaDto.Id }, eksperiencaDto);
        }

        [HttpPut("update-eksperienca-by-id/{id}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateEksperiencaRequestDto updateEksperienca)
        {
            // Check if the institution exists by name
            var institucion = await institucioniRepository.GetByNameAsync(updateEksperienca.EmriInstitucionit);

            // If the institution doesn't exist, create it
            if (institucion == null)
            {
                institucion = new Institucioni
                {
                    Id = Guid.NewGuid(),
                    Emri = updateEksperienca.EmriInstitucionit
                };

                institucion = await institucioniRepository.CreateAsync(institucion);
            }

            // Fetch the existing PunaVullnetare
            var eksperiencaDomain = await eksperiencaRepository.GetByIdAsync(id);
            if (eksperiencaDomain == null)
            {
                return NotFound();
            }

            // Update the PunaVullnetare domain model with new data
            eksperiencaDomain = mapper.Map(updateEksperienca, eksperiencaDomain);
            eksperiencaDomain.InstitucioniId = institucion.Id;

            // Update PunaVullnetare in the database
            eksperiencaDomain = await eksperiencaRepository.UpdateAsync(id, eksperiencaDomain);

            return Ok(mapper.Map<EksperiencaDto>(eksperiencaDomain));
        }


        [HttpDelete("delete-eksperienca-by-id/{id}")]
        //[Route("{id:guid}")]
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
