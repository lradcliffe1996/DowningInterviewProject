using DowningInterviewProject.Server.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using System.Data.SqlTypes;

namespace DowningInterviewProject.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CompaniesController : ControllerBase
    {
        private readonly ILogger<CompaniesController> _logger;
        private readonly IConfiguration _configuration;

        public CompaniesController(ILogger<CompaniesController> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Company>> Get() 
        {
            List<Company> companies = new List<Company>();
            string query = @"SELECT * FROM Companies";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("AppConn");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            foreach (DataRow row in table.Rows)
            {
                companies.Add(
                    new Company
                    {
                        Id = (int)row["Id"],
                        CompanyName = (string)row["CompanyName"],
                        CreatedDate = (DateTime)row["CreatedDate"],
                        Code = (string)row["Code"],
                        SharePrice = (row["SharePrice"] == DBNull.Value ? null : (decimal)row["SharePrice"])
                    }
                );
            }

            return Ok(companies);
        }

        [Route("{code}")]
        [HttpGet]
        public ActionResult<Company> GetByCode([FromRoute] string code)
        {
            Company company = new Company();

            string query = "SELECT TOP 1 * FROM Companies WHERE Code = @Code";
            using (SqlConnection conn = new SqlConnection(_configuration.GetConnectionString("AppConn")))
            {
                conn.Open();

                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@Code", code);
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            company = new Company
                            {
                                Id = (int)reader["Id"],
                                CompanyName = (string)reader["CompanyName"],
                                CreatedDate = (DateTime)reader["CreatedDate"],
                                Code = (string)reader["Code"],
                                SharePrice = (decimal)reader["SharePrice"]
                            };
                        }
                    }
                }

                conn.Close();
            }

            return Ok(company);
        }

        [HttpPost]
        public ActionResult AddCompany(Company company) 
        {
            try
            {
                string query =
                "INSERT INTO Companies(CompanyName, Code, SharePrice, CreatedDate) " +
                "VALUES(@CompanyName, @Code, @SharePrice, @CreatedDate)";

                using (SqlConnection conn = new SqlConnection(_configuration.GetConnectionString("AppConn")))
                {
                    conn.Open();

                    using (SqlCommand cmd = new SqlCommand(query, conn))
                    {
                        // Assuming form always sends valid company name and code fields
                        cmd.Parameters.AddWithValue("@CompanyName", company.CompanyName);
                        cmd.Parameters.AddWithValue("@Code", company.Code);
                        cmd.Parameters.AddWithValue("@SharePrice", company.SharePrice.HasValue ? company.SharePrice : DBNull.Value);
                        cmd.Parameters.AddWithValue("@CreatedDate", new SqlDateTime(DateTime.Now));

                        int result = cmd.ExecuteNonQuery();
                    }

                    conn.Close();
                }

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
