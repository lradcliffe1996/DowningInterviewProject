import { Component, OnDestroy } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, map, Observable, Subscription, switchMap, take } from 'rxjs';
import { Router } from '@angular/router';

import { CompanyApiService } from '../../services/company-api-service/company-api.service';

@Component({
  selector: 'app-add-companies',
  templateUrl: './add-companies.component.html',
  styleUrl: './add-companies.component.css'
})
export class AddCompaniesComponent implements OnDestroy {
  public companyForm: FormGroup;
  public submitError = false;
  private subscriptions: Subscription[] = [];

  public constructor(
    private fb: FormBuilder,
    private companyApiService: CompanyApiService,
    private router: Router
  ) {
    this.companyForm = this.fb.group({
      companyName: [null, [
        Validators.required,
        Validators.maxLength(100),
        // Regex to allow letters (uper and lowercase), numbers and specified special chars
        Validators.pattern('(^[a-zA-Z0-9!@#$&()\\-`.+,/\" ]*)')]
      ],
      code: [null, [
        Validators.required,
        Validators.maxLength(10),
        // Regex to allow uppercase letters and numbers
        Validators.pattern('(^[A-Z0-9]*)')],
        [this.validateCode()]
      ],
      // Regex to allow for n numbers before decimal, and up to 5 numbers after decimal, positive numbers only
      sharePrice: [null, [Validators.pattern(/^(0|[1-9]\d*)(\.\d{0,5})?$/)]]
    });
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  public onSubmit(): void {
    const companiesSub = this.companyApiService.addCompany(this.companyForm.value).subscribe({
      next: () => {
        this.submitError = false;
        this.router.navigate(
          ['/view'],
          { queryParams: { companyAdded: true } }
        );
      },
      error: (err) => {
        this.submitError = true;
        console.error(err);
      }
    });

    this.subscriptions.push(companiesSub);
  }

  private validateCode(): AsyncValidatorFn {
    return (control: AbstractControl):
      Observable<{ [key: string]: any } | null> => {
      const controlValue = control.value;
      return control.valueChanges.pipe(
        // use debounce time to control rate of user input, take to use the first emitted by the observable 
        debounceTime(250),
        take(1),
        switchMap(_ =>
          this.companyApiService.getCompanyByCode(controlValue).pipe(
            map(
              result => result && result.code === controlValue ? { codeExists: true } : null
            )
          )
        )
      );
    }
  }
}
