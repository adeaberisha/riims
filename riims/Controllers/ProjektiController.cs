using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using riims.Data;
using riims.Models.Domain;
using riims.Models.DTO.ProjektiDto;
using riims.Models.DTO.PunaVullnetareDto;
using riims.Repositories;
using System.Security.Claims;

namespace riims.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjektiController : ControllerBase
    {
        private readonly IInstitucioniRepository institucioniRepository;
        private readonly IProjektiRepository projektiRepository;
        private readonly IMapper mapper;

        public ProjektiController(IInstitucioniRepository institucioniRepository, IProjektiRepository projektiRepository, IMapper mapper)
        {
            this.institucioniRepository = institucioniRepository;
            this.projektiRepository = projektiRepository;
            this.mapper = mapper;
        }
        //GET ALL PROJECTS
        [HttpGet("get-projekti-by-person-id")]
        public async Task<IActionResult> GetAll()
        {
            // Getting the data from database - domain models
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User ID not found in the token.");
            }
            var projektiDomain = await projektiRepository.GetAllAsync(userId);

            // Returning DTOs
            return Ok(mapper.Map<List<ProjektiDto>>(projektiDomain));
        }

        //GET projekti BY ID
        [HttpGet("get-projekti-by-id/{id}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            // Getting the projekti domain model from the database
            var projektiDomain = await projektiRepository.GetByIdAsync(id);

            if (projektiDomain == null)
            {
                return NotFound();
            }

            // Mapping the projekti domain model to ProjektiDto
            var projektiDto = mapper.Map<ProjektiDto>(projektiDomain);

            // Returning DTO back to the client
            return Ok(projektiDto);
        }

        //CREATE PROJEKTI
        [HttpPost("add-projekti")]
        public async Task<IActionResult> Create([FromBody] AddProjektiRequestDto addProjekti)
        {
            // Extract user ID from the token
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized(); // Or handle as appropriate
            }

            // Check if the institution exists by name
            var institucion = await institucioniRepository.GetByNameAsync(addProjekti.EmriInstitucionit);

            // If the institution doesn't exist, create it
            if (institucion == null)
            {
                institucion = new Institucioni
                {
                    Id = Guid.NewGuid(),
                    Emri = addProjekti.EmriInstitucionit
                };

                institucion = await institucioniRepository.CreateAsync(institucion);
            }

            // Convert DTO to domain model and set the InstitucioniId
            var projektiDomain = mapper.Map<Projekti>(addProjekti);
            projektiDomain.UserId = userId;
            projektiDomain.InstitucioniId = institucion.Id;

            // Use domain model to create specializimi
            projektiDomain = await projektiRepository.CreateAsync(userId, projektiDomain);

            // Map the domain model back to DTO
            var projektiDto = mapper.Map<ProjektiDto>(projektiDomain);

            return CreatedAtAction(nameof(GetById), new { id = projektiDto.Id }, projektiDto);
        }



        //Update Projekti
        [HttpPut("update-projekti-by-id/{id}")]
        //[Route("{id:guid}")]

        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateProjektiRequestDto updateProjekti)
        {
            // Check if the institution exists by name
            var institucion = await institucioniRepository.GetByNameAsync(updateProjekti.EmriInstitucionit);

            // If the institution doesn't exist, create it
            if (institucion == null)
            {
                institucion = new Institucioni
                {
                    Id = Guid.NewGuid(),
                    Emri = updateProjekti.EmriInstitucionit
                };

                institucion = await institucioniRepository.CreateAsync(institucion);
            }

            // Get the existing Projektet from the database
            var projektiDomain = await projektiRepository.GetByIdAsync(id);

            if (projektiDomain == null)
            {
                return NotFound();
            }

            // Update the PunaVullnetare domain model with new data
            projektiDomain = mapper.Map(updateProjekti, projektiDomain);
            projektiDomain.InstitucioniId = institucion.Id;

            // Update PunaVullnetare in the database
            projektiDomain = await projektiRepository.UpdateAsync(id, projektiDomain);

            return Ok(mapper.Map<ProjektiDto>(projektiDomain));
        }

        //Deelete Projekti

        [HttpDelete("delete-projekti-by-id/{id}")]
        //[Route("{id:guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var projektiDomain = await projektiRepository.DeleteAsync(id);

            if (projektiDomain == null)
            {
                return NotFound();
            }

            //Mapping the domain model to DTOs
            //Returning the deleted projekti back
            return Ok(mapper.Map<ProjektiDto>(projektiDomain));
        }
    }
}