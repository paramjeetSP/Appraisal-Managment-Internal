import { Component, OnInit, ViewChild } from '@angular/core';
import { AppraisalEmpListService } from '../../Service/appraisal-emp-list.service';
import { AppraisalEmpRes } from '../../Model/Response/appraisal-employee-list-res';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ErrorService } from '../../Service/error.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToasterServiceCustom } from '../../Service/toaster.service';
import { Global } from '../../../global';
import { Department, yearlist } from '../../Model/Response/department';
import { CommonTaskService } from '../../Service/common-task.service';
import { MatTableDataSource, MatPaginator, MatSnackBar, MatDialogRef } from '@angular/material';
import { SnackBarSuccessComponent } from 'src/app/shared/snack-bar-success/snack-bar-success.component';
import { DialogService } from '../../Service/dialog.service';
import { FilterTypes, DialogDataForInitiateAppraisalProcess } from '../../Model/generic.models';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { SessionStorageService } from '../../Service/session-storage.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-appraisal-employee-list',
  templateUrl: './appraisal-employee-list.component.html',
  styleUrls: ['./appraisal-employee-list.component.css']
})
export class AppraisalEmployeeListComponent implements OnInit {
  employeeList = new MatTableDataSource<AppraisalEmpRes>();
  employeeListdrpdwn = new MatTableDataSource<AppraisalEmpRes>();
  employeeListOriginal: AppraisalEmpRes[];
 // displayedColumns: string[] = ['fullName', 'emp_Code', 'officialEmail', 'appraisalStatus', 'department','HrAssesmentStatus'];
   displayedColumns: string[] = ['fullName', 'emp_Code', 'officialEmail', 'appraisalStatus', 'department','HrinitiateFormStatus','GoalsettingByLeadStatus','SelfAssesmentStatus','LeadAssesmentStatus','HrAssesmentStatus','ViewForm'];
  filterTypes: FilterTypes[] = []; // Type should match AppraisalEmpRes interface property names
  allDepartments: Department[];
  yearselectedOption: yearlist[];
  Showemployeelistgrid: boolean = false;
  Showemptygrid : boolean = true;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  selectedOption: any;
  periodselectedOption: any;
  yearselected: any;
  periodControldrpdown: FormControl;
  bordersControl: any;
  constructor(
    private _appraisalEmpListSer: AppraisalEmpListService,
    private _errorService: ErrorService,
    private _spinner: NgxSpinnerService,
    private _toasterService: ToasterServiceCustom,
    private _global: Global,
    private _commonTasksservice: CommonTaskService,
    private _snackBar: MatSnackBar,
    private _dialogService: DialogService,
    private _router: Router,
    private _sessionStorage: SessionStorageService
  ) { }

  ngOnInit() {
// debugger
 var date = new Date();
 var month= date.getMonth();
 if (month == 4 || month == 5 || month == 6 || month == 7 || month == 8 || month == 9 || month == 10)
  {
    this.periodselectedOption=1;
  } 
  else{
    this.periodselectedOption=2;
  }  
 this.Getyeardropdownlist();
    localStorage.removeItem("deptName");
    localStorage.removeItem("periodSelected");
   this.employeeList.paginator = this.paginator;
    this.GetAllDepartments();
   this.SetupComponentVars();
   // this._spinner.show();
   this.GetEmployeeForAppraisal();
   
  }

  SubmitrequestToInitiateAppraisalProcess(item: AppraisalEmpRes): void {
 //  debugger
    const dialogRef = this._dialogService.OpenDialogForConfirmInitiateProcess(
      { wantToSubmit: true, nameToSubmitFor: item.fullName } as DialogDataForInitiateAppraisalProcess
    );// By default setting the value to true so if the user cancels then the result will be undefined in the callback
    dialogRef.afterClosed().subscribe((result: boolean) => {
  //    debugger
      if (result) {
        this.InitiateAppraisal(item);  
   
      }
    });
  }
  SubmitReinitiate(item: AppraisalEmpRes): void {
   // debugger
    const dialogRef = this._dialogService.OpenDialogForConfirmInitiateProcess(
      { wantToSubmit: true, nameToSubmitFor: item.fullName } as DialogDataForInitiateAppraisalProcess
    );// By default setting the value to true so if the user cancels then the result will be undefined in the callback
    dialogRef.afterClosed().subscribe((result: boolean) => {
  //    debugger
      if (result) {
        this.ReInitiateAppraisal(item);  
   
      }
    });
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SnackBarSuccessComponent, {
      duration: 5 * 1000,
    });
  }
  SetupComponentVars() {
  //  debugger
    this.filterTypes = [
      { type: this._global.COL_DEPARTMENT, value: '', shouldFilter: false },
      { type: this._global.COL_FULL_NAME, value: '', shouldFilter: false }
    ];
  }
  GetEmployeeForAppraisal() {
   // debugger
    let subs = this._appraisalEmpListSer.GetEmployeeListing()
      .pipe(catchError(x => {
        this._errorService.LogError(x);
        return throwError(x);
      }))
      .subscribe(
        (data: AppraisalEmpRes[]) => {
      //    debugger
          this.employeeList = new MatTableDataSource<AppraisalEmpRes>(data);
          this.SetEmployeeTablePaginator();
          this.employeeListOriginal = data;
          this._spinner.hide();
          this.Filter();
          subs.unsubscribe();
          
        },
        (err) => {
          this._errorService.LogError(err);
          console.log(err);
          this._spinner.hide();
          subs.unsubscribe();
        }
      )
  }
 
  DepartmentSelected(value: any){
  //  debugger
    console.log(value);
  
    this.DepartmentSelectedGetData(value);//.emit(value.value);
  }

  ReInitiateAppraisal(item: AppraisalEmpRes) {
   // debugger
    const body = {
      'id': item.id,
      'empid': item.emp_Id,
      'year': item.year,
      'cycle': item.cycle 
    };
    // let con = confirm(`Are you sure you want to initiate the process for ${item.fullName}`)
   // this._spinner.show();
    let subs = this._appraisalEmpListSer.ReInitiateApraisalProcess(body)
      .pipe(catchError((x:HttpErrorResponse) => {
        this._errorService.LogError(x);
        this._toasterService.ErrorSnackBarRightBottom(x.message)
        this._spinner.hide();
        subs.unsubscribe();
        return throwError(x);
      }))
      .subscribe((data: boolean) => {
        if (data) this._toasterService.SuccessSnackBarRightBottom(`${this._global.TOAST_Appraisal_Process_reInitiated} for ${item.fullName}`);
     //    debugger    
         this._spinner.hide();    
        // this._router.navigate([this._global.ROUTE_APPRAISAL_FORM]);     
        this.GetEmployeeForAppraisal();
        subs.unsubscribe();
      }, (err) => {
        this._errorService.LogError(err);
        this._spinner.hide();
        subs.unsubscribe();
      })
  }

  InitiateAppraisal(item: AppraisalEmpRes) {
   // debugger
    // let con = confirm(`Are you sure you want to initiate the process for ${item.fullName}`)
    this._spinner.show();
    let subs = this._appraisalEmpListSer.InitiateApraisalProcess(item)
      .pipe(catchError((x:HttpErrorResponse) => {
        this._errorService.LogError(x);
        this._toasterService.ErrorSnackBarRightBottom(x.message)
        this._spinner.hide();
        subs.unsubscribe();
        return throwError(x);
      }))
      .subscribe((data: boolean) => {
        if (data) this._toasterService.SuccessSnackBarRightBottom(`${this._global.TOAST_Appraisal_Process_Initiated} for ${item.fullName}`);
     //    debugger    
         this._spinner.hide();    
        // this._router.navigate([this._global.ROUTE_APPRAISAL_FORM]);     
        this.GetEmployeeForAppraisal();
        subs.unsubscribe();
      }, (err) => {
        this._errorService.LogError(err);
        this._spinner.hide();
        subs.unsubscribe();
      })
  }

  SetEmployeeTablePaginator() {
   // debugger
    this.employeeList.paginator = this.paginator;
    //setTimeout(() => this.employeeList.paginator = this.paginator);
  }
  DepartmentFilter(filtervalue: string) {
    //debugger
    this.selectedOption='0';
    this.employeeList = new MatTableDataSource<AppraisalEmpRes>(this.employeeListOriginal);
  
    filtervalue === '' ? this.SetSholdFilterToFlase(this._global.COL_DEPARTMENT) : null; // Here we set the filterType element value to false, which will not include it in the filtering processif(filtervalue && filtervalue === '') this.GetEmployeeForAppraisal();
      this.filterTypes = this.filterTypes.map((val: FilterTypes) => {
        if (val.type === this._global.COL_DEPARTMENT) {
          val.value = filtervalue;
          val.shouldFilter = true;
         
        }
        return val;
      });
    // }
   

    this.Filter();
  }
  FullNameFilter(filtervalue: string) {
   // debugger
    this.employeeList = new MatTableDataSource<AppraisalEmpRes>(this.employeeListOriginal);
    filtervalue === '' ? this.SetSholdFilterToFlase(this._global.COL_FULL_NAME) : null; // Here we set the filterType element value to false, which will not include it in the filtering process
this.filterTypes = this.filterTypes.map((val: FilterTypes) => {
      if (val.type === this._global.COL_FULL_NAME) {
        val.value = filtervalue;
        val.shouldFilter = true;
      }
      return val;
    });
   //}
    

    this.Filter();
  }
  SetSholdFilterToFlase(column) {
    this.filterTypes = this.filterTypes.map(x => {
      if (x.type === column) x.shouldFilter = false;
      return x;
    });
  }
  /**
   * Will filter based on the filterTypes set. If filterTypes.shouldFlter is set to true only then 
   * the filter value will be included in the filter algo.
   */
  Filter() {
   // debugger
    this.employeeList.data = this.employeeList.data.filter(employee => {
      let filterThatShouldBeChecked = this.filterTypes.filter(x => { return x.shouldFilter });
      let counterToCheckTheNumberOfFiltersToPass = filterThatShouldBeChecked.length;
      let counterFiltersPassed = 0;
      this.filterTypes.forEach(type => {
        if (type.shouldFilter) {
          let valueToMatch: string = employee[type.type];
          if (valueToMatch) {
            let matches = valueToMatch.toLowerCase().match(type.value.toLowerCase());
            matches ? counterFiltersPassed++ : null;
          }
        }
      });
      return counterToCheckTheNumberOfFiltersToPass === counterFiltersPassed ? true : false;
    });
    this.SetEmployeeTablePaginator();
  }

  DepartmentSelectedGetData(value: number) {
  //  debugger
    this.selectedOption=null;
    let departmentString = this.allDepartments.filter(x => { return x.id === value });
    if (departmentString.length > 0) {
      this.DepartmentFilter(departmentString[0].deptName);
      localStorage.setItem("deptName",departmentString[0].deptName);
      
    } else {
      this.DepartmentFilter('');
    }
  }

  ViewFormClicked(item: AppraisalEmpRes){
  // debugger
    localStorage.removeItem('hrnotification');
  // localStorage.setItem(this._global.SESSION_USER_details, JSON.stringify(item));
    this._sessionStorage.StoreUserdetailInfo(item);
  // this._router.navigate([this._global.ROUTE_APPRAISAL_FORM]);
    this._router.navigate([this._global.ROUTE_APPRAISAL_Hr_FORM ], { queryParams: { id: item.id ,year:item.year,cycle:item.cycle} });     
   // console.log(employee);
  }
  GetAllDepartments() {
    let subs = this._commonTasksservice.GetAllDepartments()
      .pipe(catchError(x => {
        this._errorService.LogError(x);

        return throwError(x);
      }))
      .subscribe((data: Department[]) => {
        this.allDepartments = data;
        subs.unsubscribe();
      }, (error) => {
        this._errorService.LogError(error);
        subs.unsubscribe();
      })
  }

  GoalformSelected(value: any){
  //  debugger

   if(value.value=='1'){
    this.GetstatusPendingEmployeeForAppraisal();
  }

  else if(value.value=='2'){

    this.GetstatusProgressEmployeeForAppraisal();
  }
  else if(value.value=='3'){
    this.GetstatusCompletedEmployeeForAppraisal();
  }
  else{
    this.selectedOption='0';
  }
   
  }
  GetstatusPendingEmployeeForAppraisal() {
//    debugger
    let subs = this._appraisalEmpListSer.GetEmployeeListing()
      .pipe(catchError(x => {
        this._errorService.LogError(x);
        return throwError(x);
      }))
      .subscribe(
        (data: AppraisalEmpRes[]) => {
        //  debugger
          this.employeeListOriginal = data;
          var dptnam=  localStorage.getItem("deptName");
          if(dptnam!=null){
            var datval=   this.employeeListOriginal.filter(x => x.hrinitiateFormStatus =='1'  && x.department ==dptnam);
            this.employeeList.data=datval;
          }
          else{
            var datval=   this.employeeListOriginal.filter(x => x.hrinitiateFormStatus =='1');
            this.employeeList.data=datval;
          }
   
          subs.unsubscribe();
          
        },
        (err) => {
          this._errorService.LogError(err);
          console.log(err);
          this._spinner.hide();
          subs.unsubscribe();
        }
      )
  }

  GetstatusProgressEmployeeForAppraisal() {
//    debugger
    let subs = this._appraisalEmpListSer.GetEmployeeListing()
      .pipe(catchError(x => {
        this._errorService.LogError(x);
        return throwError(x);
      }))
      .subscribe(
        (data: any) => {
      //    debugger
          this.employeeListOriginal=data;
          var dptnam=  localStorage.getItem("deptName");
          if(dptnam!=null){    
            var datval=   this.employeeListOriginal.filter(x => x.hrinitiateFormStatus !='1' && x.hrAssesmentStatus !='3'  && x.department ==dptnam);
            this.employeeList.data=datval;
          }
          else{
            var datval=   this.employeeListOriginal.filter(x => x.hrinitiateFormStatus !='1' && x.hrAssesmentStatus !='3');
            this.employeeList.data=datval;
          }
     
          subs.unsubscribe();
          
        },
        (err) => {
          this._errorService.LogError(err);
          console.log(err);
          this._spinner.hide();
          subs.unsubscribe();
        }
      )
  }

  GetstatusCompletedEmployeeForAppraisal() {
    //debugger
    let subs = this._appraisalEmpListSer.GetEmployeeListing()
      .pipe(catchError(x => {
        this._errorService.LogError(x);
        return throwError(x);
      }))
      .subscribe(
        (data: AppraisalEmpRes[]) => {
        //  debugger
          this.employeeListOriginal=data;
          var dptnam=  localStorage.getItem("deptName");
          if(dptnam!=null){    
         var datval=   this.employeeListOriginal.filter(x => x.hrAssesmentStatus =='3' && x.department ==dptnam);
          this.employeeList.data=datval;
        }
        else{
          var datval=   this.employeeListOriginal.filter(x => x.hrAssesmentStatus =='3');
          this.employeeList.data=datval;
        }

          this.SetEmployeeTablePaginator();     
          this._spinner.hide();
          subs.unsubscribe();
          
        },
        (err) => {
          this._errorService.LogError(err);
          console.log(err);
          this._spinner.hide();
          subs.unsubscribe();
        }
      )
  }

  periodSelected(value: any){
  //  debugger
  var defaultyear =  localStorage.getItem("bydefaultyear");
   var date = new Date();
//  var month= date.getMonth();
//  if (month == 4 || month == 5 || month == 6 || month == 7 || month == 8 || month == 9 || month == 10)
//   {
//     this.periodselectedOption=1;
//   } 
//   else{
//     this.periodselectedOption=2;
//   }              
  var currentyear =date.getFullYear().toString();
  var periodval =value.value;
  var periodSelected =  localStorage.setItem("periodSelected",value.value);
  if(periodval==1){
  var  period="May-October";
  }
  else if(periodval==2){
    var  period="November-April";
  }

  if(defaultyear==currentyear){
this.GetEmployeeForAppraisal();
  }
  else{
  const body_data = {
    'year': defaultyear,
    'cycle': period,
    
  };
  // first time save api 
    this._appraisalEmpListSer.GetEmployeeListingbyyearandperiod(body_data).subscribe((body_data: any) => {
      if (body_data) {
    // debugger
    this.employeeList.data=body_data;
    }
     
    });
  }
  }

  yearSelected(value: any){
   // debugger
    localStorage.removeItem("bydefaultyear");
    localStorage.setItem("bydefaultyear",value.value);
    this.periodselectedOption=null;
  }

  Getyeardropdownlist() {
  //  debugger
    let subs = this._commonTasksservice.Getyearlist()
    .pipe(catchError(x => {
      this._errorService.LogError(x);
      
      return throwError(x);
    }))
    .subscribe((data:any)=>{
   //   debugger
      this.yearselectedOption = data;
      this.yearselected=data[0].yearlist;
      localStorage.setItem("bydefaultyear",data[0].yearlist);
    //  subs.unsubscribe();
    }, (error) => {
      this._errorService.LogError(error);
     // subs.unsubscribe();
    })
  }
}
