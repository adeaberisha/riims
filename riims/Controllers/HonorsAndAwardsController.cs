using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using riims.Data;
using riims.Models.Domain;
using riims.Models.DTO.HonorsAndAwards;
using riims.Repositories;
namespace riims.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HonorsAndAwardsController : ControllerBase
    {
        private readonly IHonorsAndAwardsRepository honorsandawardsRepository;
        private readonly IMapper mapper;

        public HonorsAndAwardsController(IHonorsAndAwardsRepository honorsandawardsRepository, IMapper mapper)
        {
            this.honorsandawardsRepository = honorsandawardsRepository;
            this.mapper = mapper;
        }

        [HttpGet("user/{userId:guid}")]
        public async Task<IActionResult> GetAll([FromRoute] Guid userId)
        {
            var honorsandawardsDomain = await honorsandawardsRepository.GetAllAsync(userId);
            return Ok(mapper.Map<List<HonorsAndAwardsDto>>(honorsandawardsDomain));
        }

        [HttpGet("id/{id:guid}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var honorsandawardsDomain = await honorsandawardsRepository.GetByIdAsync(id);

            if (honorsandawardsDomain == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<HonorsAndAwardsDto>(honorsandawardsDomain));
        }

        [HttpPost("user/{userId:guid}")]
        public async Task<IActionResult> Create([FromRoute] Guid userId, [FromBody] AddHonorsAndAwardsRequestDto addHonorsAndAwardsRequestDto)
        {
            var honorsandawardsDomainModel = mapper.Map<HonorsAndAwards>(addHonorsAndAwardsRequestDto);

            honorsandawardsDomainModel = await honorsandawardsRepository.CreateAsync(userId, honorsandawardsDomainModel);

            var honorsandawardsDto = mapper.Map<HonorsAndAwardsDto>(honorsandawardsDomainModel);

            return CreatedAtAction(nameof(GetById), new { id = honorsandawardsDto.Id }, honorsandawardsDto);
        }

        [HttpPut]
        [Route("{id:guid}")]

        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateHonorsAndAwardsRequestDto updateHonorsAndAwardsRequestDto)
        {

            var honorsandawardsDomainModel = mapper.Map<HonorsAndAwards>(updateHonorsAndAwardsRequestDto);

            //check nese HonorsAndAwards ekziston
            honorsandawardsDomainModel = await honorsandawardsRepository.UpdateAsync(id, honorsandawardsDomainModel);

            if (honorsandawardsDomainModel == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<HonorsAndAwards>(honorsandawardsDomainModel));
        }

        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var honorsandawardsDomainModel = await honorsandawardsRepository.DeleteAsync(id);

            if (honorsandawardsDomainModel == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<HonorsAndAwards>(honorsandawardsDomainModel));
        }
    }
}
