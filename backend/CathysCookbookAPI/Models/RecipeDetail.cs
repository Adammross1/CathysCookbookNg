using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CathysCookbookAPI.Models;

public partial class RecipeDetail
{
    [Key]
    public int RecipeId { get; set; }

    public int RecipeSeqNo { get; set; }

    public int IngredientId { get; set; }

    public int IngredientClassId { get; set; }

    public int MeasurementId { get; set; }

    public double Amount { get; set; }
}
