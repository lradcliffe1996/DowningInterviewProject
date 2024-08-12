import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

import { CompanyApiService } from '../../services/company-api-service/company-api.service';

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
        (control: AbstractControl) => this.validateCode(control)
      ],
      sharePrice: ['', [
        Validators.pattern(/^\d(\.\d{0,5})?/)]
      ]
    });
    this.companyApiService = _companyApiService;
  }

  public onSubmit(): void {
    console.log(
      this.companyForm.value
    )
  }

  private validateCode(control: AbstractControl): ValidatorFn | undefined {
    //this.companyApiService.getCompanyByCode(control.value).subscribe({
    //  next: (result: any) => {
    //    if (result.code === control.value) {
    //      return { 'codeExists': true };
    //    }
    //    return { 'codeExists': false };
    //  },
    //  error: (error: any) => { console.error(error); }
    //});
    return undefined;
  }
}
