
namespace CathysCookbookAPI.Models
{
    public class EFCookbookRepository : ICookbookRepository
    {
        private CookbookContext _cookbookContext;
        public EFCookbookRepository(CookbookContext temp) 
        {
            _cookbookContext = temp;
        }

        public IEnumerable<Ingredient> Ingredients => _cookbookContext.Ingredients;
        public IEnumerable<Recipe> Recipes => _cookbookContext.Recipes;
        public IEnumerable<RecipeDetail> RecipeDetails => _cookbookContext.RecipeDetails;
        public IEnumerable<RecipeClass> RecipeClasses => _cookbookContext.RecipeClasses;
        public IEnumerable<MeasurementUnit> Measurements => _cookbookContext.MeasurementUnits;



        public void AddRecipeDetail(RecipeDetail recipeDetail)
        {
            _cookbookContext.RecipeDetails.Add(recipeDetail);
            _cookbookContext.SaveChanges();
        }
    }
}
