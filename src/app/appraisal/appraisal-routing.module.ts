import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppraisalFormContainerComponent } from './Form/appraisal-form-container/appraisal-form-container.component';
import { AppraisalLoginContainerComponent } from './Login/appraisal-login-container/appraisal-login-container.component';
import { AppraisalEmployeeListComponent } from './EmployeeList/appraisal-employee-list/appraisal-employee-list.component';
import { AppraisalManagerContainerComponent } from './Manager/appraisal-manager-container/appraisal-manager-container.component';
import { AppraisalFormHrComponent } from './Form/appraisal-form-hr/appraisal-form-hr.component';
import { AppraisalFormManagerComponent } from './Form/appraisal-form-manager/appraisal-form-manager.component';

const routes: Routes = [
  {
    path: 'Listing',
    component: AppraisalEmployeeListComponent
  },
  {
    path: 'Form',
    component: AppraisalFormContainerComponent
  },
  {
    path: 'HrForm',
    component: AppraisalFormHrComponent
  },
  {
    path: 'ManagerForm',
    component: AppraisalFormManagerComponent
  },
  {
    path: 'Login',
    component: AppraisalLoginContainerComponent
  },
  {
    path: 'Goal',
    component: AppraisalManagerContainerComponent
  },
  {
    path: '',
    redirectTo: 'Login',
    pathMatch : 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppraisalRoutingModule { }
