import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Company } from '../../models/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyApiService {
  private constructor(private httpClient: HttpClient) { }

  public getCompanies(): Observable<Company[]> {
    return this.httpClient.get<Company[]>('/api/companies');
  }

  public getCompanyByCode(code: string): Observable<Company> {
    return this.httpClient.get<Company>('/api/companies/' + code);
  }

  public addCompany(company: Company): Observable<void> {
    return this.httpClient.post<void>('/api/companies', company);
  }
}
