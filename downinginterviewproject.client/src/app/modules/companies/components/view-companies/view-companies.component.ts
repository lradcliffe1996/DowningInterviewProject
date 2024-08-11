import { Component, OnInit } from '@angular/core';

import { Company } from '../../models/company';
import { CompanyApiService } from '../../services/company-api-service/company-api.service';

@Component({
  selector: 'app-view-companies',
  templateUrl: './view-companies.component.html',
  styleUrl: './view-companies.component.css'
})
export class ViewCompaniesComponent implements OnInit {
  public companies: Company[] = [];
  private companyApiService: CompanyApiService;

  private constructor(
    private _companyApiService: CompanyApiService
  ) {
    this.companyApiService = _companyApiService;
  }

  public ngOnInit(): void {
    this.getCompanies();
  }

  public getCompanies(): void {
    this.companyApiService.getCompanies().subscribe({
      next: (results) => { this.companies = results; },
      error: (error) => { console.error(error); }
    })
  }
}
