using System;
using System.Collections.Generic;

namespace CathysCookbookAPI.Models;

public partial class RecipeDetail
{
    public int RecipeId { get; set; }

    public int RecipeSeqNo { get; set; }

    public string IngredientId { get; set; } = null!;

    public string IngredientClassId { get; set; } = null!;

    public string MeasurementId { get; set; } = null!;

    public double Amount { get; set; }
}
