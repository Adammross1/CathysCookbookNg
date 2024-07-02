using System;
using System.Collections.Generic;

namespace CathysCookbookAPI.Models;

public partial class Recipe
{
    public int RecipeId { get; set; }

    public string RecipeTitle { get; set; } = null!;

    public string Instructions { get; set; } = null!;

    public required string RecipeClassName { get; set; }
}
