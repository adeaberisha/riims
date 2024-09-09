using Microsoft.AspNetCore.Mvc;
using riims.Models.Domain;
using riims.Models.DTO.PunaVullnetareDto;
using riims.Repositories;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace riims.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PunaVullnetareController : ControllerBase
    {
        private readonly IPunaVullnetareRepository punaVullnetareRepository;
        private readonly IInstitucioniRepository institucioniRepository;
        private readonly IMapper mapper;

        public PunaVullnetareController(IPunaVullnetareRepository punaVullnetareRepository,
            IInstitucioniRepository institucioniRepository,
            IMapper mapper)
        {
            this.punaVullnetareRepository = punaVullnetareRepository;
            this.institucioniRepository = institucioniRepository;
            this.mapper = mapper;
        }

        [HttpGet("get-punet-vullnetare-by-person-id")]
        public async Task<IActionResult> GetAll()
        {
            // Extract user ID from the token
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User ID not found in the token.");
            }

            var punetVullnetareDomain = await punaVullnetareRepository.GetAllAsync(userId);

            return Ok(mapper.Map<List<PunaVullnetareDTO>>(punetVullnetareDomain));
        }

        [HttpGet("get-puna-vullnetare-by-id/{id}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var punaVullnetareDomain = await punaVullnetareRepository.GetByIdAsync(id);

            if (punaVullnetareDomain == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<PunaVullnetareDTO>(punaVullnetareDomain));
        }

        [HttpPost("add-puna-vullnetare")]
        public async Task<IActionResult> Create([FromBody] AddPunaVullnetareRequestDTO addPunaVullnetare)
        {
            // Extract user ID from the token
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized(); // Or handle as appropriate
            }

            // Check if the institution exists by name
            var institucion = await institucioniRepository.GetByNameAsync(addPunaVullnetare.EmriInstitucionit);

            // If the institution doesn't exist, create it
            if (institucion == null)
            {
                institucion = new Institucioni
                {
                    Id = Guid.NewGuid(),
                    Emri = addPunaVullnetare.EmriInstitucionit
                };

                institucion = await institucioniRepository.CreateAsync(institucion);
            }

            // Convert the DTO to a domain model
            var punaVullnetareDomain = mapper.Map<PunaVullnetare>(addPunaVullnetare);
            punaVullnetareDomain.UserId = userId;
            punaVullnetareDomain.InstitucioniId = institucion.Id;

            // Use the domain model to create a PunaVullnetare
            punaVullnetareDomain = await punaVullnetareRepository.CreateAsync(userId, punaVullnetareDomain);

            // Map the domain model back to DTO
            var punaVullnetareDto = mapper.Map<PunaVullnetareDTO>(punaVullnetareDomain);

            return CreatedAtAction(nameof(GetById), new { id = punaVullnetareDto.Id }, punaVullnetareDto);
        }

        [HttpPut("update-puna-vullnetare-by-id/{id}")]
        public async Task<IActionResult> Update([FromRoute] Guid id,
            [FromBody] UpdatePunaVullnetareRequestDTO updatePunaVullnetare)
        {
            // Check if the institution exists by name
            var institucion = await institucioniRepository.GetByNameAsync(updatePunaVullnetare.EmriInstitucionit);

            // If the institution doesn't exist, create it
            if (institucion == null)
            {
                institucion = new Institucioni
                {
                    Id = Guid.NewGuid(),
                    Emri = updatePunaVullnetare.EmriInstitucionit
                };

                institucion = await institucioniRepository.CreateAsync(institucion);
            }

            // Fetch the existing PunaVullnetare
            var punaVullnetareDomain = await punaVullnetareRepository.GetByIdAsync(id);
            if (punaVullnetareDomain == null)
            {
                return NotFound();
            }

            // Update the PunaVullnetare domain model with new data
            punaVullnetareDomain = mapper.Map(updatePunaVullnetare, punaVullnetareDomain);
            punaVullnetareDomain.InstitucioniId = institucion.Id;

            // Update PunaVullnetare in the database
            punaVullnetareDomain = await punaVullnetareRepository.UpdateAsync(id, punaVullnetareDomain);

            return Ok(mapper.Map<PunaVullnetareDTO>(punaVullnetareDomain));
        }

        [HttpDelete("delete-puna-vullnetare-by-id/{id}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var punaVullnetareDomain = await punaVullnetareRepository.DeleteAsync(id);

            if (punaVullnetareDomain == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<PunaVullnetareDTO>(punaVullnetareDomain));
        }
    }
}