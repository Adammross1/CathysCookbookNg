using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CathysCookbookAPI.Models;

public partial class Recipe
{
    [Key]
    public int RecipeId { get; set; }

    public string RecipeTitle { get; set; } = null!;

    public string Instructions { get; set; } = null!;

    public required string RecipeClassName { get; set; }
}
