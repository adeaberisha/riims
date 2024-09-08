using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using riims.Data;
using riims.Models.Domain;
using riims.Models.DTO;
using riims.Models.DTO.PunaVullnetareDto;
using riims.Models.DTO.SpecializimiDto;
using riims.Repositories;
using System.Security.Claims;

namespace riims.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpecializimetController : ControllerBase
    {
        private readonly ISpecializimetRepository specializimetRepository;
        private readonly IInstitucioniRepository institucioniRepository;
        private readonly IMapper mapper;
      

        public SpecializimetController(IInstitucioniRepository institucioniRepository, ISpecializimetRepository specializimetRepository,
            IMapper mapper)
        {
            this.institucioniRepository = institucioniRepository;
            this.specializimetRepository = specializimetRepository;
            this.mapper = mapper;
        }

        //GET ALL SPECIALIZIMET
        [HttpGet("get-specializimet-by-person-id")]
        public async Task<IActionResult> GetAll()
        {
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User ID not found in the token.");
            }
            // Getting the data from database - domain models
            var specializimiDomain = await specializimetRepository.GetAllAsync(userId);

            // Returning DTOs
            return Ok(mapper.Map<List<SpecializimetDTO>>(specializimiDomain));
        }

        //GET SPECIALIZIMI BY ID
        [HttpGet("get-specializim-by-id/{id}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            // Getting the specializimi domain model from the database
            var specializimiDomain = await specializimetRepository.GetByIdAsync(id);

            if (specializimiDomain == null)
            {
                return NotFound();
            }

            // Returning DTO back to the client
            return Ok(mapper.Map<SpecializimetDTO>(specializimiDomain));
        }

        //CREATE Specializimi
        [HttpPost("add-specializim")]
        public async Task<IActionResult> Create([FromBody] AddSpecializimetRequestDTO addSpecializimi)
        {
            // Extract user ID from the token
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized(); // Or handle as appropriate
            }

            // Check if the institution exists by name
            var institucion = await institucioniRepository.GetByNameAsync(addSpecializimi.EmriInstitucionit);

            // If the institution doesn't exist, create it
            if (institucion == null)
            {
                institucion = new Institucioni
                {
                    Id = Guid.NewGuid(),
                    Emri = addSpecializimi.EmriInstitucionit
                };

                institucion = await institucioniRepository.CreateAsync(institucion);
            }

            // Convert DTO to domain model and set the InstitucioniId
            var specializimiDomain = mapper.Map<Specializimet>(addSpecializimi);
            specializimiDomain.UserId = userId;
            specializimiDomain.InstitucioniId = institucion.Id;

            // Use domain model to create specializimi
            specializimiDomain = await specializimetRepository.CreateAsync(userId, specializimiDomain);

            // Map the domain model back to DTO
            var specializimiDTO = mapper.Map<SpecializimetDTO>(specializimiDomain);

            return CreatedAtAction(nameof(GetById), new { id = specializimiDTO.Id }, specializimiDTO);
        }


        //UPDATE SPECIALIZIMI
        [HttpPut("update-specializim-by-id/{id}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateSpecializimetRequestDTO updateSpecializimi)
        {

            // Check if the institution exists by name
            var institucion = await institucioniRepository.GetByNameAsync(updateSpecializimi.EmriInstitucionit);

            // If the institution doesn't exist, create it
            if (institucion == null)
            {
                institucion = new Institucioni
                {
                    Id = Guid.NewGuid(),
                    Emri = updateSpecializimi.EmriInstitucionit
                };

                institucion = await institucioniRepository.CreateAsync(institucion);
            }

            // Get the existing Specializimet from the database
            var specializimiDomain = await specializimetRepository.GetByIdAsync(id);
            if (specializimiDomain == null)
            {
                return NotFound();
            }

            // Update the Specializimi domain model with new data
            specializimiDomain = mapper.Map(updateSpecializimi, specializimiDomain);
            specializimiDomain.InstitucioniId = institucion.Id;

            // Update Specializimi in the database
            specializimiDomain = await specializimetRepository.UpdateAsync(id, specializimiDomain);

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

