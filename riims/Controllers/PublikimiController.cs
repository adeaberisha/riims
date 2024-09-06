using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using riims.Data;
using riims.Models.Domain;
using riims.Models.DTO;
using riims.Models.DTO.Publikimi;
using riims.Repositories;
using System.Diagnostics.Contracts;

namespace riims.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PublikimiController : ControllerBase
    {
        private readonly IPublikimiRepository publikimiRepository;
        private readonly IMapper mapper;

        public PublikimiController(IPublikimiRepository publikimiRepository,
            IMapper mapper)
        {
            this.publikimiRepository = publikimiRepository;
            this.mapper = mapper;
        }

        //GET ALL Publikimet
        [HttpGet("get-publikimi-by-person-id/{userId}")]
        //[Route("users/{userId:Guid}")]
        public async Task<IActionResult> GetAll([FromRoute] Guid userId)
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
        [HttpPost("add-publikimi/{userId}")]
        //[Route("{userId:Guid}")]
        public async Task<IActionResult> Create([FromRoute] Guid userId, [FromBody] AddPublikimiRequestDTO addPublikimiRequestDTO)
        {
            //Converting DTO to domain model
            var publikimetDomain = mapper.Map<Publikimi>(addPublikimiRequestDTO);

            //Using domain model to create edukimi
            publikimetDomain = await publikimiRepository.CreateAsync(userId, publikimetDomain);

            //Mapping the domain model back to DTO
            var publikimiDTO = mapper.Map<PublikimiDTO>(publikimetDomain);

            return CreatedAtAction(nameof(GetById), new { id = publikimiDTO.Id }, publikimiDTO);
        }


        //UPDATE Publikimi
        [HttpPut("update-publikimi-by-id/{id}")]
        //[Route("{id:Guid}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdatePublikimiRequestDTO updatePublikimiRequestDTO)
        {
            //Mapping DTO to domain model 
            var publikimetDomain = mapper.Map<Publikimi>(updatePublikimiRequestDTO);

            publikimetDomain = await publikimiRepository.UpdateAsync(id, publikimetDomain);

            if (publikimetDomain == null)
            {
                return NotFound();
            }

            //Converting domain model back to DTOs
            //Returning the DTO
            return Ok(mapper.Map<PublikimiDTO>(publikimetDomain));
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
