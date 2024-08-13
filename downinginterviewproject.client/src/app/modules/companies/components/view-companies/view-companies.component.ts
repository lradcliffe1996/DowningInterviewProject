import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Company } from '../../models/company';
import { CompanyApiService } from '../../services/company-api-service/company-api.service';

@Component({
  selector: 'app-view-companies',
  templateUrl: './view-companies.component.html',
  styleUrl: './view-companies.component.css'
})
export class ViewCompaniesComponent implements OnInit {
  public companies: Company[] = [];
  public companyAddedAlert = false;

  public constructor(
    private companyApiService: CompanyApiService,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    //Look at query params to see if company has been added
    this.route.queryParamMap
      .subscribe((params: ParamMap) => {
          //this is the quickest way I know of to convert a string to a bool
          this.companyAddedAlert = JSON.parse(params.get('companyAdded') ?? 'false');
        }
      )

    this.getCompanies();
  }

  public getCompanies(): void {
    this.companyApiService.getCompanies().subscribe({
      next: (results) => {
        this.companies = results.sort((a, b) => (a.companyName ?? '').toLowerCase().localeCompare((b.companyName ?? '').toLowerCase()));
      },
      error: (error) => { console.error(error); }
    })
  }
}
