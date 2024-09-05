using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using riims.Data;
using riims.Models.Domain;
using riims.Models.DTO;
using riims.Models.DTO.EdukimiDto;
using riims.Repositories;

namespace riims.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EdukimiController : ControllerBase
    {
        private readonly IEdukimiRepository edukimiRepository;
        private readonly IMapper mapper;

        public EdukimiController(IEdukimiRepository edukimiRepository,
            IMapper mapper)
        {
            this.edukimiRepository = edukimiRepository;
            this.mapper = mapper;
        }

        //GET ALL EDUKIMET
        [HttpGet("get-edukimet-by-person-id/{userId}")]
        //[Route("users/{userId:Guid}")]
        public async Task<IActionResult> GetAll([FromRoute] Guid userId)
        {
            //Getting the data from database - domain models
            var edukimetDomain = await edukimiRepository.GetAllAsync(userId);

            //Mapping domain models to DTOs
            //Returning DTOs
            return Ok(mapper.Map<List<EdukimiDTO>>(edukimetDomain));

        }

        //GET EDUKIMI BY ID
        [HttpGet("get-edukimi-by-id/{id}")]
        //[Route("{id:Guid}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            //Getting the edukimi domain model from the database
            var edukimiDomain = await edukimiRepository.GetByIdAsync(id);

            if(edukimiDomain == null)
            {
                return NotFound();
            }

            //Mapping the edukimi domain model to EdukimiDTO
            //Returning DTO back to the client
            return Ok(mapper.Map<EdukimiDTO>(edukimiDomain));
        }

        //CREATE EDUKIMI
        [HttpPost("add-edukimi")]
        //[Route("{userId:Guid}")]
        public async Task<IActionResult> Create([FromRoute] Guid userId, [FromBody] AddEdukimiRequestDTO addEdukimi)
        {
            //Converting DTO to domain model
            var edukimiDomain = mapper.Map<Edukimi>(addEdukimi);
            
            //Using domain model to create edukimi
            edukimiDomain = await edukimiRepository.CreateAsync(userId, edukimiDomain);

            //Mapping the domain model back to DTO
            var edukimiDTO = mapper.Map<EdukimiDTO>(edukimiDomain);

            return CreatedAtAction(nameof(GetById), new { id = edukimiDTO.Id }, edukimiDTO);
        }


        //UPDATE EDUKIMI
        [HttpPut("update-edukimi-by-id/{id}")]
        //[Route("{id:Guid}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateEdukimiRequestDTO updateEdukimi)
        {
            //Mapping DTO to domain model 
            var edukimiDomain = mapper.Map<Edukimi>(updateEdukimi);
            
            edukimiDomain = await edukimiRepository.UpdateAsync(id, edukimiDomain);

            if (edukimiDomain == null)
            {
                return NotFound();
            }

            //Converting domain model back to DTOs
            //Returning the DTO
            return Ok(mapper.Map<EdukimiDTO>(edukimiDomain));
        }


        //DELETE EDUKIMI
        [HttpDelete("delete-edukimi-by-id/{id}")]
        //[Route("{id:Guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var edukimiDomain = await edukimiRepository.DeleteAsync(id);

            if(edukimiDomain == null)
            {
                return NotFound();
            }

            //Mapping the domain model to DTOs
            //Returning the deleted edukimi back
            return Ok(mapper.Map<EdukimiDTO>(edukimiDomain));
        }
    }
}
