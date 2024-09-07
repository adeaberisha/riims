using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using riims.Data;
using riims.Models.Domain;
using riims.Models.DTO.AftesiteDto;
using riims.Models.DTO.UserGjuhetDto;
using riims.Repositories;

namespace riims.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserGjuhetController : ControllerBase
    {
        private readonly RiimsDbContext dbContext;
        private readonly IUserGjuhetRepository userGjuhetRepository;
        private readonly IMapper mapper;

        public UserGjuhetController(RiimsDbContext dbContext, IUserGjuhetRepository userGjuhetRepository,
            IMapper mapper)
        {
            this.dbContext = dbContext;
            this.userGjuhetRepository = userGjuhetRepository;
            this.mapper = mapper;
        }

        //GET ALL GJUHET
        [HttpGet("get-userGjuhet-by-person-id/{userId}")]
        public async Task<IActionResult> GetAll([FromRoute] string userId)
        {
            // Getting the data from the database - domain models
            var userGjuhetDomain = await userGjuhetRepository.GetAllAsync(userId);

            // Manually map domain models to DTOs
            var userGjuhetDTOs = userGjuhetDomain.Select(ug => new UserGjuhetDTO
            {
                Id = ug.Id,
                UserId = ug.UserId,
                GjuhaId = ug.GjuhaId,
                EmriGjuhes = ug.Gjuha.EmriGjuhes,  // Map the language name
                NiveliGjuhesorId = ug.NiveliGjuhesorId,
                NiveliGjuhesor = ug.NiveliGjuhesor.Niveli  // Map the language level
            }).ToList();

            // Returning DTOs
            return Ok(userGjuhetDTOs);
        }

        //GET USERGJUHET BY ID 
        [HttpGet("get-userGjuhet-by-id/{id}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            // Getting the userGjuhet domain model from the database
            var userGjuhetDomain = await userGjuhetRepository.GetByIdAsync(id);

            if (userGjuhetDomain == null)
            {
                return NotFound();
            }

            // Mapping the userGjuhet domain model to UserGjuhetDTO
            var userGjuhetDTO = mapper.Map<UserGjuhetDTO>(userGjuhetDomain);

            // Returning DTO back to the client
            return Ok(userGjuhetDTO);
        }


        //CREATE USER-GJUHET
        [HttpPost("add-userGjuhet/{userId}")]
        public async Task<IActionResult> Create([FromRoute] string userId, [FromBody] AddUserGjuhetRequestDTO addUserGjuhet)
        {
            // Check if the language (Gjuha) already exists by name (EmriGjuhes)
            var gjuha = await dbContext.Gjuhet.FirstOrDefaultAsync(g => g.EmriGjuhes == addUserGjuhet.EmriGjuhes);

            // If the language doesn't exist, create it
            if (gjuha == null)
            {
                gjuha = new Gjuhet
                {
                    Id = Guid.NewGuid(),
                    EmriGjuhes = addUserGjuhet.EmriGjuhes
                };

                // Add the language to the database
                await dbContext.Gjuhet.AddAsync(gjuha);
                await dbContext.SaveChangesAsync(); // Save the new language to the database
            }

            // Check if the language level (NiveliGjuhesor) already exists by name
            var niveliGjuhesor = await dbContext.NiveliGjuhesor.FirstOrDefaultAsync(n => n.Niveli == addUserGjuhet.NiveliGjuhesor);

            // If the level doesn't exist, create it
            if (niveliGjuhesor == null)
            {
                niveliGjuhesor = new NiveliGjuhesor
                {
                    Id = Guid.NewGuid(),
                    Niveli = addUserGjuhet.NiveliGjuhesor
                };

                // Add the level to the database
                await dbContext.NiveliGjuhesor.AddAsync(niveliGjuhesor);
                await dbContext.SaveChangesAsync(); // Save the new level to the database
            }

            // Converting DTO to domain model and manually setting foreign keys for Gjuha and NiveliGjuhesor
            var userGjuhetDomain = new UserGjuhet
            {
                UserId = userId,
                GjuhaId = gjuha.Id,
                NiveliGjuhesorId = niveliGjuhesor.Id
            };

            // Using domain model to create UserGjuhet
            userGjuhetDomain = await userGjuhetRepository.CreateAsync(userId, userGjuhetDomain);

            // Mapping the domain model back to DTO
            var userGjuhetDTO = mapper.Map<UserGjuhetDTO>(userGjuhetDomain);

            return CreatedAtAction(nameof(GetById), new { id = userGjuhetDTO.Id }, userGjuhetDTO);
        }

        //UPDATE USERGJUHET
        [HttpPut("update-userGjuhet-by-id/{id}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateUserGjuhetRequestDTO updateUserGjuhet)
        {
            // Check if the language (Gjuha) already exists by name
            var gjuha = await dbContext.Gjuhet.FirstOrDefaultAsync(g => g.EmriGjuhes == updateUserGjuhet.EmriGjuhes);

            // If the language doesn't exist, create it
            if (gjuha == null)
            {
                gjuha = new Gjuhet
                {
                    Id = Guid.NewGuid(),
                    EmriGjuhes = updateUserGjuhet.EmriGjuhes
                };

                // Add the language to the database
                await dbContext.Gjuhet.AddAsync(gjuha);
                await dbContext.SaveChangesAsync(); // Save the new language to the database
            }

            // Check if the language level (NiveliGjuhesor) already exists by name
            var niveliGjuhesor = await dbContext.NiveliGjuhesor.FirstOrDefaultAsync(n => n.Niveli == updateUserGjuhet.NiveliGjuhesor);

            // If the level doesn't exist, create it
            if (niveliGjuhesor == null)
            {
                niveliGjuhesor = new NiveliGjuhesor
                {
                    Id = Guid.NewGuid(),
                    Niveli = updateUserGjuhet.NiveliGjuhesor
                };

                // Add the level to the database
                await dbContext.NiveliGjuhesor.AddAsync(niveliGjuhesor);
                await dbContext.SaveChangesAsync(); // Save the new level to the database
            }

            // Fetch the existing UserGjuhet
            var userGjuhetDomain = await userGjuhetRepository.GetByIdAsync(id);
            if (userGjuhetDomain == null)
            {
                return NotFound();
            }

            // Update the UserGjuhet domain model with new data
            userGjuhetDomain.GjuhaId = gjuha.Id; // Update the language
            userGjuhetDomain.NiveliGjuhesorId = niveliGjuhesor.Id; // Update the language level

            // Update UserGjuhet in the database
            userGjuhetDomain = await userGjuhetRepository.UpdateAsync(id, userGjuhetDomain);

            // Convert back to DTO and return
            return Ok(mapper.Map<UserGjuhetDTO>(userGjuhetDomain));
        }

        //DELETE USER-GJUHET
        [HttpDelete("delete-userGjuhet-by-id/{id}")]
        //[Route("{id:Guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var userGjuhetDomain = await userGjuhetRepository.DeleteAsync(id);

            if (userGjuhetDomain == null)
            {
                return NotFound();
            }

            //Mapping the domain model to DTOs
            //Returning the deleted UserGjuhet back
            return Ok(mapper.Map<UserGjuhetDTO>(userGjuhetDomain));
        }
    }
}
