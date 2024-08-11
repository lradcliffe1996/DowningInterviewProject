import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewCompaniesComponent } from './components/view-companies/view-companies.component';

@NgModule({
  declarations: [
    ViewCompaniesComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ViewCompaniesComponent
  ]
})
export class CompaniesModule { }
