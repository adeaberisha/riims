using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using riims.Data;
using riims.Models.Domain;
using riims.Models.DTO;
using riims.Models.DTO.InstitucioniDto;
using riims.Models.DTO.NiveliAkademikDto;
using riims.Repositories;


namespace riims.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NiveliAkademikController : ControllerBase
    {
        private readonly INiveliAkademikRepository _niveliAkademikRepository;
        private readonly IMapper _mapper;

        public NiveliAkademikController(INiveliAkademikRepository niveliAkademikRepository, IMapper mapper)
        {
            _niveliAkademikRepository = niveliAkademikRepository;
            _mapper = mapper;
        }

        // GET ALL NIVELI AKADEMIK
        [HttpGet("get-all-NiveletAkademike")]
        public async Task<IActionResult> GetAll()
        {
            var niveliAkademikDomain = await _niveliAkademikRepository.GetAllAsync();
            return Ok(_mapper.Map<List<NiveliAkademikDto>>(niveliAkademikDomain));
        }

        // GET NIVELI AKADEMIK BY ID
        [HttpGet("get-niveletAkademike-by-id/{id}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var niveliAkademikDomain = await _niveliAkademikRepository.GetByIdAsync(id);

            if (niveliAkademikDomain == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<NiveliAkademikDto>(niveliAkademikDomain));
        }

        // CREATE NIVELI AKADEMIK
        [HttpPost("add-nivelinAkademik")]
        public async Task<IActionResult> Create([FromBody] AddNiveliAkademikRequestDto addNiveliAkademik)
        {
            var niveliAkademikDomain = _mapper.Map<NiveliAkademik>(addNiveliAkademik);

            niveliAkademikDomain = await _niveliAkademikRepository.CreateAsync(niveliAkademikDomain);

            var niveliAkademikDTO = _mapper.Map<NiveliAkademikDto>(niveliAkademikDomain);

            return CreatedAtAction(nameof(GetById), new { id = niveliAkademikDTO.Id }, niveliAkademikDTO);
        }

        // UPDATE NIVELI AKADEMIK
        [HttpPut("update-niveliAkademik-by-id/{id}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateNiveliAkademikRequestDto updateNiveliAkademik)
        {
            var niveliAkademikDomain = _mapper.Map<NiveliAkademik>(updateNiveliAkademik);

            niveliAkademikDomain = await _niveliAkademikRepository.UpdateAsync(id, niveliAkademikDomain);

            if (niveliAkademikDomain == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<NiveliAkademikDto>(niveliAkademikDomain));
        }

        // DELETE NIVELI AKADEMIK
        [HttpDelete("delete-niveliAkademik-by-id/{id}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var niveliAkademikDomain = await _niveliAkademikRepository.DeleteAsync(id);

            if (niveliAkademikDomain == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<NiveliAkademikDto>(niveliAkademikDomain));
        }

        [HttpGet("get-niveliAkademik-by-name/{lvl}")]
        public async Task<IActionResult> GetByName([FromRoute] string lvl)
        {
            // Getting the institucioni domain model from the database by name
            var niveliAkademikDomain = await _niveliAkademikRepository.GetByNameAsync(lvl);

            if (niveliAkademikDomain == null)
            {
                return NotFound();
            }

            // Mapping the institucioni domain model to DTO
            // Returning DTO back to the client
            return Ok(_mapper.Map<NiveliAkademikDto>(niveliAkademikDomain));
        }
    }
}
