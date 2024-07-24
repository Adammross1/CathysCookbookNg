using System;
using System.Collections.Generic;

namespace CathysCookbookAPI.Models;

public partial class IngredientClass
{
    public int IngredientClassId { get; set; }

    public string IngredientClassName { get; set; } = null!;
}
