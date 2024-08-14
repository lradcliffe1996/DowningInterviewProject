import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Company } from '../../models/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyApiService {
  private apiUrl = '/api/companies/';
  private constructor(private httpClient: HttpClient) { }

  public getCompanies(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(this.apiUrl);
  }

  public getCompanyByCode(code: string): Observable<Company> {
    return this.httpClient.get<Company>(this.apiUrl + code);
  }

  public addCompany(company: Company): Observable<void> {
    return this.httpClient.post<void>(this.apiUrl, company);
  }
}
