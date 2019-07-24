import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit,ViewChild } from '@angular/core';
import { CommonTaskService } from '../../Service/common-task.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ErrorService } from '../../Service/error.service';
import { Department } from '../../Model/Response/department';
import { Global } from '../../../global';
import { AppraisalEmpRes } from '../../Model/Response/appraisal-employee-list-res';
import { SessionStorageService } from '../../Service/session-storage.service';
import { AppraisalFormContainerComponent } from '../../Form/appraisal-form-container/appraisal-form-container.component';

declare var $: any;
@Component({
  selector: 'app-appraisal-manager-container',
  templateUrl: './appraisal-manager-container.component.html',
  styleUrls: ['./appraisal-manager-container.component.css']
})
export class AppraisalManagerContainerComponent implements OnInit {
  @ViewChild(AppraisalFormContainerComponent, { static: true }) appraisalFormContainerComponent: AppraisalFormContainerComponent;

  allDepartments: Department[] = [];
  employeeByDepartment: AppraisalEmpRes[];
  showUiControls = {
    departmentSelect: true,
    departmentEmployeeList: false,
    employeeForm: false,
    backButtonToSelect: false
  };
  constructor(
    private _commonTasksservice: CommonTaskService,
    private _errorService: ErrorService,
    private _spinner: NgxSpinnerService,
    private _sessionStorage: SessionStorageService,
    private _router: Router,
    private _global: Global,
    
  ) { }

  ngOnInit() {
    debugger
    this.GetAllDepartments();
   var data= this._sessionStorage.GetLoggedInUserInfo();
  const depid=data.deptID;
  this.DepartmentSelectedGetData(depid);
  
  }
  GetAllDepartments() {
    let subs = this._commonTasksservice.GetAllDepartments()
    .pipe(catchError(x => {
      this._errorService.LogError(x);
      
      return throwError(x);
    }))
    .subscribe((data:Department[])=>{
      this.allDepartments = data;
      subs.unsubscribe();
    }, (error) => {
      this._errorService.LogError(error);
      subs.unsubscribe();
    })
  }

  DepartmentSelectedGetData(value: number){
    debugger
    this.showUiControls.departmentEmployeeList = true;
    this._spinner.show();
    const subs = this._commonTasksservice.GetEmployeesByDepartmentId(value)
    .pipe(catchError(x => {
      this._errorService.LogError(x);
      return throwError(x);
    }))
    .subscribe(
      (data:AppraisalEmpRes[]) =>{
        this.employeeByDepartment = data;
        this._spinner.hide();
      }, 
      (error) => {
        this._errorService.LogError(error);
        this._spinner.hide();
      });
  }

  ViewFormOfEmployee(employee: AppraisalEmpRes){
    debugger
    localStorage.setItem(this._global.SESSION_USER_details, JSON.stringify(employee));
    this._sessionStorage.StoreUserdetailInfo(employee);
    this.showUiControls.departmentEmployeeList = false;
    this.showUiControls.departmentSelect = false;
    this.showUiControls.employeeForm = true;
    this.showUiControls.backButtonToSelect = true;
   // this._router.navigate([this._global.ROUTE_APPRAISAL_Manager_FORM]);     
    this._router.navigate([this._global.ROUTE_APPRAISAL_Manager_FORM ], { queryParams: { id: employee.id } })
    console.log(employee);
  }

  BackButtonToSelect(){
    this.showUiControls.departmentSelect = true;
    this.showUiControls.employeeForm = false;
    this.showUiControls.backButtonToSelect = false;
  }
 

}
