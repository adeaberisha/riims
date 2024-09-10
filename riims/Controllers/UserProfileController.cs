using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using riims.Data;
using riims.Models.Domain;
using riims.Models.DTO.EdukimiDto;
using riims.Models.DTO.InstitucioniDto;
using riims.Models.DTO.UserDTO;
using riims.Repositories;
using System.Security.Claims;

namespace riims.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserRepository userRepository;
        private readonly INiveliAkademikRepository niveliAkademikRepository;
        private readonly IMapper mapper;

        public UserProfileController(IUserRepository userRepository,
            INiveliAkademikRepository niveliAkademikRepository,
            IMapper mapper)
        {
            this.userRepository = userRepository;
            this.niveliAkademikRepository = niveliAkademikRepository;
            this.mapper = mapper;
        }

        //GET ALL USERS
        [HttpGet("get-all-profiles")]
        public async Task<IActionResult> GetAll()
        {
            //Getting the data from database - domain models
            var userDomain = await userRepository.GetAllAsync();

            //Mapping domain models to DTOs
            //Returning DTOs
            return Ok(mapper.Map<List<UserDTO>>(userDomain));

        }

        //GET USER BY ID
        [HttpGet("get-profile-by-id")]
        //[Route("{id:Guid}")]
        public async Task<IActionResult> GetById()
        {
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User ID not found in the token.");
            }

            //Getting the userat domain model from the database
            var userDomain = await userRepository.GetByIdAsync(userId);

            if (userDomain == null)
            {
                return NotFound();
            }

            //Mapping the institucioni domain model to UserDTO
            //Returning DTO back to the client
            return Ok(mapper.Map<UserDTO>(userDomain));
        }

        //UPDATE USER
        [HttpPut("update-profile")]
        public async Task<IActionResult> Update([FromBody] UpdateUserRequestDTO updateUserRequestDTO)
        {
            //Extracting the user id from the token
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            // Find the NiveliAkademik
            var niveliAkademik = await niveliAkademikRepository.GetByNameAsync(updateUserRequestDTO.NiveliAkademik);
            if (niveliAkademik == null)
            {
                niveliAkademik = new NiveliAkademik
                {
                    Id = Guid.NewGuid(),
                    lvl = updateUserRequestDTO.NiveliAkademik
                };

                niveliAkademik = await niveliAkademikRepository.CreateAsync(niveliAkademik);
            }

            // Fetch the existing user
            var existingUser = await userRepository.GetByIdAsync(userId);
            if (existingUser == null)
            {
                return NotFound();
            }

            // Update the user entity with new data
            existingUser = mapper.Map(updateUserRequestDTO, existingUser);
            existingUser.NiveliAkademik = niveliAkademik;

            // Update user in the database
            existingUser = await userRepository.UpdateAsync(userId, existingUser);

            // Convert the domain model back to DTO
            var userDTO = mapper.Map<UserDTO>(existingUser);

            return Ok(userDTO);
        }


        //DELETE USER
        [HttpDelete("delete-user-by-id/{id}")]
        //[Route("{id:Guid}")]
        public async Task<IActionResult> Delete([FromRoute] string id)
        {
            var userDomain = await userRepository.DeleteAsync(id);

            if (userDomain == null)
            {
                return NotFound();
            }

            //Mapping the domain model to DTOs
            //Returning the deleted USER back
            return Ok(mapper.Map<UserDTO>(userDomain));
        }
    }
}
