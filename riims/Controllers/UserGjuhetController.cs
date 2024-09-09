using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using riims.Data;
using riims.Models.Domain;
using riims.Models.DTO.AftesiteDto;
using riims.Models.DTO.EdukimiDto;
using riims.Models.DTO.GjuhetDto;
using riims.Models.DTO.UserGjuhetDto;
using riims.Repositories;
using System.Security.Claims;

namespace riims.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserGjuhetController : ControllerBase
    {
        private readonly IUserGjuhetRepository userGjuhetRepository;
        private readonly IGjuhetRepostory gjuhetRepostory;
        private readonly INiveliGjuhesorRepository niveliGjuhesorRepository;
        private readonly IMapper mapper;

        public UserGjuhetController(IUserGjuhetRepository userGjuhetRepository,IGjuhetRepostory gjuhetRepostory,
            INiveliGjuhesorRepository niveliGjuhesorRepository,IMapper mapper)
        {
            this.gjuhetRepostory = gjuhetRepostory;
            this.niveliGjuhesorRepository = niveliGjuhesorRepository;
            this.userGjuhetRepository = userGjuhetRepository;
            this.mapper = mapper;
        }

        //GET ALL GJUHET
        [HttpGet("get-userGjuhet-by-person-id")]
        public async Task<IActionResult> GetAll()
        {
            // Extract user ID from the token
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User ID not found in the token.");
            }

            //Getting the data from database - domain models
            var gjuhetDomain = await userGjuhetRepository.GetAllAsync(userId);

            //Mapping domain models to DTOs
            //Returning DTOs
            return Ok(mapper.Map<List<UserGjuhetDTO>>(gjuhetDomain));
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

            // Returning DTO back to the client
            return Ok(mapper.Map<UserGjuhetDTO>(userGjuhetDomain));
        }


        //CREATE USER-GJUHET
        [HttpPost("add-userGjuhet")]
        public async Task<IActionResult> Create([FromBody] AddUserGjuhetRequestDTO addUserGjuhet)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized(); // Or handle as appropriate
            }
            // Find Gjuha
            var gjuha = await gjuhetRepostory.GetByNameAsync(addUserGjuhet.EmriGjuhes);

            // Check if the niveli gjyhesor exists by name
            var niveliGjuhesor = await niveliGjuhesorRepository.GetByNameAsync(addUserGjuhet.NiveliGjuhesor);

            // If the Emri Gjuhes doesn't exist, create it
            if (gjuha == null)
            {
                gjuha = new Gjuhet
                {
                    Id = Guid.NewGuid(),
                    EmriGjuhes = addUserGjuhet.EmriGjuhes
                };

                gjuha = await gjuhetRepostory.CreateAsync(gjuha);
            }
            // If the niveliGjuhesor doesn't exist, create it
            if (niveliGjuhesor == null)
            {
                niveliGjuhesor = new NiveliGjuhesor
                {
                    Id = Guid.NewGuid(),
                    Niveli = addUserGjuhet.NiveliGjuhesor
                };

                niveliGjuhesor = await niveliGjuhesorRepository.CreateAsync(niveliGjuhesor);
            }
            var userGjuhetDomain = mapper.Map<UserGjuhet>(addUserGjuhet);
            userGjuhetDomain.UserId = userId;
            userGjuhetDomain.GjuhaId = gjuha.Id;
            userGjuhetDomain.NiveliGjuhesorId = niveliGjuhesor.Id;

            // Use the domain model to create a Edukim
            userGjuhetDomain = await userGjuhetRepository.CreateAsync(userId, userGjuhetDomain);

            // Map the domain model back to DTO
            var userGjuhetDto = mapper.Map<UserGjuhetDTO>(userGjuhetDomain);

            return CreatedAtAction(nameof(GetById), new { id = userGjuhetDto.Id }, userGjuhetDto);
        }

        //UPDATE USERGJUHET
        [HttpPut("update-userGjuhet-by-id/{id}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateUserGjuhetRequestDTO updateUserGjuhet)
        {
            // Fetch the existing user-gjuha entry
            var existingUserGjuhet = await userGjuhetRepository.GetByIdAsync(id);
            if (existingUserGjuhet == null)
            {
                return NotFound();
            }
            // Find Gjuha
            var gjuha = await gjuhetRepostory.GetByNameAsync(updateUserGjuhet.EmriGjuhes);

            // Check if the niveli gjyhesor exists by name
            var niveliGjuhesor = await niveliGjuhesorRepository.GetByNameAsync(updateUserGjuhet.NiveliGjuhesor);

            // If the Emri Gjuhes doesn't exist, create it
            if (gjuha == null)
            {
                gjuha = new Gjuhet
                {
                    Id = Guid.NewGuid(),
                    EmriGjuhes = updateUserGjuhet.EmriGjuhes
                };

                gjuha = await gjuhetRepostory.CreateAsync(gjuha);
            }
            // If the niveliGjuhesor doesn't exist, create it
            if (niveliGjuhesor == null)
            {
                niveliGjuhesor = new NiveliGjuhesor
                {
                    Id = Guid.NewGuid(),
                    Niveli = updateUserGjuhet.NiveliGjuhesor
                };

                niveliGjuhesor = await niveliGjuhesorRepository.CreateAsync(niveliGjuhesor);
            }
            // Fetch the existing User-Gjuhe
            var userGjuhetDomain = await userGjuhetRepository.GetByIdAsync(id);
            if (userGjuhetDomain == null)
            {
                return NotFound();
            }

            // Update the User-Gjuha domain model with new data
            userGjuhetDomain = mapper.Map(updateUserGjuhet, userGjuhetDomain);
            userGjuhetDomain.GjuhaId = gjuha.Id;
            userGjuhetDomain.NiveliGjuhesorId = niveliGjuhesor.Id;

            // Update User-Gjuha in the database
            userGjuhetDomain = await userGjuhetRepository.UpdateAsync(id, userGjuhetDomain);

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
