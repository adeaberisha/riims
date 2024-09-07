using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using riims.Data;
using riims.Models.Domain;
using riims.Models.DTO;
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
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var niveliGjuhesorDomain = await _niveliGjuhesorRepository.GetAllAsync();
            return Ok(_mapper.Map<List<NiveliGjuhesorDTO>>(niveliGjuhesorDomain));
        }

        // GET NIVELI GJUHESOR BY ID
        [HttpGet]
        [Route("{id:Guid}")]
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
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AddNiveliGjuhesorRequestDTO addNiveliGjuhesor)
        {
            var niveliGjuhesorDomain = _mapper.Map<NiveliGjuhesor>(addNiveliGjuhesor);

            niveliGjuhesorDomain = await _niveliGjuhesorRepository.CreateAsync(niveliGjuhesorDomain);

            var niveliGjuhesorDTO = _mapper.Map<NiveliGjuhesorDTO>(niveliGjuhesorDomain);

            return CreatedAtAction(nameof(GetById), new { id = niveliGjuhesorDTO.Id }, niveliGjuhesorDTO);
        }

        // UPDATE NIVELI GJUHESOR
        [HttpPut]
        [Route("{id:Guid}")]
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
        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var niveliGjuhesorDomain = await _niveliGjuhesorRepository.DeleteAsync(id);

            if (niveliGjuhesorDomain == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<NiveliGjuhesorDTO>(niveliGjuhesorDomain));
        }
    }
}