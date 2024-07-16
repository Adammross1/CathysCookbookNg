using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CathysCookbookAPI.Models;

public partial class RecipeDetail
{
    [Key]
    public int RecipeId { get; set; }

    public int RecipeSeqNo { get; set; }

    public string IngredientId { get; set; }

    public string IngredientClassId { get; set; }

    public string MeasurementId { get; set; }

    public double Amount { get; set; }
}
