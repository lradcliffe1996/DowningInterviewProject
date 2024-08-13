import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompaniesComponent } from './add-companies.component';
import { CompanyApiService } from '../../services/company-api-service/company-api.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

describe('AddCompaniesComponent', () => {
  let component: AddCompaniesComponent;
  let fixture: ComponentFixture<AddCompaniesComponent>;
  let mockCompanyApiService: CompanyApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [AddCompaniesComponent],
      providers: [
        { provide: CompanyApiService, useValue: mockCompanyApiService },
        FormBuilder
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
