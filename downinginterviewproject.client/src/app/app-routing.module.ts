import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViewCompaniesComponent } from './modules/companies/components/view-companies/view-companies.component';
import { AddCompaniesComponent } from './modules/companies/components/add-companies/add-companies.component';
import { CompaniesHomeComponent } from './modules/companies/components/companies-home/companies-home.component';

const routes: Routes = [
  {
    path: '',
    component: CompaniesHomeComponent,
    children: [
      { path: 'view', component: ViewCompaniesComponent },
      { path: 'add', component: AddCompaniesComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
