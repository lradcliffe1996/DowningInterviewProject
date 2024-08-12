﻿using DowningInterviewProject.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;

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
                        SharePrice = (decimal)row["SharePrice"]
                    }
                );
            }

            return companies;
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

            return company;
        }
    }
}
