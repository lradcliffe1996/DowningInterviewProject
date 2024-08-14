using DowningInterviewProject.Server.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;

namespace DowningInterviewProject.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CompaniesController : ControllerBase
    {
        private readonly DowningInvestmentDatabaseContext context = new DowningInvestmentDatabaseContext();

        public CompaniesController() {}

        [HttpGet]
        public ActionResult<IEnumerable<Company>> Get() 
        {
            return Ok(context.Companies.ToList());
        }

        [Route("{code}")]
        [HttpGet]
        public ActionResult<Company> GetByCode([FromRoute] string code)
        {
            return Ok(context.Companies.Where(c => c.Code == code).FirstOrDefault());
        }

        [HttpPost]
        public ActionResult AddCompany(Company company) 
        {
            try
            {
                company.CreatedDate = DateTime.UtcNow;
                context.Companies.Add(company);
                context.SaveChanges();
                return Created();
            }
            catch (SqlException sql)
            {
                // Return 400 with SQL error message
                return BadRequest(sql.Message);
            }
        }
    }
}
