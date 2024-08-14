using System;
using System.Collections.Generic;

namespace DowningInterviewProject.Server.Models;

public partial class Company
{
    public int Id { get; set; }

    public string? CompanyName { get; set; }

    public DateTime? CreatedDate { get; set; }

    public string? Code { get; set; }

    public decimal? SharePrice { get; set; }

    public virtual ICollection<Investor> Investors { get; set; } = new List<Investor>();
}
