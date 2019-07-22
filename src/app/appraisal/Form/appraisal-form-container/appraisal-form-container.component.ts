import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { SessionStorageService } from '../../Service/session-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppraisalFormService } from '../../Service/appraisal-form.service';
import { Global } from 'src/app/global';
import { AppraisalEmpRes, AppraisalEmpGoalRes, EmpDetailRes } from '../../Model/Response/appraisal-employee-list-res';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AppraisalManagerContainerComponent } from '../../Manager/appraisal-manager-container/appraisal-manager-container.component';
import { CommonTaskService } from '../../Service/common-task.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ErrorService } from '../../Service/error.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-appraisal-form-container',
  templateUrl: './appraisal-form-container.component.html',
  styleUrls: ['./appraisal-form-container.component.css']
})

export class AppraisalFormContainerComponent implements OnInit {
  
  employeeByDepartment: AppraisalEmpRes[];
  goalForm: FormGroup;
  FullName: string;
  doj: string;
  goalone: string;
  goaltwo: string;
  goalthree: string;
  goalFour: string;
  goalFive:string;
  goalSix: string;
  goalseven: string;
  goaleight:string;
  goalnine:string;
  goalten:string;
  goaleleven: string;
  goaltwelve:string;
  grade: string;
  designation: string;
  department: string;
  reportingTo: string;
  PersonalData = [];
  name: string;
  empoloyeeID: number;
  // employeegoal: Array<{ description: string, rate: number }> = [];
 employeegoal: Array<{ description: string,id:number,departmentHead:string}> = [];
 
  
  constructor(private _sessionStorage: SessionStorageService,
    private formBuilder: FormBuilder,
    private appraisalFormService:AppraisalFormService,
    private _global: Global,
     private _commonTasksservice: CommonTaskService,
     private _errorService: ErrorService,
     private router: ActivatedRoute,
     private _router: Router,) { }

  ngOnInit() {
    debugger
  //  this.personaldata();       
  var idval= this.router.snapshot.queryParamMap.get('id');  
  if(idval!=null){
 this.GetemployeeDetails(idval);
this.Getgoalemployee(idval);

//this.goalForm.disable;

  }
  else{
    var data= this._sessionStorage.GetLoggedInUserInfo();
    const id=data.id;
  //  this.Getgoalemployee(id);
   
  }
    
  
    this.goalForm = this.formBuilder.group({
      goalone: ['', Validators.required],
      goaltwo: ['', Validators.required],
      goalthree: ['', Validators.required],
      goalFour: ['', Validators.required],
      goalFive: ['', Validators.required],
      goalSix: ['', Validators.required],
      goalseven: ['', Validators.required],
      goaleight: ['', Validators.required],
      goalnine: ['', Validators.required],
      goalten: ['', Validators.required],
      goaleleven: ['', Validators.required],
      goaltwelve: ['', Validators.required],
      // ratingitself
    //  ratingone: ['', Validators.required],
    //   ratingtwo: ['', Validators.required],
    //   ratingthree: ['', Validators.required],
    //   ratingfour: ['', Validators.required],
    //   ratingfive: ['', Validators.required],
    //   ratingsix: ['', Validators.required],
    //   ratingseven: ['', Validators.required],
    //   ratingeight: ['', Validators.required],
    //   ratingnine: ['', Validators.required],
    //   ratingten: ['', Validators.required],
    //   ratingeleven: ['', Validators.required],
    //   ratingtwelve: ['', Validators.required],

    });
  }

  personaldata(){
   // debugger
   var data = this._sessionStorage.GetUserdetailInfo();
    this.FullName = data.fullName;
   this.doj = data.doj;
   this.grade = data.grade;
   this.designation = data.designation;
   this.department = data.department;
   this.reportingTo = data.managerName;    
  }

  Getgoalemployee(id: any){
    debugger
   
    const subs = this.appraisalFormService.GetEmployeeGolaById(id)
    .pipe(catchError(x => {
      this._errorService.LogError(x);
      return throwError(x);
    }))
    .subscribe(
      (data:AppraisalEmpGoalRes[]) => {
        debugger
     //
      var data=data;
      this.goalone=data[0].description;
      this.goaltwo=data[1].description;
      this.goalthree=data[2].description;
      this.goalFour=data[3].description;
      this.goalFive=data[4].description;
      this.goalSix=data[5].description;
      this.goalseven=data[6].description;
      this.goaleight=data[7].description;
      this.goalnine=data[8].description;
      this.goalten=data[9].description;
      this.goaleleven=data[10].description;
      this.goaltwelve=data[11].description;
      //  this._spinner.hide();
      }, 
      (error) => {
        this._errorService.LogError(error);
      //  this._spinner.hide();
      });
  }

  GetemployeeDetails(id: any){
    debugger
    const subs = this.appraisalFormService.GetEmployeeDetailsById(id)
    .pipe(catchError(x => {
      this._errorService.LogError(x);
      return throwError(x);
    }))
    .subscribe(
     
      (data:EmpDetailRes[]) => {
        debugger
      var dataitem=data[0];
    this.FullName=dataitem.fullName;
    this.doj = dataitem.doj;
    this.grade = dataitem.grade;
    this.designation = dataitem.designation;
    this.department = dataitem.department;
    this.reportingTo = dataitem.reportingTo;  
      }, 
      (error) => {
        this._errorService.LogError(error);
     
      });
  }

  DepartmentSelectedGetData(value: number){
    debugger
   
    const subs = this._commonTasksservice.GetEmployeesByDepartmentId(value)
    .pipe(catchError(x => {
      this._errorService.LogError(x);
      return throwError(x);
    }))
    .subscribe(
      (data:AppraisalEmpRes[]) =>{
        this.employeeByDepartment = data;
      //  this._spinner.hide();
      }, 
      (error) => {
        this._errorService.LogError(error);
      //  this._spinner.hide();
      });
  }
  onSubmit() {
    debugger
    var goal1 = this.goalForm.controls.goalone.value;
    var goal2 = this.goalForm.controls.goaltwo.value;
    var goal3 = this.goalForm.controls.goalthree.value;
    var goal4 = this.goalForm.controls.goalFour.value;
    var goal5 = this.goalForm.controls.goalFive.value;
    var goal6 = this.goalForm.controls.goalSix.value;
    var goal7 = this.goalForm.controls.goalseven.value;
    var goal8 = this.goalForm.controls.goaleight.value;
    var goal9 = this.goalForm.controls.goalnine.value;
    var goal10 = this.goalForm.controls.goalten.value;
    var goal11 = this.goalForm.controls.goaleleven.value;
    var goal12 = this.goalForm.controls.goaltwelve.value;

    var data = this._sessionStorage.GetUserdetailInfo();
   const empid =data.id;
   var managerid =data.departmentHead;

//
    // var rating1 = this.goalForm.controls.ratingone.value;
    // var rating2 = this.goalForm.controls.ratingtwo.value;
    // var rating3 = this.goalForm.controls.ratingthree.value;
    // var rating4 = this.goalForm.controls.ratingfour.value;
    // var rating5 = this.goalForm.controls.ratingfive.value;
    // var rating6 = this.goalForm.controls.ratingsix.value;
    // var rating7 = this.goalForm.controls.ratingseven.value;
    // var rating8 = this.goalForm.controls.ratingeight.value;
    // var rating9 = this.goalForm.controls.ratingnine.value;
    // var rating10 = this.goalForm.controls.ratingten.value;
    // var rating11 = this.goalForm.controls.ratingeleven.value;
    // var rating12 = this.goalForm.controls.ratingtwelve.value;
    // let customObj = new Custom();
    // customObj.name = "something";
    // customObj.empoloyeeID = 12; 
    // this.goalSettting.push(
    //   customObj
    // );
  

      this.employeegoal.push({ description: goal1,id: empid,departmentHead:managerid});
    this.employeegoal.push({ description: goal2 ,id: empid,departmentHead:managerid});
    this.employeegoal.push({ description: goal3 ,id: empid,departmentHead:managerid});
    this.employeegoal.push({ description: goal4 ,id: empid,departmentHead:managerid});
    this.employeegoal.push({ description: goal5,id: empid,departmentHead:managerid});
    this.employeegoal.push({ description: goal6 ,id: empid,departmentHead:managerid});
    this.employeegoal.push({ description: goal7 ,id: empid,departmentHead:managerid});
    this.employeegoal.push({ description: goal8 ,id: empid,departmentHead:managerid});
    this.employeegoal.push({ description: goal9 ,id: empid,departmentHead:managerid});
    this.employeegoal.push({ description: goal10 ,id: empid,departmentHead:managerid});
    this.employeegoal.push({ description: goal11,id: empid,departmentHead:managerid });
    this.employeegoal.push({ description: goal12 ,id: empid,departmentHead:managerid});
    console.log('goal setting array',this.employeegoal);
  //  const data =this.employeegoal;
  
  const body_data = {
    'employeegoal': this.employeegoal
  };
    this.appraisalFormService.PostgoalformData(body_data).subscribe((employeegoal: any) => {
      if (employeegoal) {
        alert("save success");
        }
     
    });

  }

}
