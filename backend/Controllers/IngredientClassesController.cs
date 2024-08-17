using CathysCookbookAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CathysCookbookAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IngredientClassesController : ControllerBase
    {
        private readonly ICookbookRepository _cookbookRepository;

        public IngredientClassesController(ICookbookRepository cookbookRepository)
        {
            _cookbookRepository = cookbookRepository;
        }

        [HttpGet]
        public IEnumerable<IngredientClass> Get()
        {
            return _cookbookRepository.IngredientClasses;
        }
    }
}
