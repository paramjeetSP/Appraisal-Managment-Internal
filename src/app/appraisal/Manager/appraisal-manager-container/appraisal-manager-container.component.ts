import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { CommonTaskService } from '../../Service/common-task.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ErrorService } from '../../Service/error.service';
import { Department } from '../../Model/Response/department';
import { AppraisalEmpRes } from '../../Model/Response/appraisal-employee-list-res';

@Component({
  selector: 'app-appraisal-manager-container',
  templateUrl: './appraisal-manager-container.component.html',
  styleUrls: ['./appraisal-manager-container.component.css']
})
export class AppraisalManagerContainerComponent implements OnInit {
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
    private _spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.GetAllDepartments();
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
    this.showUiControls.departmentEmployeeList = false;
    this.showUiControls.departmentSelect = false;
    this.showUiControls.employeeForm = true;
    this.showUiControls.backButtonToSelect = true;
    console.log(employee);
  }

  BackButtonToSelect(){
    this.showUiControls.departmentSelect = true;
    this.showUiControls.employeeForm = false;
    this.showUiControls.backButtonToSelect = false;
  }

}
