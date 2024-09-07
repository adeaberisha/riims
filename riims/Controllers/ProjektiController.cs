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
        //GET ALL PROJECTS
        [HttpGet("get-projekti-by-person-id/{userId}")]
        public async Task<IActionResult> GetAll([FromRoute] string userId)
        {
            // Getting the data from database - domain models
            var projektiDomain = await projektiRepository.GetAllAsync(userId);

            // Mapping domain models to DTOs
            var projektiDTOs = mapper.Map<List<ProjektiDto>>(projektiDomain);

            // Returning DTOs
            return Ok(projektiDTOs);
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
        [HttpPost("add-projekti/{userId}")]
        public async Task<IActionResult> Create([FromRoute] string userId, [FromBody] AddProjektiRequestDto addProjektiRequestDto)
        {
            // Check if the institution already exists by name
            var institucion = await dbContext.Institucioni.FirstOrDefaultAsync(i => i.Emri == addProjektiRequestDto.EmriInstitucionit);

            // If the institution doesn't exist, create it
            if (institucion == null)
            {
                institucion = new Institucioni
                {
                    Id = Guid.NewGuid(), // Generate a new Guid for the institution
                    Emri = addProjektiRequestDto.EmriInstitucionit
                };

                // Add the institution to the database
                await dbContext.Institucioni.AddAsync(institucion);
                await dbContext.SaveChangesAsync(); // Save the new institution to the database
            }

            // Convert DTO to domain model and set the InstitucioniId
            var projektiDomain = mapper.Map<Projekti>(addProjektiRequestDto);
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

        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateProjektiRequestDto updateProjektiRequestDto)
        {

            // Check if the institution already exists by name
            var institucion = await dbContext.Institucioni
                .FirstOrDefaultAsync(i => i.Emri == updateProjektiRequestDto.EmriInstitucionit);

            // If the institution doesn't exist, create it
            if (institucion == null)
            {
                institucion = new Institucioni
                {
                    Id = Guid.NewGuid(), // Generate a new Guid for the institution
                    Emri = updateProjektiRequestDto.EmriInstitucionit
                };

                // Add the institution to the database
                await dbContext.Institucioni.AddAsync(institucion);
                await dbContext.SaveChangesAsync(); // Save the new institution to the database
            }

            // Get the existing Projektet from the database
            var existingProjekti = await projektiRepository.GetByIdAsync(id);

            if (existingProjekti == null)
            {
                return NotFound();
            }

            // Update the existing domain model with the new values
            existingProjekti.emriProjektit = updateProjektiRequestDto.emriProjektit;
            existingProjekti.startDate = updateProjektiRequestDto.startDate;
            existingProjekti.endDate = updateProjektiRequestDto.endDate;
            existingProjekti.collaborators = updateProjektiRequestDto.collaborators;
            existingProjekti.description = updateProjektiRequestDto.description;
            existingProjekti.asocohet = updateProjektiRequestDto.asocohet;
            existingProjekti.InstitucioniId = institucion.Id;

            // Save the changes to the repository
            var updatedProjekti = await projektiRepository.UpdateAsync(id, existingProjekti);

            // Map the updated domain model back to DTO
            var projektiDto = mapper.Map<ProjektiDto>(updatedProjekti);

            return Ok(projektiDto);
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