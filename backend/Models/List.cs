using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CathysCookbookAPI.Models;

public partial class List
{
    [Key]
    public int ListId { get; set; }

    public int ListName { get; set; }

    public int RecipeId { get; set; }
}
