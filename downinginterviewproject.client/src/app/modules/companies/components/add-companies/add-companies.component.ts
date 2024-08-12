import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-companies',
  templateUrl: './add-companies.component.html',
  styleUrl: './add-companies.component.css'
})
export class AddCompaniesComponent {
  public companyForm: FormGroup;

  public constructor(private fb: FormBuilder) {
    this.companyForm = this.fb.group({
      companyName: ['', [
        Validators.required,
        Validators.maxLength(100),
        Validators.pattern('(^[a-zA-Z0-9!@#$&()\\-`.+,/\" ]*)')]
      ],
      code: ['', [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern('(^[A-Z0-9]*)')]
      ],
      sharePrice: ['', [
        Validators.pattern(/^\d(\.\d{0,5})?/)]
      ]
    });
  }

  public onSubmit(): void {
    console.log(
      this.companyForm.value
    )
  }
}
