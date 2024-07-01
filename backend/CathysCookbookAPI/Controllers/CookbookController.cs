using CathysCookbookAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CathysCookbookAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CookbookController : ControllerBase
    {
        private ICookbookRepository _cookbookRepository;

        public CookbookController(ICookbookRepository temp) 
        {
            _cookbookRepository = temp;
        }

        [HttpGet]
        public IEnumerable<Ingredient> Get() 
        {
            var ingredients = _cookbookRepository.Ingredients.ToArray();

            return ingredients;
        }
    }
}
