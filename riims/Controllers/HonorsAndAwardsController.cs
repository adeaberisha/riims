using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using riims.Data;
using riims.Models.Domain;
using riims.Models.DTO.HonorsAndAwards;
using riims.Models.DTO.PunaVullnetareDto;
using riims.Repositories;
using System.Security.Claims;

namespace riims.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HonorsAndAwardsController : ControllerBase
    {
        private readonly IInstitucioniRepository institucioniRepository;
        private readonly IHonorsAndAwardsRepository honorsandawardsRepository;
        private readonly IMapper mapper;

        public HonorsAndAwardsController(IInstitucioniRepository institucioniRepository, IHonorsAndAwardsRepository honorsandawardsRepository, IMapper mapper)
        {
            this.institucioniRepository = institucioniRepository;
            this.honorsandawardsRepository = honorsandawardsRepository;
            this.mapper = mapper;
        }

        //GET ALL HONORS
        [HttpGet("get-honors-by-person-id")]
        public async Task<IActionResult> GetAll()
        {
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User ID not found in the token.");
            }
            // Getting the data from database - domain models
            var honorsandawardsDomain = await honorsandawardsRepository.GetAllAsync(userId);

            // Returning DTOs
            return Ok(mapper.Map<List<HonorsAndAwardsDto>>(honorsandawardsDomain));
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
            // Returning DTO back to the client
            return Ok(mapper.Map<HonorsAndAwardsDto>(honorsandawardsDomain));
        }

        //Add honors
        [HttpPost("add-honor")]
        public async Task<IActionResult> Create([FromBody] AddHonorsAndAwardsRequestDto addHonorsAndAwards)
        {
            // Extract user ID from the token
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized(); // Or handle as appropriate
            }

            // Check if the institution exists by name
            var institucion = await institucioniRepository.GetByNameAsync(addHonorsAndAwards.EmriInstitucionit);

            // If the institution doesn't exist, create it
            if (institucion == null)
            {
                institucion = new Institucioni
                {
                    Id = Guid.NewGuid(),
                    Emri = addHonorsAndAwards.EmriInstitucionit
                };

                institucion = await institucioniRepository.CreateAsync(institucion);
            }

            // Convert DTO to domain model and set the InstitucioniId
            var honorsandawardsDomain = mapper.Map<HonorsAndAwards>(addHonorsAndAwards);
            honorsandawardsDomain.UserId = userId;
            honorsandawardsDomain.InstitucioniId = institucion.Id;

            // Use domain model to create specializimi
            honorsandawardsDomain = await honorsandawardsRepository.CreateAsync(userId, honorsandawardsDomain);

            // Map the domain model back to DTO
            var honorsandawardsDto = mapper.Map<HonorsAndAwardsDto>(honorsandawardsDomain);

            return CreatedAtAction(nameof(GetById), new { id = honorsandawardsDto.Id }, honorsandawardsDto);
        }

        //UPDATE HONORS
        [HttpPut("update-honor-by-id/{id}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateHonorsAndAwardsRequestDto updateHonorsAndAwards)
        {
            // Check if the institution exists by name
            var institucion = await institucioniRepository.GetByNameAsync(updateHonorsAndAwards.EmriInstitucionit);

            // If the institution doesn't exist, create it
            if (institucion == null)
            {
                institucion = new Institucioni
                {
                    Id = Guid.NewGuid(),
                    Emri = updateHonorsAndAwards.EmriInstitucionit
                };
                institucion = await institucioniRepository.CreateAsync(institucion);
            }
            var honorsAndAwardsDomain = await honorsandawardsRepository.GetByIdAsync(id);
            if (honorsAndAwardsDomain == null)
            {
                return NotFound();
            }

            // Update the PunaVullnetare domain model with new data
            honorsAndAwardsDomain = mapper.Map(updateHonorsAndAwards, honorsAndAwardsDomain);
            honorsAndAwardsDomain.InstitucioniId = institucion.Id;

            // Update PunaVullnetare in the database
            honorsAndAwardsDomain = await honorsandawardsRepository.UpdateAsync(id, honorsAndAwardsDomain);

            return Ok(mapper.Map<HonorsAndAwardsDto>(honorsAndAwardsDomain));
        }

        //DELETE HONORS
        [HttpDelete("delete-honor-by-id/{id}")]
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
