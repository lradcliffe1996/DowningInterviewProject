import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViewCompaniesComponent } from './modules/companies/components/view-companies/view-companies.component';

const routes: Routes = [
  { path: '', component: ViewCompaniesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
