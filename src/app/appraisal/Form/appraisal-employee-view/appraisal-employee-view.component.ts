import { Component, OnInit } from '@angular/core';
import { ErrorService } from '../../Service/error.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToasterServiceCustom } from '../../Service/toaster.service';
import { Global } from 'src/app/global';
import { CommonTaskService } from '../../Service/common-task.service';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import { DialogService } from '../../Service/dialog.service';
import { Router } from '@angular/router';
import { SessionStorageService } from '../../Service/session-storage.service';
import { AppraisalEmpRes, EmpDetailRes, EmpDetail } from '../../Model/Response/appraisal-employee-list-res';

@Component({
  selector: 'app-appraisal-employee-view',
  templateUrl: './appraisal-employee-view.component.html',
  styleUrls: ['./appraisal-employee-view.component.css']
})
export class AppraisalEmployeeViewComponent implements OnInit {
 // employeeList = new MatTableDataSource<EmpDetail>();
  fullName:string;
  emp_Code:string;
  officialEmail:string;
  department:string;
  selfAssesmentStatus:string;
  Showemployeelistgrid :boolean;
  Showemptygrid:boolean;
  isviewform:boolean;
  displayedColumns: string[] = ['fullName',  'department','ViewForm'];
  //employeeviewList: import("e:/Appraisaltimelog/Appraisal-Managment-Internal/src/app/appraisal/Model/Response/appraisal-login-response").AppraisalLoginResponse;
  constructor(
    private _errorService: ErrorService,
    private _spinner: NgxSpinnerService,
    private _toasterService: ToasterServiceCustom,
    private _global: Global,
    private _commonTasksservice: CommonTaskService,
    private _snackBar: MatSnackBar,
    private _dialogService: DialogService,
    private _router: Router,
    private _sessionStorage: SessionStorageService,
  ) { }

  ngOnInit() {  
 debugger  
   var  data = this._sessionStorage.GetLoggedInUserInfo();
   this.fullName=data.fullName;
   this.department=data.deptName;
   this.selfAssesmentStatus=data.selfAssesmentStatus;
    if(this.selfAssesmentStatus=="2" ||this.selfAssesmentStatus=="3"){
      this.Showemptygrid=false;
      this.Showemployeelistgrid=true;
    }
   else{
    this.Showemptygrid=true;
    this.Showemployeelistgrid=false;
   }
  }
  employeeview(){
    debugger
       var data= this._sessionStorage.GetLoggedInUserInfo();
     //  this.employeeList=data
     const id=data.id;
    this._router.navigate([this._global.ROUTE_APPRAISAL_FORM ], { queryParams: { id: data.id } });
  }

  employeeEdit(){
    debugger
    localStorage.setItem('isedit', "true");
    var data= this._sessionStorage.GetLoggedInUserInfo();
    this._router.navigate([this._global.ROUTE_APPRAISAL_FORM ], { queryParams: { id: data.id } });
  }
}
