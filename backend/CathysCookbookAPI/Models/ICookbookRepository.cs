namespace CathysCookbookAPI.Models
{
    public interface ICookbookRepository
    {
        IEnumerable<Ingredient> Ingredients { get; }
        IEnumerable<Recipe> Recipes { get; }
        IEnumerable<RecipeDetail> RecipeDetails { get; }
        void AddRecipeDetail(RecipeDetail recipeDetail);
    }
}
