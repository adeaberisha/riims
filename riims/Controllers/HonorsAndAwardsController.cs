using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using riims.Data;
using riims.Models.Domain;
using riims.Models.DTO.HonorsAndAwards;
using riims.Repositories;

namespace riims.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HonorsAndAwardsController : ControllerBase
    {
        private readonly RiimsDbContext dbContext;
        private readonly IHonorsAndAwardsRepository honorsandawardsRepository;
        private readonly IMapper mapper;

        public HonorsAndAwardsController(RiimsDbContext dbContext, IHonorsAndAwardsRepository honorsandawardsRepository, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.honorsandawardsRepository = honorsandawardsRepository;
            this.mapper = mapper;
        }

        //GET ALL HONORS
        [HttpGet("get-honors-by-person-id/{userId}")]
        public async Task<IActionResult> GetAll([FromRoute] string userId)
        {
            // Getting the data from database - domain models
            var honorsandawardsDomain = await honorsandawardsRepository.GetAllAsync(userId);

            // Mapping domain models to DTOs
            var honorsandawardsDTOs = mapper.Map<List<HonorsAndAwardsDto>>(honorsandawardsDomain);

            // Returning DTOs
            return Ok(honorsandawardsDTOs);
        }

        ////GET honor BY ID
        [HttpGet("get-honor-by-id/{id}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            // Getting the projekti domain model from the database
            var honorsandawardsDomain = await honorsandawardsRepository.GetByIdAsync(id);

            if (honorsandawardsDomain == null)
            {
                return NotFound();
            }

            // Mapping the projekti domain model to ProjektiDto
            var honorsandawardsDto = mapper.Map<HonorsAndAwardsDto>(honorsandawardsDomain);

            // Returning DTO back to the client
            return Ok(honorsandawardsDto);
        }

        //Add honors
        [HttpPost("add-honor/{userId}")]
        public async Task<IActionResult> Create([FromRoute] string userId, [FromBody] AddHonorsAndAwardsRequestDto addHonorsAndAwardsRequestDto)
        { // Check if the institution already exists by name
            var institucion = await dbContext.Institucioni.FirstOrDefaultAsync(i => i.Emri == addHonorsAndAwardsRequestDto.EmriInstitucionit);

            // If the institution doesn't exist, create it
            if (institucion == null)
            {
                institucion = new Institucioni
                {
                    Id = Guid.NewGuid(), // Generate a new Guid for the institution
                    Emri = addHonorsAndAwardsRequestDto.EmriInstitucionit
                };

                // Add the institution to the database
                await dbContext.Institucioni.AddAsync(institucion);
                await dbContext.SaveChangesAsync(); // Save the new institution to the database
            }

            // Convert DTO to domain model and set the InstitucioniId
            var honorsandawardsDomain = mapper.Map<HonorsAndAwards>(addHonorsAndAwardsRequestDto);
            honorsandawardsDomain.InstitucioniId = institucion.Id;

            // Use domain model to create specializimi
            honorsandawardsDomain = await honorsandawardsRepository.CreateAsync(userId, honorsandawardsDomain);

            // Map the domain model back to DTO
            var honorsandawardsDto = mapper.Map<HonorsAndAwardsDto>(honorsandawardsDomain);

            return CreatedAtAction(nameof(GetById), new { id = honorsandawardsDto.Id }, honorsandawardsDto);
        }

        //UPDATE HONORS
        [HttpPut("update-honor-by-id/{id}")]
        //[Route("{id:guid}")]

        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateHonorsAndAwardsRequestDto updateHonorsAndAwardsRequestDto)
        {

            // Check if the institution already exists by name
            var institucion = await dbContext.Institucioni
                .FirstOrDefaultAsync(i => i.Emri == updateHonorsAndAwardsRequestDto.EmriInstitucionit);

            // If the institution doesn't exist, create it
            if (institucion == null)
            {
                institucion = new Institucioni
                {
                    Id = Guid.NewGuid(), // Generate a new Guid for the institution
                    Emri = updateHonorsAndAwardsRequestDto.EmriInstitucionit
                };

                // Add the institution to the database
                await dbContext.Institucioni.AddAsync(institucion);
                await dbContext.SaveChangesAsync(); // Save the new institution to the database
            }

            // Get the existing Honors from the database
            var existingHonorsAndAwards = await honorsandawardsRepository.GetByIdAsync(id);

            if (existingHonorsAndAwards == null)
            {
                return NotFound();
            }

            // Update the existing domain model with the new values
            existingHonorsAndAwards.titulli = updateHonorsAndAwardsRequestDto.titulli;
            existingHonorsAndAwards.issuer = updateHonorsAndAwardsRequestDto.issuer;
            existingHonorsAndAwards.dataEleshimit = updateHonorsAndAwardsRequestDto.dataEleshimit;
            existingHonorsAndAwards.pershkrimi = updateHonorsAndAwardsRequestDto.pershkrimi;
            existingHonorsAndAwards.InstitucioniId = institucion.Id;

            // Save the changes to the repository
            var updatedHonorsAndAwards = await honorsandawardsRepository.UpdateAsync(id, existingHonorsAndAwards);

            // Map the updated domain model back to DTO
            var honorsandawardsDto = mapper.Map<HonorsAndAwardsDto>(updatedHonorsAndAwards);

            return Ok(honorsandawardsDto);
        }

        //DELETE HONORS
        [HttpDelete("delete-honor-by-id/{id}")]
        //[Route("{id:guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var honorsandawardsDomain = await honorsandawardsRepository.DeleteAsync(id);

            if (honorsandawardsDomain == null)
            {
                return NotFound();
            }

            //Mapping the domain model to DTOs
            //Returning the deleted projekti back
            return Ok(mapper.Map<HonorsAndAwardsDto>(honorsandawardsDomain));
        }
    }
}
