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

  it('should set error to code form control when given value which is too long and not in correct format', () => {
    const companyFormCode = component.companyForm.get('code');
    companyFormCode?.setValue('t.123456789');
    expect(companyFormCode?.getError('pattern')).toBeTruthy();
    expect(companyFormCode?.getError('maxlength')).toBeTruthy();
  });

  it('should set error to company name form control when given value which is too long and not in correct format', () => {
    const companyFormCompanyName = component.companyForm.get('companyName');
    companyFormCompanyName?.setValue('¬123456789abcdefghijklmnopqrstuvwxyz123456789abcdefghijklmnopqrstuvwxyz123456789abcdefghijklmnopqrstuvwxyz');
    expect(companyFormCompanyName?.getError('pattern')).toBeTruthy();
    expect(companyFormCompanyName?.getError('maxlength')).toBeTruthy();
  });

  it('should set error to share price if number has too many decimal points', () => {
    component.companyForm.get('sharePrice')?.setValue(4.9999999);
    expect(component.companyForm.get('sharePrice')?.getError('pattern')).toBeTruthy();
  });

  it('should set error to share price if non numerical chars are entered', () => {
    component.companyForm.get('sharePrice')?.setValue('test');
    expect(component.companyForm.get('sharePrice')?.getError('pattern')).toBeTruthy();
  });

  it('should set error to share price if negative number is entered', () => {
    component.companyForm.get('sharePrice')?.setValue(-10.4);
    expect(component.companyForm.get('sharePrice')?.getError('pattern')).toBeTruthy();
  });
});
