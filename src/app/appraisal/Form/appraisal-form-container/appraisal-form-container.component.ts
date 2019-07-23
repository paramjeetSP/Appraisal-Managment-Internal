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
  pid1:any;
  pid2:any;
  pid3:any;
  pid4:any;
  pid5:any;
  pid6:any;
  pid7:any;
  pid8:any;
  pid9:any;
  pid10:any;
  pid11:any;
  pid12:any;
  Goaldataupdate: Array<{ pid:number,id:number,RatingSelf:string,CommentSelf:string}> = [];
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
    debugger
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
      
      var dataval=data;
    
      this.goalone=dataval[0].description;
      this.goaltwo=dataval[1].description;
      this.goalthree=dataval[2].description;
      this.goalFour=dataval[3].description;
      this.goalFive=dataval[4].description;
      this.goalSix=dataval[5].description;
      this.goalseven=dataval[6].description;
      this.goaleight=dataval[7].description;
      this.goalnine=dataval[8].description;
      this.goalten=dataval[9].description;
      this.goaleleven=dataval[10].description;
      this.goaltwelve=dataval[11].description;
      // primary key id
     
      this.pid1=data[0].id;
      this.pid2=data[1].id;
      this.pid3=data[2].id;
      this.pid4=data[3].id;
      this.pid5=data[4].id;
      this.pid6=data[5].id;
      this.pid7=data[6].id;
      this.pid8=data[7].id;
      this.pid9=data[8].id;
      this.pid10=data[9].id;
      this.pid11=data[10].id;
      this.pid12=data[11].id;
      localStorage.setItem('pid1', JSON.stringify(this.pid1));
      localStorage.setItem('pid2', JSON.stringify(this.pid2));
      localStorage.setItem('pid3', JSON.stringify(this.pid3));
      localStorage.setItem('pid4', JSON.stringify(this.pid4));
      localStorage.setItem('pid5', JSON.stringify(this.pid5));
      localStorage.setItem('pid6', JSON.stringify(this.pid6));
      localStorage.setItem('pid7', JSON.stringify(this.pid7));
      localStorage.setItem('pid8', JSON.stringify(this.pid8));
      localStorage.setItem('pid9', JSON.stringify(this.pid9));
      localStorage.setItem('pid10', JSON.stringify(this.pid10));
      localStorage.setItem('pid11', JSON.stringify(this.pid11));
      localStorage.setItem('pid12', JSON.stringify(this.pid12));
    
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
    this.pid1= localStorage.getItem('pid1');
    this.pid2= localStorage.getItem('pid2');
    this.pid3=localStorage.getItem('pid3');
    this.pid4=localStorage.getItem('pid4');
    this.pid5= localStorage.getItem('pid5');
    this.pid6=localStorage.getItem('pid6');
    this.pid7=localStorage.getItem('pid7');
    this.pid8=localStorage.getItem('pid8');
    this.pid9= localStorage.getItem('pid9');
    this.pid10= localStorage.getItem('pid10');
    this.pid11=localStorage.getItem('pid11');
    this.pid12=  localStorage.getItem('pid12');
if(this.pid1!=null){
    var rating1 = this.goalForm.controls.ratingone.value;
  var rating2 = this.goalForm.controls.ratingtwo.value;
  var rating3 = this.goalForm.controls.ratingthree.value;
  var rating4 = this.goalForm.controls.ratingfour.value;
  var rating5 = this.goalForm.controls.ratingfive.value;
  var rating6 = this.goalForm.controls.ratingsix.value;
  var rating7 = this.goalForm.controls.ratingseven.value;
  var rating8 = this.goalForm.controls.ratingeight.value;
  var rating9 = this.goalForm.controls.ratingnine.value;
  var rating10 = this.goalForm.controls.ratingten.value;
  var rating11 = this.goalForm.controls.ratingeleven.value;
  var rating12 = this.goalForm.controls.ratingtwelve.value;

  var comments1 = this.goalForm.controls.Commentone.value;
  var comments2 = this.goalForm.controls.Commenttwo.value;
  var comments3 = this.goalForm.controls.Commentthree.value;
  var comments4 = this.goalForm.controls.Commentfour.value;
  var comments5 = this.goalForm.controls.Commentfive.value;
  var comments6 = this.goalForm.controls.Commentsix.value;
  var comments7 = this.goalForm.controls.Commentseven.value;
  var comments8 = this.goalForm.controls.Commenteight.value;
  var comments9 = this.goalForm.controls.Commentnine.value;
  var comments10 = this.goalForm.controls.Commentten.value;
  var comments11 = this.goalForm.controls.Commenteleven.value;
  var comments12 = this.goalForm.controls.Commenttwelve.value;

  var data = this._sessionStorage.GetUserdetailInfo();
  const empid =data.id;

  this.Goaldataupdate.push({ pid: this.pid1,id: empid,RatingSelf: rating1,CommentSelf:comments1});
  this.Goaldataupdate.push({ pid: this.pid2,id: empid,RatingSelf: rating2,CommentSelf:comments2});
  this.Goaldataupdate.push({ pid: this.pid3,id: empid,RatingSelf: rating3,CommentSelf:comments3});
  this.Goaldataupdate.push({ pid: this.pid4,id: empid,RatingSelf: rating4,CommentSelf:comments4});
  this.Goaldataupdate.push({ pid: this.pid5,id: empid,RatingSelf: rating5,CommentSelf:comments5});
  this.Goaldataupdate.push({ pid: this.pid6,id: empid,RatingSelf: rating6,CommentSelf:comments6});
  this.Goaldataupdate.push({ pid: this.pid7,id: empid,RatingSelf: rating7,CommentSelf:comments7});
  this.Goaldataupdate.push({pid: this.pid8,id: empid,RatingSelf: rating8,CommentSelf:comments8});
  this.Goaldataupdate.push({ pid: this.pid9,id: empid,RatingSelf: rating9,CommentSelf:comments9});
  this.Goaldataupdate.push({pid: this.pid10,id: empid,RatingSelf: rating10,CommentSelf:comments10});
  this.Goaldataupdate.push({ pid: this.pid11,id: empid,RatingSelf: rating11,CommentSelf:comments11});
  this.Goaldataupdate.push({pid: this.pid12,id: empid,RatingSelf: rating12,CommentSelf:comments12});

  console.log('goal setting array',this.Goaldataupdate);


const body_data = {
  'Goaldataupdate': this.Goaldataupdate
};
this.appraisalFormService.UpdateEmployeegoalformData(body_data).subscribe((Goaldataupdate: any) => {
  if (Goaldataupdate) {
  this._toasterService.SuccessSnackBarRightBottom(`${this._global.TOAST_Appraisal_Update_goal_set} `);
 // this._router.navigate([this._global.ROUTE_APPRAISAL_MANAGER_PAGE]);    
}
 });

}
else{
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
