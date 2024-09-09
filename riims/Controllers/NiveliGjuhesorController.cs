using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using riims.Data;
using riims.Models.Domain;
using riims.Models.DTO;
using riims.Models.DTO.NiveliAkademikDto;
using riims.Models.DTO.NiveliGjuhesorDto;
using riims.Repositories;


namespace riims.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NiveliGjuhesorController : ControllerBase
    {
        private readonly INiveliGjuhesorRepository _niveliGjuhesorRepository;
        private readonly IMapper _mapper;

        public NiveliGjuhesorController(INiveliGjuhesorRepository niveliGjuhesorRepository, IMapper mapper)
        {
            _niveliGjuhesorRepository = niveliGjuhesorRepository;
            _mapper = mapper;
        }

        // GET ALL NIVELI GJUHESOR
        [HttpGet("get-all-NiveletGjuhesore")]
        public async Task<IActionResult> GetAll()
        {
            var niveliGjuhesorDomain = await _niveliGjuhesorRepository.GetAllAsync();
            return Ok(_mapper.Map<List<NiveliGjuhesorDTO>>(niveliGjuhesorDomain));
        }

        // GET NIVELI GJUHESOR BY ID
        [HttpGet("get-NiveletGjuhesore-by-id/{id}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var niveliGjuhesorDomain = await _niveliGjuhesorRepository.GetByIdAsync(id);

            if (niveliGjuhesorDomain == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<NiveliGjuhesorDTO>(niveliGjuhesorDomain));
        }

        // CREATE NIVELI GJUHESOR
        [HttpPost("add-NivelinGjuhesore")]
        public async Task<IActionResult> Create([FromBody] AddNiveliGjuhesorRequestDTO addNiveliGjuhesor)
        {
            var niveliGjuhesorDomain = _mapper.Map<NiveliGjuhesor>(addNiveliGjuhesor);

            niveliGjuhesorDomain = await _niveliGjuhesorRepository.CreateAsync(niveliGjuhesorDomain);

            var niveliGjuhesorDTO = _mapper.Map<NiveliGjuhesorDTO>(niveliGjuhesorDomain);

            return CreatedAtAction(nameof(GetById), new { id = niveliGjuhesorDTO.Id }, niveliGjuhesorDTO);
        }

        // UPDATE NIVELI GJUHESOR
        [HttpPut("update-NivelinGjuhesore-by-id/{id}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateNiveliGjuhesorRequestDto updateNiveliGjuhesor)
        {
            var niveliGjuhesorDomain = _mapper.Map<NiveliGjuhesor>(updateNiveliGjuhesor);

            niveliGjuhesorDomain = await _niveliGjuhesorRepository.UpdateAsync(id, niveliGjuhesorDomain);

            if (niveliGjuhesorDomain == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<NiveliGjuhesorDTO>(niveliGjuhesorDomain));
        }

        // DELETE NIVELI GJUHESOR
        [HttpDelete("delete-NivelinGjuhesore-by-id/{id}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var niveliGjuhesorDomain = await _niveliGjuhesorRepository.DeleteAsync(id);

            if (niveliGjuhesorDomain == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<NiveliGjuhesorDTO>(niveliGjuhesorDomain));
        }

        [HttpGet("get-niveliGjuhesor-by-name/{niveli}")]
        public async Task<IActionResult> GetByName([FromRoute] string niveli)
        {
            // Getting the institucioni domain model from the database by name
            var niveliGjuhesorDomain = await _niveliGjuhesorRepository.GetByNameAsync(niveli);

            if (niveliGjuhesorDomain == null)
            {
                return NotFound();
            }

            // Mapping the institucioni domain model to DTO
            // Returning DTO back to the client
            return Ok(_mapper.Map<NiveliGjuhesorDTO>(niveliGjuhesorDomain));
        }
    }
}