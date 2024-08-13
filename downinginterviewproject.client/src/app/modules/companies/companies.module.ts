import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ViewCompaniesComponent } from './components/view-companies/view-companies.component';
import { AddCompaniesComponent } from './components/add-companies/add-companies.component';
import { AppRoutingModule } from '../../app-routing.module';
import { CompaniesHomeComponent } from './components/companies-home/companies-home.component';

@NgModule({
  declarations: [
    ViewCompaniesComponent,
    AddCompaniesComponent,
    CompaniesHomeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  exports: [
    ViewCompaniesComponent
  ]
})
export class CompaniesModule { }
