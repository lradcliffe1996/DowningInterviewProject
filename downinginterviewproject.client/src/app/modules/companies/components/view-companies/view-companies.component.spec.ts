import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ViewCompaniesComponent } from './view-companies.component';
import { CompanyApiService } from '../../services/company-api-service/company-api.service';
import { Company } from '../../models/company';

describe('ViewCompaniesComponent', () => {
  let component: ViewCompaniesComponent;
  let fixture: ComponentFixture<ViewCompaniesComponent>;
  let mockCompanyApiService = jasmine.createSpyObj('CompanyApiService', ['getCompanies']);

  const mockData: Company[] = [
    {
      id: 1,
      companyName: 'Apple',
      code: 'APPL',
      createdDate: new Date('01-01-2024'),
      sharePrice: undefined
    },
    {
      id: 2,
      companyName: 'Coconut',
      code: 'COCO',
      createdDate: new Date('01-01-2024'),
      sharePrice: 15.2
    },
    {
      id: 3,
      companyName: 'Banana',
      code: 'BANA',
      createdDate: new Date('01-01-2024'),
      sharePrice: 8.743
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewCompaniesComponent],
      providers: [
        { provide: CompanyApiService, useValue: mockCompanyApiService }
      ],
      imports: [RouterTestingModule]
    }).compileComponents();

    mockCompanyApiService.getCompanies.and.returnValue(of(mockData));
    fixture = TestBed.createComponent(ViewCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sort company data alphabetically by company name', () => {
    const companyNames = component.companies.map((c) => { return c.companyName ?? '' });
    expect(companyNames).toEqual(['Apple', 'Banana', 'Coconut']);
  });

  it('should display format table cells correctly', () => {
    const tableRow = fixture.nativeElement.querySelector('tbody').querySelectorAll('tr')[0];

    expect(tableRow.cells[0].innerHTML).toEqual('Apple');
    expect(tableRow.cells[1].innerHTML).toEqual('APPL');
    expect(tableRow.cells[2].innerHTML).toEqual('N/A');
    expect(tableRow.cells[3].innerHTML).toEqual('01-Jan-2024');
  });
});
