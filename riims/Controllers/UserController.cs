using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using riims.Data;
using riims.Models.Domain;
using riims.Models.DTO.InstitucioniDto;
using riims.Models.DTO.UserDTO;
using riims.Repositories;

namespace riims.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly RiimsDbContext dbContext;
        private readonly IUserRepository userRepository;
        private readonly IMapper mapper;

        public UserController(RiimsDbContext dbContext, IUserRepository userRepository,
            IMapper mapper)
        {
            this.dbContext = dbContext;
            this.userRepository = userRepository;
            this.mapper = mapper;
        }

        //GET ALL USERS
        [HttpGet("get-all-persons")]
        public async Task<IActionResult> GetAll()
        {
            //Getting the data from database - domain models
            var userDomain = await userRepository.GetAllAsync();

            //Mapping domain models to DTOs
            //Returning DTOs
            return Ok(mapper.Map<List<UserDTO>>(userDomain));

        }

        //GET USER BY ID
        [HttpGet("get-person-by-id/{id}")]
        //[Route("{id:Guid}")]
        public async Task<IActionResult> GetById([FromRoute] string id)
        {
            //Getting the userat domain model from the database
            var userDomain = await userRepository.GetByIdAsync(id);

            if (userDomain == null)
            {
                return NotFound();
            }

            //Mapping the institucioni domain model to UserDTO
            //Returning DTO back to the client
            return Ok(mapper.Map<UserDTO>(userDomain));
        }

        //CREATE USER
        [HttpPost("add-person/{userId}")]
        public async Task<IActionResult> Create([FromRoute] string userId, [FromBody] AddUserRequestDTO addUserRequestDTO)
        {
            // Find or create the NiveliAkademik entity
            var niveliAkademik = await dbContext.NiveliAkademik
                .FirstOrDefaultAsync(n => n.lvl == addUserRequestDTO.NiveliAkademik);

            if (niveliAkademik == null)
            {
                niveliAkademik = new NiveliAkademik
                {
                    Id = Guid.NewGuid(),
                    lvl = addUserRequestDTO.NiveliAkademik
                };

                await dbContext.NiveliAkademik.AddAsync(niveliAkademik);
                await dbContext.SaveChangesAsync();
            }

            // Convert DTO to domain model
            var userDomain = mapper.Map<User>(addUserRequestDTO);
            userDomain.NiveliAkademik = niveliAkademik;

            // Set UserId from route parameter
            userDomain.Id = userId;

            // Create the user
            userDomain = await userRepository.CreateAsync(userDomain);

            // Map the domain model back to DTO
            var userDTO = mapper.Map<UserDTO>(userDomain);

            return CreatedAtAction(nameof(GetById), new { id = userDTO.Id }, userDTO);
        }

        //UPDATE USER
        [HttpPut("update-person-by-id/{id}")]
        public async Task<IActionResult> Update([FromRoute] string id, [FromBody] UpdateUserRequestDTO updateUserRequestDTO)
        {
            // Find or create the NiveliAkademik entity
            var niveliAkademik = await dbContext.NiveliAkademik
                .FirstOrDefaultAsync(n => n.lvl == updateUserRequestDTO.NiveliAkademik);

            if (niveliAkademik == null)
            {
                niveliAkademik = new NiveliAkademik
                {
                    Id = Guid.NewGuid(),
                    lvl = updateUserRequestDTO.NiveliAkademik
                };

                await dbContext.NiveliAkademik.AddAsync(niveliAkademik);
                await dbContext.SaveChangesAsync();
            }

            // Fetch the existing user
            var existingUser = await userRepository.GetByIdAsync(id);
            if (existingUser == null)
            {
                return NotFound();
            }

            // Update the user entity with new data
            existingUser = mapper.Map(updateUserRequestDTO, existingUser);
            existingUser.NiveliAkademik = niveliAkademik;

            // Update user in the database
            existingUser = await userRepository.UpdateAsync(id, existingUser);

            // Convert the domain model back to DTO
            var userDTO = mapper.Map<UserDTO>(existingUser);

            return Ok(userDTO);
        }


        //DELETE USER
        [HttpDelete("delete-person-by-id/{id}")]
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
