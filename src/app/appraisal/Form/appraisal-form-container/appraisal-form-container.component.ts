import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { SessionStorageService } from '../../Service/session-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppraisalFormService } from '../../Service/appraisal-form.service';
import { Global } from 'src/app/global';
import { AppraisalEmpRes, AppraisalEmpGoalRes, EmpDetailRes, AppraisalEmpformdetailRes } from '../../Model/Response/appraisal-employee-list-res';
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
  ratingone: string;
  ratingtwo: string;
  ratingthree: string;
  ratingfour: string;
  ratingfive:string;
  ratingsix: string;
  ratingseven: string;
  ratingeight:string;
  ratingnine:string;
  ratingten:string;
  ratingeleven: string;
  ratingtwelve:string;
  ambitions:string;
  Commentone: string;
  Commenttwo: string;
  Commentthree: string;
  Commentfour: string;
  Commentfive:string;
  Commentsix: string;
  Commentseven: string;
  Commenteight:string;
  Commentnine:string;
  Commentten:string;
  Commenteleven: string;
  Commenttwelve:string;
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
  ButtonToogle: boolean;
  summarizecommenttwo:string;
  summarizecommentthree:string;
  summarizecommentone:string;
  submitted = false;
  Goaldataupdate: Array<{ pid:number,id:number,RatingSelf:string,CommentSelf:string}> = [];
 employeegoal: Array<{ description: string,id:number,departmentHead:string}> = [];
 editemployeegoal: Array<{ description: string,id:number,departmentHead:string,pid:number}> = [];
 Goalemployeeambitionsummary: Array<{ id:number,AmbitionsJobExpectations :string, ActionPlanImprovementSelf :string,SummarizeOverallPerformanceSelf :string, AreasImprovementSelf :string,isActive:boolean}> = [];
 //EditGoaldataupdate: Array<{ pid:number,id:number,RatingSelf:string,CommentSelf:string}> = [];
 EditGoalemployeeambitionsummary: Array<{ id:number,AmbitionsJobExpectations :string, ActionPlanImprovementSelf :string,SummarizeOverallPerformanceSelf :string,AreasImprovementSelf :string,isActive:boolean,pid:number}> = [];
  ambitionspid: any;
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
         // behavior rating by manager
         behaviourratingone: ['', Validators.required],
         behaviourratingtwo: ['', Validators.required],
         behaviourratingthree: ['', Validators.required],
         behaviourratingfour: ['', Validators.required],
         behaviourratingfive: ['', Validators.required],

         // behavior comments by manager
          behaviourCommentone: ['', Validators.required],
          behaviourCommenttwo: ['', Validators.required],
          behaviourCommentthree: ['', Validators.required],
          behaviourCommentfour: ['', Validators.required],
          behaviourCommentfive: ['', Validators.required],

          //ambitions
          ambitions: ['', Validators.required],
          //summary
          summarizecommentone: ['', Validators.required],
          summarizecommenttwo: ['', Validators.required],
          summarizecommentthree: ['', Validators.required],
          summarizemanagercommentone: ['', Validators.required],
          summarizemanagercommenttwo: ['', Validators.required],
          summarizemanagercommentthree: ['', Validators.required],
          //closure
          closuremanagercommentone: ['', Validators.required],
          closuremanagercommenttwo: ['', Validators.required],
          closurehrcommentone: ['', Validators.required],
          closurehrcommenttwo: ['', Validators.required],
          closuremanagementcommentone: ['', Validators.required],
          closuremanagementcommenttwo: ['', Validators.required],
    });
    debugger   
    
  var idval= this.router.snapshot.queryParamMap.get('id');  

  localStorage.setItem('empid', idval);
  if(idval!=null){
    debugger
   
   this.GetemployeeDetails(idval);
    //  this.Getgoalemployee(idval);
   this.GetemployeeformDetail(idval);
  
 
 
  this.disablegoal();
  this.disableBehaviourratingandcomments();
  this.disablemanagerratingandcomments();
    this.disablemanagerSummary(); 
    this.disableclosure();
  }
  
  else{
 

    this.personaldata();    

  }
  
  }
  get goalsettingform() { return this.goalForm.controls; }
  personaldata(){
    debugger
    
    var data = this._sessionStorage.GetUserdetailInfo();
    this.FullName = data.fullName;
   this.doj = data.doj;
   this.grade = data.grade;
   this.designation = data.designation;
   this.department = data.department;
   this.reportingTo = data.managerName;    
   if(data.id !=null) 
   {
  //this.Getgoalemployee(data.id);
   }
   else
   {
    var dataval= this._sessionStorage.GetLoggedInUserInfo();
  //  this.Getgoalemployee(dataval.id);
   }
  }



  GetemployeeformDetail(id: any){
    debugger
   
    const subs = this.appraisalFormService.GetEmployeeformDetailForEdit(id)
    .pipe(catchError(x => {
      this._errorService.LogError(x);
      return throwError(x);
    }))
    .subscribe(
      (data:any) => {
        debugger
      
        
      this.goalone=data._EmployeeRatinglist[0].description;
      this.goaltwo=data._EmployeeRatinglist[1].description;
      this.goalthree=data._EmployeeRatinglist[2].description;
      this.goalFour=data._EmployeeRatinglist[3].description;
      this.goalFive=data._EmployeeRatinglist[4].description;
      this.goalSix=data._EmployeeRatinglist[5].description;
      this.goalseven=data._EmployeeRatinglist[6].description;
      this.goaleight=data._EmployeeRatinglist[7].description;
      this.goalnine=data._EmployeeRatinglist[8].description;
      this.goalten=data._EmployeeRatinglist[9].description;
      this.goaleleven=data._EmployeeRatinglist[10].description;
      this.goaltwelve=data._EmployeeRatinglist[11].description;

      this.pid1=data._EmployeeRatinglist[0].id;
      this.pid2=data._EmployeeRatinglist[1].id;
      this.pid3=data._EmployeeRatinglist[2].id;
      this.pid4=data._EmployeeRatinglist[3].id;
      this.pid5=data._EmployeeRatinglist[4].id;
      this.pid6=data._EmployeeRatinglist[5].id;
      this.pid7=data._EmployeeRatinglist[6].id;
      this.pid8=data._EmployeeRatinglist[7].id;
      this.pid9=data._EmployeeRatinglist[8].id;
      this.pid10=data._EmployeeRatinglist[9].id;
      this.pid11=data._EmployeeRatinglist[10].id;
      this.pid12=data._EmployeeRatinglist[11].id;


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

      this.ratingone=data._EmployeeRatinglist[0].ratings;
      this.ratingtwo=data._EmployeeRatinglist[1].ratings;
      this.ratingthree=data._EmployeeRatinglist[2].ratings;
      this.ratingfour=data._EmployeeRatinglist[3].ratings;
      this.ratingfive=data._EmployeeRatinglist[4].ratings;
      this.ratingsix=data._EmployeeRatinglist[5].ratings;
      this.ratingseven=data._EmployeeRatinglist[6].ratings;
      this.ratingeight=data._EmployeeRatinglist[7].ratings;
      this.ratingnine=data._EmployeeRatinglist[8].ratings;
      this.ratingten=data._EmployeeRatinglist[9].ratings;
      this.ratingeleven=data._EmployeeRatinglist[10].ratings;
      this.ratingtwelve=data._EmployeeRatinglist[11].ratings;

      this.Commentone=data._EmployeeRatinglist[0].comments;
      this.Commenttwo=data._EmployeeRatinglist[1].comments;
      this.Commentthree=data._EmployeeRatinglist[2].comments;
      this.Commentfour=data._EmployeeRatinglist[3].comments;
      this.Commentfive=data._EmployeeRatinglist[4].comments;
      this.Commentsix=data._EmployeeRatinglist[5].comments;
      this.Commentseven=data._EmployeeRatinglist[6].comments;
      this.Commenteight=data._EmployeeRatinglist[7].comments;
      this.Commentnine=data._EmployeeRatinglist[8].comments;
      this.Commentten=data._EmployeeRatinglist[9].comments;
      this.Commenteleven=data._EmployeeRatinglist[10].comments;
      this.Commenttwelve=data._EmployeeRatinglist[11].comments;
      var UserInfo = this._sessionStorage.GetLoggedInUserInfo();
    var userselfAssesmentStatus =UserInfo.selfAssesmentStatus;
  
    //  this.ambitionspid= data._EmployeeAmbitionlist[0].id
      localStorage.setItem('ambitionspid', JSON.stringify( data._EmployeeAmbitionlist[0].id));
  
    
      this.ambitions=data._EmployeeAmbitionlist[0].ambitions;
      this.summarizecommentone=data._EmployeeAmbitionlist[0].summarize;
      this.summarizecommenttwo=data._EmployeeAmbitionlist[0].areaImproveSelf;
      this.summarizecommentthree=data._EmployeeAmbitionlist[0].actionPlanImproveSelf;
 
      }, 
      (error) => {
        this._errorService.LogError(error);
      //  this._spinner.hide();
      });
  }

  GetemployeeDetails(id: any){
 //   debugger
    const subs = this.appraisalFormService.GetEmployeeDetailsById(id)
    .pipe(catchError(x => {
      this._errorService.LogError(x);
      return throwError(x);
    }))
    .subscribe(
     
      (data:EmpDetailRes[]) => {
    //    debugger
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
    this.submitted = true;
    if (this.goalForm.invalid) {
      return;
  }
  

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
    var isedit= localStorage.getItem('isedit');
    this.ambitionspid =localStorage.getItem('ambitionspid')
    if( this.pid1 != null)
  {
// employee Rating and comments saving Code
// var UserInfo = this._sessionStorage.GetLoggedInUserInfo();
// var userleadAssesmentStatus =UserInfo.leadAssesmentStatus;
// var userselfAssesmentStatus =UserInfo.selfAssesmentStatus;
if(this.ambitionspid !=null ){
  // for Edit code
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
  
  var ambitions = this.goalForm.controls.ambitions.value;
  var summarizecommentone = this.goalForm.controls.summarizecommentone.value;
  var summarizecommenttwo = this.goalForm.controls.summarizecommenttwo.value;
  var summarizecommentthree = this.goalForm.controls.summarizecommentthree.value;
  
  const empid= parseInt(localStorage.getItem('empid'));
  // var data = this._sessionStorage.GetUserdetailInfo();
  // const empid =data.id;
  
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
  
  this.EditGoalemployeeambitionsummary.push({id:empid,AmbitionsJobExpectations :ambitions, ActionPlanImprovementSelf :summarizecommentthree,SummarizeOverallPerformanceSelf :summarizecommentone, AreasImprovementSelf :summarizecommenttwo,isActive:true,pid:this.ambitionspid});
  
  
  const body_data = {
  'Goaldataupdate': this.Goaldataupdate,
  'EditGoalemployeeambitionsummary': this.EditGoalemployeeambitionsummary
  };
  
  this.appraisalFormService.EditEmployeegoalformData(body_data).subscribe((Goaldataupdate: any) => {
  if (Goaldataupdate) {
  this._toasterService.SuccessSnackBarRightBottom(`${this._global.TOAST_Appraisal_Update_goal_set} `);
  this._router.navigate([this._global.ROUTE_APPRAISAL_EmployeeviewForm]);
  //this.ButtonToogle=true;
  }
  });
   }
else{


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

var ambitions = this.goalForm.controls.ambitions.value;
var summarizecommentone = this.goalForm.controls.summarizecommentone.value;
var summarizecommenttwo = this.goalForm.controls.summarizecommenttwo.value;
var summarizecommentthree = this.goalForm.controls.summarizecommentthree.value;

const empid= parseInt(localStorage.getItem('empid'));
// var data = this._sessionStorage.GetUserdetailInfo();
// const empid =data.id;

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

this.Goalemployeeambitionsummary.push({id:empid,AmbitionsJobExpectations :ambitions, ActionPlanImprovementSelf :summarizecommentthree,SummarizeOverallPerformanceSelf :summarizecommentone, AreasImprovementSelf :summarizecommenttwo,isActive:true});


const body_data = {
'Goaldataupdate': this.Goaldataupdate,
'Goalemployeeambitionsummary': this.Goalemployeeambitionsummary
};

this.appraisalFormService.UpdateEmployeegoalformData(body_data).subscribe((Goaldataupdate: any) => {
if (Goaldataupdate) {
this._toasterService.SuccessSnackBarRightBottom(`${this._global.TOAST_Appraisal_Update_goal_set} `);
this._router.navigate([this._global.ROUTE_APPRAISAL_EmployeeviewForm]);
//this.ButtonToogle=true;
}
});


}
  }
  }
  Cancelclick(){
    this._router.navigate([this._global.ROUTE_APPRAISAL_EmployeeviewForm]);
  }

 

//   onSubmit() {
//     debugger
//     this.pid1= localStorage.getItem('pid1');
//     this.pid2= localStorage.getItem('pid2');
//     this.pid3=localStorage.getItem('pid3');
//     this.pid4=localStorage.getItem('pid4');
//     this.pid5= localStorage.getItem('pid5');
//     this.pid6=localStorage.getItem('pid6');
//     this.pid7=localStorage.getItem('pid7');
//     this.pid8=localStorage.getItem('pid8');
//     this.pid9= localStorage.getItem('pid9');
//     this.pid10= localStorage.getItem('pid10');
//     this.pid11=localStorage.getItem('pid11');
//     this.pid12=  localStorage.getItem('pid12');
//     var isedit= localStorage.getItem('isedit');
  
//     if(isedit == 'false')
//   {
// // employee Rating and comments saving Code

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

// var ambitions = this.goalForm.controls.ambitions.value;
// var summarizecommentone = this.goalForm.controls.summarizecommentone.value;
// var summarizecommenttwo = this.goalForm.controls.summarizecommenttwo.value;
// var summarizecommentthree = this.goalForm.controls.summarizecommentthree.value;

// const empid= parseInt(localStorage.getItem('empid'));
// // var data = this._sessionStorage.GetUserdetailInfo();
// // const empid =data.id;

// this.Goaldataupdate.push({ pid: this.pid1,id: empid,RatingSelf: rating1,CommentSelf:comments1});
// this.Goaldataupdate.push({ pid: this.pid2,id: empid,RatingSelf: rating2,CommentSelf:comments2});
// this.Goaldataupdate.push({ pid: this.pid3,id: empid,RatingSelf: rating3,CommentSelf:comments3});
// this.Goaldataupdate.push({ pid: this.pid4,id: empid,RatingSelf: rating4,CommentSelf:comments4});
// this.Goaldataupdate.push({ pid: this.pid5,id: empid,RatingSelf: rating5,CommentSelf:comments5});
// this.Goaldataupdate.push({ pid: this.pid6,id: empid,RatingSelf: rating6,CommentSelf:comments6});
// this.Goaldataupdate.push({ pid: this.pid7,id: empid,RatingSelf: rating7,CommentSelf:comments7});
// this.Goaldataupdate.push({pid: this.pid8,id: empid,RatingSelf: rating8,CommentSelf:comments8});
// this.Goaldataupdate.push({ pid: this.pid9,id: empid,RatingSelf: rating9,CommentSelf:comments9});
// this.Goaldataupdate.push({pid: this.pid10,id: empid,RatingSelf: rating10,CommentSelf:comments10});
// this.Goaldataupdate.push({ pid: this.pid11,id: empid,RatingSelf: rating11,CommentSelf:comments11});
// this.Goaldataupdate.push({pid: this.pid12,id: empid,RatingSelf: rating12,CommentSelf:comments12});

// console.log('goal setting array',this.Goaldataupdate);

// this.Goalemployeeambitionsummary.push({id:empid,AmbitionsJobExpectations :ambitions, ActionPlanImprovementSelf :summarizecommentthree,SummarizeOverallPerformanceSelf :summarizecommentone, AreasImprovementSelf :summarizecommenttwo});


// const body_data = {
// 'Goaldataupdate': this.Goaldataupdate,
// 'Goalemployeeambitionsummary': this.Goalemployeeambitionsummary
// };

// this.appraisalFormService.UpdateEmployeegoalformData(body_data).subscribe((Goaldataupdate: any) => {
// if (Goaldataupdate) {
// this._toasterService.SuccessSnackBarRightBottom(`${this._global.TOAST_Appraisal_Update_goal_set} `);
// this._router.navigate([this._global.ROUTE_APPRAISAL_EmployeeviewForm]);
// this.ButtonToogle=true;
// }
// });
//   }
//   else{
    
 
//       // Edit employee  Rating and comments saving Code
      
//           var rating1 = this.goalForm.controls.ratingone.value;
//         var rating2 = this.goalForm.controls.ratingtwo.value;
//         var rating3 = this.goalForm.controls.ratingthree.value;
//         var rating4 = this.goalForm.controls.ratingfour.value;
//         var rating5 = this.goalForm.controls.ratingfive.value;
//         var rating6 = this.goalForm.controls.ratingsix.value;
//         var rating7 = this.goalForm.controls.ratingseven.value;
//         var rating8 = this.goalForm.controls.ratingeight.value;
//         var rating9 = this.goalForm.controls.ratingnine.value;
//         var rating10 = this.goalForm.controls.ratingten.value;
//         var rating11 = this.goalForm.controls.ratingeleven.value;
//         var rating12 = this.goalForm.controls.ratingtwelve.value;
      
//         var comments1 = this.goalForm.controls.Commentone.value;
//         var comments2 = this.goalForm.controls.Commenttwo.value;
//         var comments3 = this.goalForm.controls.Commentthree.value;
//         var comments4 = this.goalForm.controls.Commentfour.value;
//         var comments5 = this.goalForm.controls.Commentfive.value;
//         var comments6 = this.goalForm.controls.Commentsix.value;
//         var comments7 = this.goalForm.controls.Commentseven.value;
//         var comments8 = this.goalForm.controls.Commenteight.value;
//         var comments9 = this.goalForm.controls.Commentnine.value;
//         var comments10 = this.goalForm.controls.Commentten.value;
//         var comments11 = this.goalForm.controls.Commenteleven.value;
//         var comments12 = this.goalForm.controls.Commenttwelve.value;
      
//         var ambitions = this.goalForm.controls.ambitions.value;
//         var summarizecommentone = this.goalForm.controls.summarizecommentone.value;
//         var summarizecommenttwo = this.goalForm.controls.summarizecommenttwo.value;
//         var summarizecommentthree = this.goalForm.controls.summarizecommentthree.value;
      
//        // var data = this._sessionStorage.GetUserdetailInfo();
//         const empid= parseInt(localStorage.getItem('empid'));
//        // const empid =636;
//         this.EditGoaldataupdate.push({ pid: this.pid1,id: empid,RatingSelf: rating1,CommentSelf:comments1});
//         this.EditGoaldataupdate.push({ pid: this.pid2,id: empid,RatingSelf: rating2,CommentSelf:comments2});
//         this.EditGoaldataupdate.push({ pid: this.pid3,id: empid,RatingSelf: rating3,CommentSelf:comments3});
//         this.EditGoaldataupdate.push({ pid: this.pid4,id: empid,RatingSelf: rating4,CommentSelf:comments4});
//         this.EditGoaldataupdate.push({ pid: this.pid5,id: empid,RatingSelf: rating5,CommentSelf:comments5});
//         this.EditGoaldataupdate.push({ pid: this.pid6,id: empid,RatingSelf: rating6,CommentSelf:comments6});
//         this.EditGoaldataupdate.push({ pid: this.pid7,id: empid,RatingSelf: rating7,CommentSelf:comments7});
//         this.EditGoaldataupdate.push({pid: this.pid8,id: empid,RatingSelf: rating8,CommentSelf:comments8});
//         this.EditGoaldataupdate.push({ pid: this.pid9,id: empid,RatingSelf: rating9,CommentSelf:comments9});
//         this.EditGoaldataupdate.push({pid: this.pid10,id: empid,RatingSelf: rating10,CommentSelf:comments10});
//         this.EditGoaldataupdate.push({ pid: this.pid11,id: empid,RatingSelf: rating11,CommentSelf:comments11});
//         this.EditGoaldataupdate.push({pid: this.pid12,id: empid,RatingSelf: rating12,CommentSelf:comments12});
      
//         console.log('goal setting array',this.EditGoaldataupdate);
      
//         this.EditGoalemployeeambitionsummary.push({id:empid,AmbitionsJobExpectations :ambitions, ActionPlanImprovementSelf :summarizecommentthree,SummarizeOverallPerformanceSelf :summarizecommentone, AreasImprovementSelf :summarizecommenttwo});
      
      
//       const body_data = {
//         'EditGoaldataupdate': this.EditGoaldataupdate,
//         'EditGoalemployeeambitionsummary': this.EditGoalemployeeambitionsummary
//       };
//       // if(this.ButtonToogle == false)
//       //   {
//       this.appraisalFormService.EditEmployeegoalformData(body_data).subscribe((EditGoaldataupdate: any) => {
//         if (EditGoaldataupdate) {
//         this._toasterService.SuccessSnackBarRightBottom(`${this._global.TOAST_Appraisal_Update_goal_set} `);
//         this._router.navigate([this._global.ROUTE_APPRAISAL_EmployeeviewForm]);
//       }
//        });
//      }
  
// // if(this.pid1!=null){

    
// // }
// // else{

  


// // }
// //}
// //else{
//   // first goal save by manager
// //   if(this.ButtonToogle == false)
// //   {
// //   var goal1 = this.goalForm.controls.goalone.value;
// //   var goal2 = this.goalForm.controls.goaltwo.value;
// //   var goal3 = this.goalForm.controls.goalthree.value;
// //   var goal4 = this.goalForm.controls.goalFour.value;
// //   var goal5 = this.goalForm.controls.goalFive.value;
// //   var goal6 = this.goalForm.controls.goalSix.value;
// //   var goal7 = this.goalForm.controls.goalseven.value;
// //   var goal8 = this.goalForm.controls.goaleight.value;
// //   var goal9 = this.goalForm.controls.goalnine.value;
// //   var goal10 = this.goalForm.controls.goalten.value;
// //   var goal11 = this.goalForm.controls.goaleleven.value;
// //   var goal12 = this.goalForm.controls.goaltwelve.value;
  

// //   var data = this._sessionStorage.GetUserdetailInfo();
// //  const empid =data.id;
// //  var managerid =data.departmentHead;
// // var manageraating= this.goalForm.controls.managerratingone.value;


 
// //   //my changes
// //     this.employeegoal.push({ description: goal1,id: empid,departmentHead:managerid});
// //   this.employeegoal.push({ description: goal2 ,id: empid,departmentHead:managerid});
// //   this.employeegoal.push({ description: goal3 ,id: empid,departmentHead:managerid});
// //   this.employeegoal.push({ description: goal4 ,id: empid,departmentHead:managerid});
// //   this.employeegoal.push({ description: goal5,id: empid,departmentHead:managerid});
// //   this.employeegoal.push({ description: goal6 ,id: empid,departmentHead:managerid});
// //   this.employeegoal.push({ description: goal7 ,id: empid,departmentHead:managerid});
// //   this.employeegoal.push({ description: goal8 ,id: empid,departmentHead:managerid});
// //   this.employeegoal.push({ description: goal9 ,id: empid,departmentHead:managerid});
// //   this.employeegoal.push({ description: goal10 ,id: empid,departmentHead:managerid});
// //   this.employeegoal.push({ description: goal11,id: empid,departmentHead:managerid });
// //   this.employeegoal.push({ description: goal12 ,id: empid,departmentHead:managerid});
// //   console.log('goal setting array',this.employeegoal);


// // const body_data = {
// //   'employeegoal': this.employeegoal
// // };
// // // first time save api 
// //   this.appraisalFormService.PostgoalformData(body_data).subscribe((employeegoal: any) => {
// //     if (employeegoal) {
// //     this._toasterService.SuccessSnackBarRightBottom(`${this._global.TOAST_Appraisal_goal_set} `);
// //     this._router.navigate([this._global.ROUTE_APPRAISAL_MANAGER_PAGE]);    
// //   }
   
// //   });

// // }
// //  }

//   }

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
//disable behaviour rating and commnent by manager
  disableBehaviourratingandcomments(){
    
    this.goalForm.controls.behaviourratingone.disable();
    this.goalForm.controls.behaviourratingtwo.disable();
    this.goalForm.controls.behaviourratingthree.disable();
    this.goalForm.controls.behaviourratingfour.disable();
    this.goalForm.controls.behaviourratingfive.disable();
    

    this.goalForm.controls.behaviourCommentone.disable();
    this.goalForm.controls.behaviourCommenttwo.disable();
    this.goalForm.controls.behaviourCommentthree.disable();
    this.goalForm.controls.behaviourCommentfour.disable();
    this.goalForm.controls.behaviourCommentfive.disable();
 
  }
//disable ambitions
  disableambitions(){
    this.goalForm.controls.ambitions.disable();
  }
//disable employee Summary comments
  disableemployeeSummary(){
    this.goalForm.controls.summarizecommentone.disable();
    this.goalForm.controls.summarizecommenttwo.disable();
    this.goalForm.controls.summarizecommentthree.disable();
  }
  //disable manager Summary comments
  disablemanagerSummary(){
    this.goalForm.controls.summarizemanagercommentone.disable();
    this.goalForm.controls.summarizemanagercommenttwo.disable();
    this.goalForm.controls.summarizemanagercommentthree.disable();
  }
 //disable manager ,hr and management closure comments
  disableclosure(){
    this.goalForm.controls.closuremanagercommentone.disable();
    this.goalForm.controls.closuremanagercommenttwo.disable();
    this.goalForm.controls.closurehrcommentone.disable();
    this.goalForm.controls.closurehrcommenttwo.disable();
    this.goalForm.controls.closuremanagementcommentone.disable();
    this.goalForm.controls.closuremanagementcommenttwo.disable();
  }
}
