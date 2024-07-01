using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using CathysCookbookAPI.Models;

namespace CathysCookbookAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipeDetailsController : ControllerBase
    {
        private readonly ICookbookRepository _cookbookRepository;

        public RecipeDetailsController(ICookbookRepository cookbookRepository)
        {
            _cookbookRepository = cookbookRepository;
        }

        [HttpGet]
        public IEnumerable<RecipeDetail> GetAll()
        {
            return _cookbookRepository.RecipeDetails;
        }

        [HttpGet("{recipeId}")]
        public ActionResult<IEnumerable<RecipeDetail>> GetByRecipeId(int recipeId)
        {
            var recipeDetails = _cookbookRepository.RecipeDetails.Where(rd => rd.RecipeId == recipeId).ToList();
            if (!recipeDetails.Any())
            {
                return NotFound();
            }
            return recipeDetails;
        }

        [HttpPost]
        public ActionResult<RecipeDetail> Post(RecipeDetail recipeDetail)
        {
            _cookbookRepository.AddRecipeDetail(recipeDetail);
            return CreatedAtAction(nameof(GetByRecipeId), new { recipeId = recipeDetail.RecipeId }, recipeDetail);
        }
    }
}
