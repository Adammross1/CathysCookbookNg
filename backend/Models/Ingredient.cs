using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CathysCookbookAPI.Models;

public partial class Ingredient
{
    [Key]
    public int IngredientId { get; set; }

    public string IngredientName { get; set; } = null!;
}
