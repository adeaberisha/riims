using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using riims.Data;
using riims.Models.Domain;
using riims.Models.DTO.PublikimiDto;
using riims.Repositories;

namespace riims.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PublikimiController : ControllerBase
    {

        private readonly RiimsDbContext dbContext;
        private readonly IPublikimiRepository publikimiRepository;
        private readonly IMapper mapper;

        public PublikimiController(RiimsDbContext dbContext, IPublikimiRepository publikimiRepository, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.publikimiRepository=publikimiRepository;
            this.mapper=mapper;
        }

        [HttpGet("user/{userId:guid}")]
        public async Task<IActionResult> GetAll([FromRoute] Guid userId)
        {
            var publikimetDomain = await publikimiRepository.GetAllAsync(userId);
            return Ok(mapper.Map<List<PublikimiDto>>(publikimetDomain));
        }

        [HttpGet("id/{id:guid}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var publikimiDomain = await publikimiRepository.GetByIdAsync(id);

            if (publikimiDomain == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<PublikimiDto>(publikimiDomain));
        }

        [HttpPost("user/{userId:guid}")]
        public async Task<IActionResult> Create([FromRoute] Guid userId, [FromBody] AddPublikimiRequestDto addPublikimiRequestDto)
        {         
            var publikimiDomainModel = mapper.Map<Publikimi>(addPublikimiRequestDto);
            
            publikimiDomainModel = await publikimiRepository.CreateAsync(userId, publikimiDomainModel);
         
            var publikimiDto = mapper.Map<PublikimiDto>(publikimiDomainModel);
           
            return CreatedAtAction(nameof(GetById), new { id = publikimiDto.Id }, publikimiDto);
        }

        [HttpPut]
        [Route("{id:guid}")]

        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdatePublikimiRequestDto updatePublikimiRequestDto) 
        {

            var publikimiDomainModel = mapper.Map<Publikimi>(updatePublikimiRequestDto);

            //check nese publikimi ekziston
            publikimiDomainModel = await publikimiRepository.UpdateAsync(id, publikimiDomainModel);

            if (publikimiDomainModel == null) {
                return NotFound();
            }
 
            return Ok(mapper.Map<Publikimi>(publikimiDomainModel));
        }

        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var publikimiDomainModel = await publikimiRepository.DeleteAsync(id);

            if (publikimiDomainModel == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<Publikimi>(publikimiDomainModel));
        }
    }
}