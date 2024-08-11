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
    return this.httpClient.get<Company[]>('/companies');
  }
}
