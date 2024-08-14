using System;
using System.Collections.Generic;

namespace DowningInterviewProject.Server.Models;

public partial class Investor
{
    public int Id { get; set; }

    public int CompanyId { get; set; }

    public string? Title { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public virtual Company Company { get; set; } = null!;
}
