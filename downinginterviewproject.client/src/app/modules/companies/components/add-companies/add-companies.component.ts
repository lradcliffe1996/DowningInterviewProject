import { Component } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

import { CompanyApiService } from '../../services/company-api-service/company-api.service';
import { debounceTime, map, Observable, of, switchMap, take } from 'rxjs';
import { Company } from '../../models/company';

@Component({
  selector: 'app-add-companies',
  templateUrl: './add-companies.component.html',
  styleUrl: './add-companies.component.css'
})
export class AddCompaniesComponent {
  public companyForm: FormGroup;

  public constructor(
    private fb: FormBuilder,
    private companyApiService: CompanyApiService
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
        [this.validateCode()]
      ],
      sharePrice: ['', [
        Validators.pattern(/^\d(\.\d{0,5})?/)]
      ]
    });
  }

  public onSubmit(): void {
    console.log(
      this.companyForm
    )
  }

  private validateCode(): AsyncValidatorFn {
    return (control: AbstractControl):
      Observable<{ [key: string]: any } | null> => {
      const controlValue = control.value;
      if (controlValue === null || controlValue.length === 0) {
        return of(null);
      } else {
        return control.valueChanges.pipe(
          // use debounce time to control rate of user input, take to use the first emitted by the observable 
          debounceTime(250),
          take(1),
          switchMap(_ =>
            this.companyApiService.getCompanyByCode(controlValue).pipe(
              map(
                result => result.code === controlValue ? { codeExists: true } : null 
              )
            )
          )
        );
      }
    }
  }
}
