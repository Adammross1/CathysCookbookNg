using System;
using System.Collections.Generic;

namespace CathysCookbookAPI.Models;

public partial class MeasurementUnit
{
    public int MeasurementId { get; set; }

    public string MeasurementName { get; set; } = null!;
}
