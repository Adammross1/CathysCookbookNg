using CathysCookbookAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CathysCookbookAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FullRecipeController : ControllerBase
    {
        private readonly ICookbookRepository _cookbookRepository;

        public FullRecipeController(ICookbookRepository cookbookRepository)
        {
            _cookbookRepository = cookbookRepository;
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var recipe = _cookbookRepository.GetRecipeById(id);
            if (recipe == null)
            {
                return NotFound();
            }

            var recipeClass = _cookbookRepository.GetRecipeClassById(recipe.RecipeClassId);
            var recipeDetails = _cookbookRepository.GetRecipeDetailsByRecipeId(id);

            var dto = new FullRecipe
            {
                RecipeTitle = recipe.RecipeTitle,
                Instructions = recipe.Instructions,
                RecipeClassName = recipeClass?.RecipeClassName,
                RecipeDetails = recipeDetails.Select(rd => new RecipeDetailDTO
                {
                    IngredientName = _cookbookRepository.GetIngredientNameById(rd.IngredientId),
                    IngredientClassName = _cookbookRepository.GetIngredientClassNameById(rd.IngredientClassId),
                    MeasurementName = _cookbookRepository.GetMeasurementNameById(rd.MeasurementId),
                    Amount = rd.Amount
                }).ToList()
            };

            return Ok(dto);
        }
    }
}
