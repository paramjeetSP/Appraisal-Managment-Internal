import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppraisalFormContainerComponent } from './Form/appraisal-form-container/appraisal-form-container.component';
import { AppraisalLoginContainerComponent } from './Login/appraisal-login-container/appraisal-login-container.component';
import { AppraisalEmployeeListComponent } from './EmployeeList/appraisal-employee-list/appraisal-employee-list.component';
import { AppraisalManagerContainerComponent } from './Manager/appraisal-manager-container/appraisal-manager-container.component';
import { AppraisalFormHrComponent } from './Form/appraisal-form-hr/appraisal-form-hr.component';
import { AppraisalFormManagerComponent } from './Form/appraisal-form-manager/appraisal-form-manager.component';
import { AppraisalEmployeeViewComponent } from './Form/appraisal-employee-view/appraisal-employee-view.component';
import { AuthGuard } from '../auth.guard';
import { AuthLoginGuard } from '../auth-login.guard';

const routes: Routes = [
  {
    path: 'Listing',
    component: AppraisalEmployeeListComponent,
    canActivate :[AuthGuard],
    data:{
title : 'Listing Page'
    }
  },
  {
    path: 'Form',
    component: AppraisalFormContainerComponent,
    canActivate :[AuthGuard],
    data:{
title : 'Form Page'
    }
  },
  {
    path: 'EmployeeviewForm',
    component: AppraisalEmployeeViewComponent,
    canActivate :[AuthGuard],
    data:{
title : 'Employee Page'
    }
  },
  
  {
    path: 'HrForm',
    component: AppraisalFormHrComponent,
    canActivate :[AuthGuard],
    data:{
title : 'HrForm Page'
    }
  },
  {
    path: 'ManagerForm',
    component: AppraisalFormManagerComponent,
    canActivate :[AuthGuard],
    data:{
title : 'ManagerForm Page'
    }
  },
  {
    path: 'Login',
    component: AppraisalLoginContainerComponent,
    canActivate :[AuthLoginGuard],
    data:{
title : 'Login Page'
    }
  },
  {
    path: 'Goal',
    component: AppraisalManagerContainerComponent,
    canActivate :[AuthGuard],
    data:{
title : 'Goal Page'
    }
  },
  {
    path: '',
    redirectTo: '/Appraisal/Login',
    pathMatch : 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard,AuthLoginGuard]
})
export class AppraisalRoutingModule { }
