namespace CathysCookbookAPI.Models
{
    public interface ICookbookRepository
    {
        IEnumerable<Ingredient> Ingredients { get; }
        IEnumerable<Recipe> Recipes { get; }
        IEnumerable<RecipeDetail> RecipeDetails { get; }
        IEnumerable<RecipeClass> RecipeClasses { get; }
        IEnumerable<MeasurementUnit> Measurements { get; }


        void AddRecipeDetail(RecipeDetail recipeDetail);
    }
}
