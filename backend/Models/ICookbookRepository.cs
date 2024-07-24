namespace CathysCookbookAPI.Models
{
    public interface ICookbookRepository
    {
        IEnumerable<Ingredient> Ingredients { get; }
        IEnumerable<Recipe> Recipes { get; }
        void AddRecipe(Recipe recipe);
        IEnumerable<RecipeDetail> RecipeDetails { get; }
        void AddRecipeDetail(RecipeDetail recipeDetail);
        IEnumerable<RecipeClass> RecipeClasses { get; }
        IEnumerable<MeasurementUnit> Measurements { get; }


    }
}
