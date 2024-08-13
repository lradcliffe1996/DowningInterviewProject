import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { CompanyApiService } from './company-api.service';

describe('CompanyApiService', () => {
  let service: CompanyApiService;
  let mockHttpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: mockHttpClient }
      ]
    });
    service = TestBed.inject(CompanyApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
