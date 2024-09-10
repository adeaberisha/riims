using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using riims.Data;
using riims.Models.Domain;
using riims.Models.DTO.LicensatDto;
using riims.Models.DTO.SpecializimiDto;
using riims.Repositories;
using System.ComponentModel;
using System.Security.Claims;

namespace riims.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LicensatController : ControllerBase
    {
        private readonly RiimsDbContext dbContext;
        private readonly ILicensatRepository licensatRepository;
        private readonly IInstitucioniRepository institucioniRepository;
        private readonly IMapper mapper;

        public LicensatController(ILicensatRepository licensatRepository, 
            IInstitucioniRepository institucioniRepository,
            IMapper mapper)
        {
            this.licensatRepository=licensatRepository;
            this.institucioniRepository = institucioniRepository;
            this.mapper=mapper;
        }

        [HttpGet("get-licensat")]
        public async Task<IActionResult> GetAll()
        {
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User ID not found in the token.");
            }

            var licensatDomain = await licensatRepository.GetAllAsync(userId);
            var licensatDTO = mapper.Map<List<LicensatDto>>(licensatDomain);
            return Ok(licensatDTO);
        }

        [HttpGet("get-licensa-by-id/{id}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var licensatDomain = await licensatRepository.GetByIdAsync(id);

            if (licensatDomain == null)
            {
                return NotFound();
            }

            var licensatDTO = mapper.Map<LicensatDto>(licensatDomain);

            return Ok(licensatDTO);
        }

        [HttpPost("add-licensa")]
        public async Task<IActionResult> Create([FromBody] AddLicensatRequestDto addLicensat)
        {
            // Extract user ID from the token
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized(); // Or handle as appropriate
            }

            // Check if the institution exists by name
            var institucion = await institucioniRepository.GetByNameAsync(addLicensat.EmriInstitucionit);

            // If the institution doesn't exist, create it
            if (institucion == null)
            {
                institucion = new Institucioni
                {
                    Id = Guid.NewGuid(),
                    Emri = addLicensat.EmriInstitucionit
                };

                institucion = await institucioniRepository.CreateAsync(institucion);
            }

            // Convert the DTO to a domain model
            var licensatDomain = mapper.Map<Licensat>(addLicensat);
            licensatDomain.UserId = userId;
            licensatDomain.InstitucioniId = institucion.Id;

            // Use the domain model to create a Licensat
            licensatDomain = await licensatRepository.CreateAsync(userId, licensatDomain);

            // Map the domain model back to DTO
            var licensatDto = mapper.Map<LicensatDto>(licensatDomain);

            return CreatedAtAction(nameof(GetById), new { id = licensatDto.Id }, licensatDto);
        }

        [HttpPut("update-licensa-by-id/{id}")]
        //[Route("{id:guid}")]

        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateLicensatRequestDto updateLicensat)
        {
            // Check if the institution exists by name
            var institucion = await institucioniRepository.GetByNameAsync(updateLicensat.EmriInstitucionit);

            // If the institution doesn't exist, create it
            if (institucion == null)
            {
                institucion = new Institucioni
                {
                    Id = Guid.NewGuid(),
                    Emri = updateLicensat.EmriInstitucionit
                };

                institucion = await institucioniRepository.CreateAsync(institucion);
            }

            // Fetch the existing Licensat
            var licensatDomain = await licensatRepository.GetByIdAsync(id);
            if (licensatDomain == null)
            {
                return NotFound();
            }

            // Update the Licensat domain model with new data
            licensatDomain = mapper.Map(updateLicensat, licensatDomain);
            licensatDomain.InstitucioniId = institucion.Id;

            // Update Licensat in the database
            licensatDomain = await licensatRepository.UpdateAsync(id, licensatDomain);

            return Ok(mapper.Map<LicensatDto>(licensatDomain));
        }

        [HttpDelete("delete-licensa-by-id/{id}")]
        //[Route("{id:guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var licensatDomainModel = await licensatRepository.DeleteAsync(id);

            if (licensatDomainModel == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<Licensat>(licensatDomainModel));
        }
    }
}
