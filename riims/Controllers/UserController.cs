using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
        private readonly IUserRepository userRepository;
        private readonly IMapper mapper;

        public UserController(IUserRepository userRepository,
            IMapper mapper)
        {
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
        public async Task<IActionResult> GetById([FromRoute] Guid id)
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
        [HttpPost("add-person")]
        public async Task<IActionResult> Create([FromBody] AddUserRequestDTO addUserRequestDTO)
        {
            //Converting DTO to domain model
            var userDomain = mapper.Map<User>(addUserRequestDTO);

            //Using domain model to create USER
            userDomain = await userRepository.CreateAsync(userDomain);

            //Mapping the domain model back to DTO
            var userDTO = mapper.Map<UserDTO>(userDomain);

            return CreatedAtAction(nameof(GetById), new { id = userDTO.Id }, userDTO);
        }

        //UPDATE USER
        [HttpPut("update-person-by-id/{id}")]
        //[Route("{id:Guid}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateUserRequestDTO updateUserRequestDTO)
        {
            //Mapping DTO to domain model 
            var userDomain = mapper.Map<User>(updateUserRequestDTO);

            userDomain = await userRepository.UpdateAsync(id, userDomain);

            if (userDomain == null)
            {
                return NotFound();
            }

            //Converting domain model back to DTOs
            //Returning the DTO
            return Ok(mapper.Map<UserDTO>(userDomain));
        }


        //DELETE USER
        [HttpDelete("delete-person-by-id/{id}")]
        //[Route("{id:Guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
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
