import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Company } from '../../models/company';

@Component({
  selector: 'app-view-companies',
  templateUrl: './view-companies.component.html',
  styleUrl: './view-companies.component.css'
})
export class ViewCompaniesComponent implements OnInit {
  public companies: Company[] = [];

  public constructor(private http: HttpClient) {

  }

  public ngOnInit(): void {
    this.getCompanies();
  }

  public getCompanies(): void {
    this.http.get<Company[]>('/companies').subscribe({
      next: (results) => {
        this.companies = results;
        console.log(this.companies);
      },
      error: (error) => { console.error(error); }
    })
  }
}
