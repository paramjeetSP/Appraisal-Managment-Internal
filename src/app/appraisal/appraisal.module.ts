import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppraisalRoutingModule } from './appraisal-routing.module';
import { AppraisalFormContainerComponent } from './Form/appraisal-form-container/appraisal-form-container.component';
import { AppraisalFormPersonalDataComponent } from './Form/appraisal-form-personal-data/appraisal-form-personal-data.component';
import { AppraisalFormGoalSectionComponent } from './Form/appraisal-form-goal-section/appraisal-form-goal-section.component';
// tslint:disable-next-line: max-line-length
import { AppraisalFormBehaviouralGoalSectionComponent } from './Form/appraisal-form-behavioural-goal-section/appraisal-form-behavioural-goal-section.component';
// tslint:disable-next-line: max-line-length
import { AppraisalFormAmbitionExpectSectionComponent } from './Form/appraisal-form-ambition-expect-section/appraisal-form-ambition-expect-section.component';
import { AppraisalFormSummaryComponent } from './Form/appraisal-form-summary/appraisal-form-summary.component';
import { AppraisalFormClosureComponent } from './Form/appraisal-form-closure/appraisal-form-closure.component';
import { AppraisalLoginContainerComponent } from './Login/appraisal-login-container/appraisal-login-container.component';
import { ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material';
import { SharedMaterialModule } from '../shared-material/shared-material.module';
import { AppraisalEmployeeListComponent } from './EmployeeList/appraisal-employee-list/appraisal-employee-list.component';
import { SharedModule } from '../shared/shared.module';
import { AppraisalManagerContainerComponent } from './Manager/appraisal-manager-container/appraisal-manager-container.component';
import { ManagerDepartmentComponent } from './Manager/manager-department/manager-department.component';
import { ManagerEmployeeListComponent } from './Manager/manager-employee-list/manager-employee-list.component';
import { Global } from '../global';
import { DialogService } from './Service/dialog.service';
import { AppraisalFormManagerComponent } from './Form/appraisal-form-manager/appraisal-form-manager.component';
import { AppraisalFormHrComponent } from './Form/appraisal-form-hr/appraisal-form-hr.component';
@NgModule({
  declarations: [
    AppraisalFormContainerComponent,
    AppraisalFormPersonalDataComponent,
    AppraisalFormGoalSectionComponent,
    AppraisalFormBehaviouralGoalSectionComponent,
    AppraisalFormAmbitionExpectSectionComponent,
    AppraisalFormSummaryComponent,
    AppraisalFormClosureComponent,
    AppraisalLoginContainerComponent,
    AppraisalEmployeeListComponent,
    AppraisalManagerContainerComponent,
    ManagerDepartmentComponent,
    ManagerEmployeeListComponent,
    AppraisalFormManagerComponent,
    AppraisalFormHrComponent
  ],
  imports: [
    CommonModule,
    AppraisalRoutingModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    SharedModule
  ],
  providers: [Global, DialogService]
})
export class AppraisalModule { }
