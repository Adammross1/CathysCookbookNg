using CathysCookbookAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CathysCookbookAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MeasurementsController : ControllerBase
    {
        private readonly ICookbookRepository _cookbookRepository;

        public MeasurementsController(ICookbookRepository cookbookRepository)
        {
            _cookbookRepository = cookbookRepository;
        }

        [HttpGet]
        public IEnumerable<MeasurementUnit> Get()
        {
            return _cookbookRepository.Measurements;
        }
    }
}
