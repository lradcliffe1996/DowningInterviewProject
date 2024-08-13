import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

import { Company } from '../../models/company';
import { CompanyApiService } from '../../services/company-api-service/company-api.service';

@Component({
  selector: 'app-view-companies',
  templateUrl: './view-companies.component.html',
  styleUrl: './view-companies.component.css'
})
export class ViewCompaniesComponent implements OnInit, OnDestroy {
  public companies: Company[] = [];
  public companyAddedAlert = false;
  private subscriptions: Subscription[] = [];

  public constructor(
    private companyApiService: CompanyApiService,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    //Look at query params to see if company has been added
    const routeSub = this.route.queryParamMap
      .subscribe((params: ParamMap) => {
        //this is the quickest way I know of to convert a string to a bool
        this.companyAddedAlert = JSON.parse(params.get('companyAdded') ?? 'false');
      }
    );

    this.subscriptions.push(routeSub);

    this.getCompanies();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  public getCompanies(): void {
    const companiesSub = this.companyApiService.getCompanies().subscribe({
      next: (results) => {
        this.companies = results.sort((a, b) => (a.companyName ?? '').toLowerCase().localeCompare((b.companyName ?? '').toLowerCase()));
      },
      error: (error) => { console.error(error); }
    });

    this.subscriptions.push(companiesSub);
  }
}
