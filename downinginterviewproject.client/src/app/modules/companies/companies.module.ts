import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ViewCompaniesComponent } from './components/view-companies/view-companies.component';
import { AddCompaniesComponent } from './components/add-companies/add-companies.component';

@NgModule({
  declarations: [
    ViewCompaniesComponent,
    AddCompaniesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    ViewCompaniesComponent
  ]
})
export class CompaniesModule { }
