﻿using System;
using System.Collections.Generic;

namespace CathysCookbookAPI.Models;

public partial class Ingredient
{
    public int IngredientId { get; set; }

    public string IngredientName { get; set; } = null!;
}
