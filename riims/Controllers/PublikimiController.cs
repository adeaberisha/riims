using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using riims.Data;
using riims.Models.Domain;
using riims.Models.DTO;
using riims.Models.DTO.Publikimi;
using riims.Repositories;
using System.Diagnostics.Contracts;
using System.Security.Claims;

namespace riims.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PublikimiController : ControllerBase
    {
        private readonly IPublikimiRepository publikimiRepository;
        private readonly IDepartamentiRepository departamentiRepository;
        private readonly IMapper mapper;

        public PublikimiController(IPublikimiRepository publikimiRepository,
            IDepartamentiRepository departamentiRepository,
            IMapper mapper)
        {
            this.publikimiRepository = publikimiRepository;
            this.departamentiRepository = departamentiRepository;
            this.mapper = mapper;
        }

        //GET ALL Publikimet
        [HttpGet("get-publikimi-by-person-id/{userId}")]
        //[Route("users/{userId:Guid}")]
        public async Task<IActionResult> GetAll([FromRoute] string userId)
        {
            // Getting the data from database - domain models
            var publikimetDomain = await publikimiRepository.GetAllAsync(userId);

            // Mapping domain models to DTOs
            var publikimiDtoList = mapper.Map<List<PublikimiDTO>>(publikimetDomain);

            // Returning DTOs
            return Ok(publikimiDtoList);
        }


        //GET Publikimi BY ID
        [HttpGet("get-publikimi-by-id/{id}")]
        //[Route("{id:Guid}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            //Getting the publikimi domain model from the database
            var publikimetDomain = await publikimiRepository.GetByIdAsync(id);

            if (publikimetDomain == null)
            {
                return NotFound();
            }

            //Mapping the Publikimi domain model to PublikimiDto
            //Returning DTO back to the client
            return Ok(mapper.Map<PublikimiDTO>(publikimetDomain));
        }

        //CREATE Publikimi
        [HttpPost("add-publikimi")]
        //[Route("{userId:Guid}")]
        public async Task<IActionResult> Create([FromBody] AddPublikimiRequestDTO addPublikimi)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized(); // Or handle as appropriate
            }

            // Find the department
            var departamenti = await departamentiRepository.GetByNameAsync(addPublikimi.EmriDepartamentit);

            // Convert the DTO to a domain model
            var publikimiDomain = mapper.Map<Publikimi>(addPublikimi);
            publikimiDomain.UserId = userId;
            publikimiDomain.DepartamentiId = departamenti.Id;

            // Use the domain model to create a Publikimi
            publikimiDomain = await publikimiRepository.CreateAsync(userId, publikimiDomain);

            // Map the domain model back to DTO
            var publikimiDto = mapper.Map<PublikimiDTO>(publikimiDomain);

            return CreatedAtAction(nameof(GetById), new { id = publikimiDto.Id }, publikimiDto);
        }


        //UPDATE Publikimi
        [HttpPut("update-publikimi-by-id/{id}")]
        //[Route("{id:Guid}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdatePublikimiRequestDTO updatePublikimi)
        {
            var departamenti = await departamentiRepository.GetByNameAsync(updatePublikimi.EmriDepartamentit);

            // Fetch the existing Publikimi
            var publikimiDomain = await publikimiRepository.GetByIdAsync(id);
            if (publikimiDomain == null)
            {
                return NotFound();
            }

            // Update the Publikimi domain model with new data
            publikimiDomain = mapper.Map(updatePublikimi, publikimiDomain);
            publikimiDomain.DepartamentiId = departamenti.Id;

            // Update Publikimi in the database
            publikimiDomain = await publikimiRepository.UpdateAsync(id, publikimiDomain);

            return Ok(mapper.Map<PublikimiDTO>(publikimiDomain));
        }


        //DELETE Publikimi
        [HttpDelete("delete-publikimi-by-id/{id}")]
        //[Route("{id:Guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var publikimetDomain = await publikimiRepository.DeleteAsync(id);

            if (publikimetDomain == null)
            {
                return NotFound();
            }

            //Mapping the domain model to DTOs
            //Returning the deleted publikimi back
            return Ok(mapper.Map<PublikimiDTO>(publikimetDomain));
        }
    }
}
