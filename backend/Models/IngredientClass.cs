using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CathysCookbookAPI.Models;

public partial class IngredientClass
{
    [Key]
    public int IngredientClassId { get; set; }

    public string IngredientClassName { get; set; } = null!;
}
