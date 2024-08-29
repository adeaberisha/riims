using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using riims.Data;
using riims.Models.Domain;
using riims.Models.DTO.LicensatDto;
using riims.Repositories;

namespace riims.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LicensatController : ControllerBase
    {
        private readonly ILicensatRepository licensatRepository;
        private readonly IMapper mapper;

        public LicensatController(ILicensatRepository licensatRepository, IMapper mapper)
        {
            this.licensatRepository=licensatRepository;
            this.mapper=mapper;
        }

        [HttpGet("user/{userId:guid}")]
        public async Task<IActionResult> GetAll([FromRoute] Guid userId)
        {
            var licensatDomain = await licensatRepository.GetAllAsync(userId);
            return Ok(mapper.Map<List<LicensatDto>>(licensatDomain));
        }

        [HttpGet("id/{id:guid}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var licensatDomain = await licensatRepository.GetByIdAsync(id);

            if (licensatDomain == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<LicensatDto>(licensatDomain));
        }

        [HttpPost("user/{userId:guid}")]
        public async Task<IActionResult> Create([FromRoute] Guid userId, [FromBody] AddLicensatRequestDto addLicensatRequestDto)
        {
            var licensatDomainModel = mapper.Map<Licensat>(addLicensatRequestDto);

            licensatDomainModel = await licensatRepository.CreateAsync(userId, licensatDomainModel);

            var licensatDto = mapper.Map<LicensatDto>(licensatDomainModel);

            return CreatedAtAction(nameof(GetById), new { id = licensatDto.Id }, licensatDto);
        }

        [HttpPut]
        [Route("{id:guid}")]

        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateLicensatRequestDto updateLicensatRequestDto)
        {

            var licensatDomainModel = mapper.Map<Licensat>(updateLicensatRequestDto);

            //check nese licensa ekziston
            licensatDomainModel = await licensatRepository.UpdateAsync(id, licensatDomainModel);

            if (licensatDomainModel == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<Licensat>(licensatDomainModel));
        }

        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var licensatDomainModel = await licensatRepository.DeleteAsync(id);

            if (licensatDomainModel == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<Licensat>(licensatDomainModel));
        }
    }
}
