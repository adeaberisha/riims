using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using riims.Data;
using riims.Models.Domain;
using riims.Models.DTO;
using riims.Models.DTO.AftesiteDto;
using riims.Repositories;

namespace riims.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AftesiteController : ControllerBase
    {
        private readonly RiimsDbContext dbContext;
        private readonly IAftesiteRepository aftesiteRepository;
        private readonly IMapper mapper;

        public AftesiteController(RiimsDbContext dbContext, IAftesiteRepository aftesiteRepository,
            IMapper mapper)
        {
            this.dbContext = dbContext;
            this.aftesiteRepository = aftesiteRepository;
            this.mapper = mapper;
        }

        //GET ALL AFTESITE
        [HttpGet("get-aftesite-by-person-id/{userId}")]
        //[Route("users/{userId:Guid}")]
        public async Task<IActionResult> GetAll([FromRoute] Guid userId)
        {
            //Getting the data from database - domain models
            var aftesiteDomain = await aftesiteRepository.GetAllAsync(userId);

            //Mapping domain models to DTOs
            //Returning DTOs
            return Ok(mapper.Map<List<AftesiteDTO>>(aftesiteDomain));

        }

        //GET AFTESIA BY ID
        [HttpGet("get-aftesia-by-id/{id}")]
        //[Route("{id:Guid}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            //Getting the aftesia domain model from the database
            var aftesiteDomain = await aftesiteRepository.GetByIdAsync(id);

            if (aftesiteDomain == null)
            {
                return NotFound();
            }

            //Mapping the aftesia domain model to AftesiaDTO
            //Returning DTO back to the client
            return Ok(mapper.Map<AftesiteDTO>(aftesiteDomain));
        }

        //CREATE AFTESIA
        [HttpPost("add-aftesia")]
        //[Route("{userId:Guid}")]
        public async Task<IActionResult> Create([FromRoute] Guid userId, [FromBody] AddAftesiteRequestDTO addAftesite)
        {
            //Converting DTO to domain model
            var aftesiteDomain = mapper.Map<Aftesite>(addAftesite);

            //Using domain model to create aftesia
            aftesiteDomain = await aftesiteRepository.CreateAsync(userId, aftesiteDomain);

            //Mapping the domain model back to DTO
            var aftesiteDTO = mapper.Map<AftesiteDTO>(aftesiteDomain);

            return CreatedAtAction(nameof(GetById), new { id = aftesiteDTO.Id }, aftesiteDTO);
        }


        //UPDATE AFTESIA
        [HttpPut("update-aftesia-by-id/{id}")]
        //[Route("{id:Guid}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateAftesiteRequestDTO updateAftesite)
        {
            //Mapping DTO to domain model 
            var aftesiteDomain = mapper.Map<Aftesite>(updateAftesite);

            aftesiteDomain = await aftesiteRepository.UpdateAsync(id, aftesiteDomain);

            if (aftesiteDomain == null)
            {
                return NotFound();
            }

            //Converting domain model back to DTOs
            //Returning the DTO
            return Ok(mapper.Map<AftesiteDTO>(aftesiteDomain));
        }


        //DELETE AFTESIA
        [HttpDelete("delete-aftesia-by-id/{id}")]
        //[Route("{id:Guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var aftesiteDomain = await aftesiteRepository.DeleteAsync(id);

            if (aftesiteDomain == null)
            {
                return NotFound();
            }

            //Mapping the domain model to DTOs
            //Returning the deleted aftesia back
            return Ok(mapper.Map<AftesiteDTO>(aftesiteDomain));
        }
    }
}

