using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using riims.Data;
using riims.Models.Domain;
using riims.Models.DTO;
using riims.Models.DTO.EdukimiDto;
using riims.Models.DTO.PunaVullnetareDto;
using riims.Repositories;
using System.Security.Claims;

namespace riims.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EdukimiController : ControllerBase
    {
        private readonly IEdukimiRepository edukimiRepository;
        private readonly IInstitucioniRepository institucioniRepository;
        private readonly INiveliAkademikRepository niveliAkademikRepository;
        private readonly IMapper mapper;

        public EdukimiController(IEdukimiRepository edukimiRepository,
            IInstitucioniRepository institucioniRepository,
            INiveliAkademikRepository niveliAkademikRepository,
            IMapper mapper)
        {
            this.edukimiRepository = edukimiRepository;
            this.institucioniRepository = institucioniRepository;
            this.niveliAkademikRepository = niveliAkademikRepository;
            this.mapper = mapper;
        }

        //GET ALL EDUKIMET
        [HttpGet("get-edukimet-by-person-id")]
        public async Task<IActionResult> GetAll()
        {
            // Extract user ID from the token
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User ID not found in the token.");
            }

            //Getting the data from database - domain models
            var edukimetDomain = await edukimiRepository.GetAllAsync(userId);

            //Mapping domain models to DTOs
            //Returning DTOs
            return Ok(mapper.Map<List<EdukimiDTO>>(edukimetDomain));

        }

        //GET EDUKIMI BY ID
        [HttpGet("get-edukimi-by-id/{id}")]
        //[Route("{id:Guid}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            //Getting the edukimi domain model from the database
            var edukimiDomain = await edukimiRepository.GetByIdAsync(id);

            if(edukimiDomain == null)
            {
                return NotFound();
            }

            //Mapping the edukimi domain model to EdukimiDTO
            //Returning DTO back to the client
            return Ok(mapper.Map<EdukimiDTO>(edukimiDomain));
        }

        //CREATE EDUKIMI
        [HttpPost("add-edukimi")]
        public async Task<IActionResult> Create([FromBody] AddEdukimiRequestDTO addEdukimiRequestDTO)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized(); // Or handle as appropriate
            }

            // Find NiveliAkademik
            var niveliAkademik = await niveliAkademikRepository.GetByNameAsync(addEdukimiRequestDTO.NiveliAkademik);

            // Check if the institution exists by name
            var institucion = await institucioniRepository.GetByNameAsync(addEdukimiRequestDTO.Institucioni);

            // If the institution doesn't exist, create it
            if (institucion == null)
            {
                institucion = new Institucioni
                {
                    Id = Guid.NewGuid(),
                    Emri = addEdukimiRequestDTO.Institucioni
                };

                institucion = await institucioniRepository.CreateAsync(institucion);
            }

            // Convert the DTO to a domain model
            var edukimiDomain = mapper.Map<Edukimi>(addEdukimiRequestDTO);
            edukimiDomain.UserId = userId;
            edukimiDomain.InstitucioniId = institucion.Id;
            edukimiDomain.NiveliAkademikId = niveliAkademik.Id;

            // Use the domain model to create a Edukim
            edukimiDomain = await edukimiRepository.CreateAsync(userId, edukimiDomain);

            // Map the domain model back to DTO
            var edukimiDto = mapper.Map<EdukimiDTO>(edukimiDomain);

            return CreatedAtAction(nameof(GetById), new { id = edukimiDto.Id }, edukimiDto);
        }


        //UPDATE EDUKIMI
        [HttpPut("update-edukimi-by-id/{id}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateEdukimiRequestDTO updateEdukimiRequestDTO)
        {
            // Finding NiveliAkademik
            var niveliAkademik = await niveliAkademikRepository.GetByNameAsync(updateEdukimiRequestDTO.NiveliAkademik);

            // Check if the institution exists by name
            var institucion = await institucioniRepository.GetByNameAsync(updateEdukimiRequestDTO.Institucioni);

            // If the institution doesn't exist, create it
            if (institucion == null)
            {
                institucion = new Institucioni
                {
                    Id = Guid.NewGuid(),
                    Emri = updateEdukimiRequestDTO.Institucioni
                };

                institucion = await institucioniRepository.CreateAsync(institucion);
            }

            // Fetch the existing Edukimi
            var edukimiDomain = await edukimiRepository.GetByIdAsync(id);
            if (edukimiDomain == null)
            {
                return NotFound();
            }

            // Update the PunaVullnetare domain model with new data
            edukimiDomain = mapper.Map(updateEdukimiRequestDTO, edukimiDomain);
            edukimiDomain.InstitucioniId = institucion.Id;
            edukimiDomain.NiveliAkademikId = niveliAkademik.Id;

            // Update PunaVullnetare in the database
            edukimiDomain = await edukimiRepository.UpdateAsync(id, edukimiDomain);

            return Ok(mapper.Map<EdukimiDTO>(edukimiDomain));
        }


        //DELETE EDUKIMI
        [HttpDelete("delete-edukimi-by-id/{id}")]
        //[Route("{id:Guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var edukimiDomain = await edukimiRepository.DeleteAsync(id);

            if(edukimiDomain == null)
            {
                return NotFound();
            }

            //Mapping the domain model to DTOs
            //Returning the deleted edukimi back
            return Ok(mapper.Map<EdukimiDTO>(edukimiDomain));
        }
    }
}
