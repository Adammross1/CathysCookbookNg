using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CathysCookbookAPI.Models;

public partial class MeasurementUnit
{
    [Key]
    public int MeasurementId { get; set; }

    public string MeasurementName { get; set; } = null!;
}
