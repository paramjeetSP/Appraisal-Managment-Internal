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
import { ToasterServiceCustom } from '../../Service/toaster.service';
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
  disableTextbox : boolean = false;
  // employeegoal: Array<{ description: string, rate: number }> = [];
 employeegoal: Array<{ description: string,id:number,departmentHead:string}> = [];
 
  
  constructor(private _sessionStorage: SessionStorageService,
    private formBuilder: FormBuilder,
    private appraisalFormService:AppraisalFormService,
    private _global: Global,
     private _commonTasksservice: CommonTaskService,
     private _errorService: ErrorService,
     private router: ActivatedRoute,
     private _router: Router,
     private _toasterService: ToasterServiceCustom,) { }

  ngOnInit() {
    this.goalForm = this.formBuilder.group({
      //goal
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
     ratingone: ['', Validators.required],
      ratingtwo: ['', Validators.required],
      ratingthree: ['', Validators.required],
      ratingfour: ['', Validators.required],
      ratingfive: ['', Validators.required],
      ratingsix: ['', Validators.required],
      ratingseven: ['', Validators.required],
      ratingeight: ['', Validators.required],
      ratingnine: ['', Validators.required],
      ratingten: ['', Validators.required],
      ratingeleven: ['', Validators.required],
      ratingtwelve: ['', Validators.required],
        // comments
        Commentone: ['', Validators.required],
        Commenttwo: ['', Validators.required],
        Commentthree: ['', Validators.required],
        Commentfour: ['', Validators.required],
        Commentfive: ['', Validators.required],
        Commentsix: ['', Validators.required],
        Commentseven: ['', Validators.required],
        Commenteight: ['', Validators.required],
        Commentnine: ['', Validators.required],
        Commentten: ['', Validators.required],
        Commenteleven: ['', Validators.required],
        Commenttwelve: ['', Validators.required],
        // mangaer rating
        managerratingone: ['', Validators.required],
        managerratingtwo: ['', Validators.required],
        managerratingthree: ['', Validators.required],
        managerratingfour: ['', Validators.required],
        managerratingfive: ['', Validators.required],
        managerratingsix: ['', Validators.required],
        managerratingseven: ['', Validators.required],
        managerratingeight: ['', Validators.required],
        managerratingnine: ['', Validators.required],
        managerratingten: ['', Validators.required],
        managerratingeleven: ['', Validators.required],
        managerratingtwelve: ['', Validators.required],
        // manager comments
         // comments
         managerCommentone: ['', Validators.required],
         managerCommenttwo: ['', Validators.required],
         managerCommentthree: ['', Validators.required],
         managerCommentfour: ['', Validators.required],
         managerCommentfive: ['', Validators.required],
         managerCommentsix: ['', Validators.required],
         managerCommentseven: ['', Validators.required],
         managerCommenteight: ['', Validators.required],
         managerCommentnine: ['', Validators.required],
         managerCommentten: ['', Validators.required],
         managerCommenteleven: ['', Validators.required],
         managerCommenttwelve: ['', Validators.required],


    });
    debugger   
    this.goalForm.reset();   
  var loginby=  localStorage.getItem(this._global.login_by) 
  //  if(loginby=="employee"){
  //   this.disablegoal();
  //   this.disablemanagerratingandcomments();
  // }
  var idval= this.router.snapshot.queryParamMap.get('id');  
  if(idval!=null){
 this.GetemployeeDetails(idval);
this.Getgoalemployee(idval);
// disable goal for hr view
  this.disablegoal();
  this.disableratingitselfandcomments();
  this.disablemanagerratingandcomments();
  }
  
  else{
    // disable rating for manager
 // 
  if(loginby=="employee"){
    this.disablegoal();
    this.disablemanagerratingandcomments();
  }
  else{
    this.disableratingitselfandcomments();
    this.disablemanagerratingandcomments();
  }
   
    
    this.personaldata();    
    var data= this._sessionStorage.GetLoggedInUserInfo();
    const id=data.id;
   this.Getgoalemployee(id);
   
  }
  
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
  var manageraating= this.goalForm.controls.managerratingone.value;
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

    // var comments1 = this.goalForm.controls.Commentone.value;
    // var comments2 = this.goalForm.controls.Commenttwo.value;
    // var comments3 = this.goalForm.controls.Commentthree.value;
    // var comments4 = this.goalForm.controls.Commentfour.value;
    // var comments5 = this.goalForm.controls.Commentfive.value;
    // var comments6 = this.goalForm.controls.Commentsix.value;
    // var comments7 = this.goalForm.controls.Commentseven.value;
    // var comments8 = this.goalForm.controls.Commenteight.value;
    // var comments9 = this.goalForm.controls.Commentnine.value;
    // var comments10 = this.goalForm.controls.Commentten.value;
    // var comments11 = this.goalForm.controls.Commenteleven.value;
    // var comments12 = this.goalForm.controls.Commenttwelve.value;
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
      this._toasterService.SuccessSnackBarRightBottom(`${this._global.TOAST_Appraisal_goal_set} `);
      this._router.navigate([this._global.ROUTE_APPRAISAL_MANAGER_PAGE]);    
    }
     
    });

  }

  disablegoal(){
    this.goalForm.controls.goalone.disable();
    this.goalForm.controls.goaltwo.disable();
    this.goalForm.controls.goalthree.disable();
    this.goalForm.controls.goalFour.disable();
    this.goalForm.controls.goalFive.disable();
    this.goalForm.controls.goalSix.disable();
    this.goalForm.controls.goalseven.disable();
    this.goalForm.controls.goaleight.disable();
    this.goalForm.controls.goalnine.disable();
    this.goalForm.controls.goalten.disable();
    this.goalForm.controls.goaleleven.disable();
    this.goalForm.controls.goaltwelve.disable();
  }

  disableratingitselfandcomments(){
    this.goalForm.controls.ratingone.disable();
    this.goalForm.controls.ratingtwo.disable();
    this.goalForm.controls.ratingthree.disable();
    this.goalForm.controls.ratingfour.disable();
    this.goalForm.controls.ratingfive.disable();
    this.goalForm.controls.ratingsix.disable();
    this.goalForm.controls.ratingseven.disable();
    this.goalForm.controls.ratingeight.disable();
    this.goalForm.controls.ratingnine.disable();
    this.goalForm.controls.ratingten.disable();
    this.goalForm.controls.ratingeleven.disable();
    this.goalForm.controls.ratingtwelve.disable();

    this.goalForm.controls.Commentone.disable();
    this.goalForm.controls.Commenttwo.disable();
    this.goalForm.controls.Commentthree.disable();
    this.goalForm.controls.Commentfour.disable();
    this.goalForm.controls.Commentfive.disable();
    this.goalForm.controls.Commentsix.disable();
    this.goalForm.controls.Commentseven.disable();
    this.goalForm.controls.Commenteight.disable();
    this.goalForm.controls.Commentnine.disable();
    this.goalForm.controls.Commentten.disable();
    this.goalForm.controls.Commenteleven.disable();
    this.goalForm.controls.Commenttwelve.disable();

  }



  disablemanagerratingandcomments(){
    
    this.goalForm.controls.managerratingone.disable();
    this.goalForm.controls.managerratingtwo.disable();
    this.goalForm.controls.managerratingthree.disable();
    this.goalForm.controls.managerratingfour.disable();
    this.goalForm.controls.managerratingfive.disable();
    this.goalForm.controls.managerratingsix.disable();
    this.goalForm.controls.managerratingseven.disable();
    this.goalForm.controls.managerratingeight.disable();
    this.goalForm.controls.managerratingnine.disable();
    this.goalForm.controls.managerratingten.disable();
    this.goalForm.controls.managerratingeleven.disable();
    this.goalForm.controls.managerratingtwelve.disable();

    this.goalForm.controls.managerCommentone.disable();
    this.goalForm.controls.managerCommenttwo.disable();
    this.goalForm.controls.managerCommentthree.disable();
    this.goalForm.controls.managerCommentfour.disable();
    this.goalForm.controls.managerCommentfive.disable();
    this.goalForm.controls.managerCommentsix.disable();
    this.goalForm.controls.managerCommentseven.disable();
    this.goalForm.controls.managerCommenteight.disable();
    this.goalForm.controls.managerCommentnine.disable();
    this.goalForm.controls.managerCommentten.disable();
    this.goalForm.controls.managerCommenteleven.disable();
    this.goalForm.controls.managerCommenttwelve.disable();
  }
}
