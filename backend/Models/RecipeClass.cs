using System;
using System.Collections.Generic;

namespace CathysCookbookAPI.Models;

public partial class RecipeClass
{
    public int RecipeClassId { get; set; }

    public string RecipeClassName { get; set; } = null!;
}
