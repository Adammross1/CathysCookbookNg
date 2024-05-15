namespace CathysCookbookAPI.Models
{
    public interface ICookbookRepository
    {
        IEnumerable<Ingredient> Ingredients { get; }
    }
}
