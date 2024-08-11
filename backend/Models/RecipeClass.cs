using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CathysCookbookAPI.Models;

public partial class RecipeClass
{
    [Key]
    public int RecipeClassId { get; set; }

    public string RecipeClassName { get; set; } = null!;
}
