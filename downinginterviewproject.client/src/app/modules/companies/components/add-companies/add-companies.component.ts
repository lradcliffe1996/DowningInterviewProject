import { Component } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

import { CompanyApiService } from '../../services/company-api-service/company-api.service';
import { map, Observable, of } from 'rxjs';
import { Company } from '../../models/company';

@Component({
  selector: 'app-add-companies',
  templateUrl: './add-companies.component.html',
  styleUrl: './add-companies.component.css'
})
export class AddCompaniesComponent {
  public companyForm: FormGroup;
  private companyApiService: CompanyApiService;

  public constructor(
    private fb: FormBuilder,
    private _companyApiService: CompanyApiService
  ) {
    this.companyForm = this.fb.group({
      companyName: ['', [
        Validators.required,
        Validators.maxLength(100),
        Validators.pattern('(^[a-zA-Z0-9!@#$&()\\-`.+,/\" ]*)')]
      ],
      code: ['', [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern('(^[A-Z0-9]*)')],
        [(control: AbstractControl) => this.validateCode(control)]
      ],
      sharePrice: ['', [
        Validators.pattern(/^\d(\.\d{0,5})?/)]
      ]
    });
    this.companyApiService = _companyApiService;
  }

  public onSubmit(): void {
    console.log(
      this.companyForm
    )
  }

  private validateCodeTest(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.companyApiService
        .getCompanyByCode(control.value)
        .pipe(
          map((result: Company) =>
            result.code === control.value ? { codeExists: true } : null
          )
        );
    }
  }

  private validateCode(control: AbstractControl): void {
    this.companyApiService.getCompanyByCode(control.value).subscribe({
      next: (result: any) => {
        result.code === control.value ? control.setErrors({ codeExists: true }) : null;
      },
      error: (error: any) => { console.error(error); }
    });
  }
}
