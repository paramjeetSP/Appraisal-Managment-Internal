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
  selector: 'app-appraisal-form-hr',
  templateUrl: './appraisal-form-hr.component.html',
  styleUrls: ['./appraisal-form-hr.component.css']
})
export class AppraisalFormHrComponent implements OnInit {
  
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
    ratingone: string;
  ratingtwo: string;
  ratingthree: string;
  ratingfour: string;
  ratingfive: string;
  ratingsix: string;
  ratingseven: string;
  ratingeight: string;
  ratingnine: string;
  ratingten: string;
  ratingeleven: string;
  ratingtwelve: string;

  Commentone: string;
  Commenttwo: string;
  Commentthree: string;
  Commentfour: string;
  Commentfive: string;
  Commentsix: string;
  Commentseven: string;
  Commenteight: string;
  Commentnine: string;
  Commentten: string;
  Commenteleven: string;
  Commenttwelve: string;
  managerratingone: string;
  managerratingtwo: string;
  managerratingthree: string;
  managerratingfour: string;
  managerratingfive: string;
  managerratingsix: string;
  managerratingseven: string;
  managerratingeight: string;
  managerratingnine: string;
  managerratingten: string;
  managerratingeleven: string;
  managerratingtwelve: string;

  managerCommentone: string;
  managerCommenttwo: string;
  managerCommentthree: string;
  managerCommentfour: string;
  managerCommentfive: string;
  managerCommentsix: string;
  managerCommentseven: string;
  managerCommenteight: string;
  managerCommentnine: string;
  managerCommentten: string;
  managerCommenteleven: string;
  managerCommenttwelve: string;

    // behavior rating by manager
    behaviourratingone: string;
    behaviourratingtwo: string;
    behaviourratingthree: string;
    behaviourratingfour: string;
    behaviourratingfive: string;

     // behavior comments by manager
     behaviourCommentone: string;
     behaviourCommenttwo: string;
     behaviourCommentthree: string;
     behaviourCommentfour: string;
     behaviourCommentfive: string;

   //ambitions
   ambitions: string;
   //summary
   summarizecommentone: string;
   summarizecommenttwo: string;
   summarizecommentthree: string;
   summarizemanagercommentone: string;
   summarizemanagercommenttwo: string;
   summarizemanagercommentthree: string;

   //closure
   closuremanagercommentone: string;
   closuremanagercommenttwo: string;
   closurehrcommentone: string;
   closurehrcommenttwo:string;
   closuremanagementcommentone:string;
   closuremanagementcommenttwo: string;
  ButtonToogle = false;
  Goaldataupdate: Array<{ pid:number,id:number,RatingSelf:string,CommentSelf:string}> = [];
 employeegoal: Array<{ description: string,id:number,departmentHead:string}> = [];
 editemployeegoal: Array<{ description: string,id:number,departmentHead:string,pid:number}> = [];
 Goalemployeeambitionsummary: Array<{ id:number,AmbitionsJobExpectations :string, ActionPlanImprovementSelf :string,SummarizeOverallPerformanceSelf :string; AreasImprovementSelf :string}> = [];
  summarypid1: any;
  submitted = false;
  showsubmitbutton:boolean=true;
  evaluationStartDate: any;
  evaluationEndDate: any;
  cycle: string;
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
   // debugger    
  var hrnotification = localStorage.getItem('hrnotification');
  var idval= this.router.snapshot.queryParamMap.get('id');  
  debugger   
  if(idval!=null && hrnotification=="hrnotification"){
   // debugger   
    this.showsubmitbutton=false;
    this.GetemployeeDetails(idval);
   this.Getgoalemployee(idval);
   this.GetManagerRCDetails(idval);
   // disable goal for hr view
     this.disablegoalall();
     this.ratingitselfandcomments();
     this.disableemployeeSummaryall();
     this.managerratingandcomments();
     this.disableambitionsinfo();
     this.disableBehaviourratingandcomments();
     this.disablemanagerSummaryall();
     this.disableclosure();
     }
 else if(idval!=null){
 this.GetemployeeDetails(idval);
this.Getgoalemployee(idval);
this.GetManagerRCDetails(idval);
// disable goal for hr view
  this.disablegoalall();
  this.ratingitselfandcomments();
  this.disableemployeeSummaryall();
  this.managerratingandcomments();
  this.disableambitionsinfo();
  this.disableBehaviourratingandcomments();
  this.disablemanagerSummaryall();
  this.disableclosureall();
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
    this.Getgoalemployee(data.id);
   }
   else
   {
    var dataval= this._sessionStorage.GetLoggedInUserInfo();
    this.Getgoalemployee(dataval.id);
   }
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
      this.goalone=data[0].description;
      if( this.goalone !=null)
      {    
       // this.ButtonToogle = true;
      }
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
    //debugger
    const subs = this.appraisalFormService.GetEmployeeDetailsById(id)
    .pipe(catchError(x => {
      this._errorService.LogError(x);
      return throwError(x);
    }))
    .subscribe(
     
      (data:any) => {
       // debugger
     /// var dataitem=data[0];
    this.FullName=data.fullName;
    this.doj = data.doj;
    this.grade = data.grade;
    this.designation = data.designation;
    this.department = data.department;
    this.reportingTo = data.reportingTo;  
    this.evaluationStartDate=data.evaluationStartDate;
    this.evaluationEndDate=data.evaluationEndDate;
    this.cycle="November-October"
      }, 
      (error) => {
        this._errorService.LogError(error);
     
      });
  }

  DepartmentSelectedGetData(value: number){
  //  debugger
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

  GetManagerRCDetails(id: any){
    //debugger
    const subs = this.appraisalFormService.GetmanagerRCDetailsById(id)
    .pipe(catchError(x => {
      this._errorService.LogError(x);
      return throwError(x);
    }))
    .subscribe(
      (data:any) => {  
    // this.dataval=data;
    this.goalone=data._ManagerRatinglist[0].description;
    this.goaltwo=data._ManagerRatinglist[1].description;
    this.goalthree=data._ManagerRatinglist[2].description;
    this.goalFour=data._ManagerRatinglist[3].description;
    this.goalFive=data._ManagerRatinglist[4].description;
    this.goalSix=data._ManagerRatinglist[5].description;
    this.goalseven=data._ManagerRatinglist[6].description;
    this.goaleight=data._ManagerRatinglist[7].description;
    this.goalnine=data._ManagerRatinglist[8].description;
    this.goalten=data._ManagerRatinglist[9].description;
    this.goaleleven=data._ManagerRatinglist[10].description;
    this.goaltwelve=data._ManagerRatinglist[11].description;

      this.ratingone =  data._ManagerRatinglist[0].ratings;
      this.ratingtwo = data._ManagerRatinglist[1].ratings;
      this.ratingthree = data._ManagerRatinglist[2].ratings;
      this.ratingfour = data._ManagerRatinglist[3].ratings;
      this.ratingfive = data._ManagerRatinglist[4].ratings;
      this.ratingsix = data._ManagerRatinglist[5].ratings;
      this.ratingseven = data._ManagerRatinglist[6].ratings;
      this.ratingeight = data._ManagerRatinglist[7].ratings;
      this.ratingnine = data._ManagerRatinglist[8].ratings;
      this.ratingten = data._ManagerRatinglist[9].ratings;
      this.ratingeleven =data._ManagerRatinglist[10].ratings;
      this.ratingtwelve = data._ManagerRatinglist[11].ratings;
      
      this.Commentone =data._ManagerRatinglist[0].comments;
      this.Commenttwo = data._ManagerRatinglist[1].comments;
      this.Commentthree = data._ManagerRatinglist[2].comments;
      this.Commentfour = data._ManagerRatinglist[3].comments;
      this.Commentfive = data._ManagerRatinglist[4].comments; 
      this.Commentsix = data._ManagerRatinglist[5].comments;
      this.Commentseven = data._ManagerRatinglist[6].comments;
      this.Commenteight = data._ManagerRatinglist[7].comments;
      this.Commentnine = data._ManagerRatinglist[8].comments;
      this.Commentten = data._ManagerRatinglist[9].comments;
      this.Commenteleven = data._ManagerRatinglist[10].comments;
      this.Commenttwelve = data._ManagerRatinglist[11].comments;


      this.managerratingone =data._ManagerRatinglist[0].ratingManager;
      this.managerratingtwo = data._ManagerRatinglist[1].ratingManager;
      this.managerratingthree = data._ManagerRatinglist[2].ratingManager;
      this.managerratingfour = data._ManagerRatinglist[3].ratingManager;
      this.managerratingfive = data._ManagerRatinglist[4].ratingManager; 
      this.managerratingsix = data._ManagerRatinglist[5].ratingManager;
      this.managerratingseven = data._ManagerRatinglist[6].ratingManager;
      this.managerratingeight = data._ManagerRatinglist[7].ratingManager;
      this.managerratingnine = data._ManagerRatinglist[8].ratingManager;
      this.managerratingten = data._ManagerRatinglist[9].ratingManager;
      this.managerratingeleven = data._ManagerRatinglist[10].ratingManager;
      this.managerratingtwelve = data._ManagerRatinglist[11].ratingManager;

  
      this.managerCommentone =data._ManagerRatinglist[0].commentManager;
      this.managerCommenttwo = data._ManagerRatinglist[1].commentManager;
      this.managerCommentthree = data._ManagerRatinglist[2].commentManager;
      this.managerCommentfour = data._ManagerRatinglist[3].commentManager;
      this.managerCommentfive = data._ManagerRatinglist[4].commentManager; 
      this.managerCommentsix = data._ManagerRatinglist[5].commentManager;
      this.managerCommentseven = data._ManagerRatinglist[6].commentManager;
      this.managerCommenteight = data._ManagerRatinglist[7].commentManager;
      this.managerCommentnine = data._ManagerRatinglist[8].commentManager;
      this.managerCommentten = data._ManagerRatinglist[9].commentManager;
      this.managerCommenteleven = data._ManagerRatinglist[10].commentManager;
      this.managerCommenttwelve = data._ManagerRatinglist[11].commentManager;
     
      this.pid1=data._ManagerRatinglist[0].id;
      this.pid2=data._ManagerRatinglist[1].id;
      this.pid3=data._ManagerRatinglist[2].id;
      this.pid4=data._ManagerRatinglist[3].id;
      this.pid5=data._ManagerRatinglist[4].id;
      this.pid6=data._ManagerRatinglist[5].id;
      this.pid7=data._ManagerRatinglist[6].id;
      this.pid8=data._ManagerRatinglist[7].id;
      this.pid9=data._ManagerRatinglist[8].id;
      this.pid10=data._ManagerRatinglist[9].id;
      this.pid11=data._ManagerRatinglist[10].id;
      this.pid12=data._ManagerRatinglist[11].id;

      this.pid12=data._ManagerRatinglist[11].id;

      this.summarypid1=data._ManagerSummarylist[0].id;
     
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

      localStorage.setItem('summarypid1', JSON.stringify(this.summarypid1));

      this.ambitions = data._ManagerSummarylist[0].ambitions;
      this.summarizecommentone =  data._ManagerSummarylist[0].summarize;
      this.summarizecommenttwo =  data._ManagerSummarylist[0].areaImproveSelf;
      this.summarizecommentthree = data._ManagerSummarylist[0].actionPlanImproveSelf;
      
      this.summarizemanagercommentone =  data._ManagerSummarylist[0].summarizeOverallPerformanceManager;
      this.summarizemanagercommenttwo =  data._ManagerSummarylist[0].areasImprovementManager;
      this.summarizemanagercommentthree = data._ManagerSummarylist[0].actionPlanImprovementManager;  
      
      this.closuremanagercommentone = data._ManagerSummarylist[0].overallRatingManager;  
      this.closuremanagercommenttwo = data._ManagerSummarylist[0].overallRatingManagercomment;  
      this.closurehrcommentone = data._ManagerSummarylist[0].hrfeedback;  
      this.closurehrcommenttwo = data._ManagerSummarylist[0].hrfeedbackcomment;  
      this.closuremanagementcommentone = data._ManagerSummarylist[0].managementFeedback;  
      this.closuremanagementcommenttwo = data._ManagerSummarylist[0].managementFeedbackcomment;  

      this.behaviourratingone = data._ManagerBehaviourRatinglist[0].managerRating;
      this.behaviourratingtwo = data._ManagerBehaviourRatinglist[0].managerRating;
      this.behaviourratingthree = data._ManagerBehaviourRatinglist[0].managerRating;
      this.behaviourratingfour = data._ManagerBehaviourRatinglist[0].managerRating;
      this.behaviourratingfive = data._ManagerBehaviourRatinglist[0].managerRating;
    
      this.behaviourCommentone = data._ManagerBehaviourRatinglist[0].managerComments;
      this.behaviourCommenttwo = data._ManagerBehaviourRatinglist[0].managerComments;
      this.behaviourCommentthree = data._ManagerBehaviourRatinglist[0].managerComments;
      this.behaviourCommentfour = data._ManagerBehaviourRatinglist[0].managerComments;
      this.behaviourCommentfive = data._ManagerBehaviourRatinglist[0].managerComments;
       // behavior comments by manager
   
      }, 
      (error) => {
        this._errorService.LogError(error);
     
      });
  }
  Cancelclick(){
    this._router.navigate([this._global.ROUTE_APPRAISAL_LISTING]);
  }

  GoBack(){
    this._router.navigate([this._global.ROUTE_APPRAISAL_LISTING]);
  }

onSubmit(){
  //debugger
  this.submitted = true;
  if (this.goalForm.invalid) {
    return;
}
  var UserInfo = this._sessionStorage.GetUserdetailInfo();
  var empid =UserInfo.id;
  var summarypid1= localStorage.getItem('summarypid1');
  var closurehrcommentone = this.goalForm.controls.closurehrcommentone.value;
  var closurehrcommenttwo = this.goalForm.controls.closurehrcommenttwo.value;
  var closuremanagementcommentone = this.goalForm.controls.closuremanagementcommentone.value;
  var closuremanagementcommenttwo = this.goalForm.controls.closuremanagementcommenttwo.value;
  const body_data = {
    'id': empid,
    'Hrrating': closurehrcommentone,
    'Hrcomment': closurehrcommenttwo ,
    'Managmentrating':closuremanagementcommentone,
    'Managmentcomment':closuremanagementcommenttwo,
    'pid':summarypid1,
  };
  // first time save api 
    this.appraisalFormService.PosthrFinalSubmitData(body_data).subscribe((body_data: any) => {
      if (body_data) {
      this._toasterService.SuccessSnackBarRightBottom(`${this._global.TOAST_Appraisal_goal_set} `);
      this._router.navigate([this._global.ROUTE_APPRAISAL_LISTING]);    
    }
     
    });
}

  disablegoalall(){
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

  ratingitselfandcomments(){
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



  managerratingandcomments(){
    
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
  disableambitionsinfo(){
    this.goalForm.controls.ambitions.disable();
  }
//disable employee Summary comments
  disableemployeeSummaryall(){
    this.goalForm.controls.summarizecommentone.disable();
    this.goalForm.controls.summarizecommenttwo.disable();
    this.goalForm.controls.summarizecommentthree.disable();
  }
  //disable manager Summary comments
  disablemanagerSummaryall(){
    this.goalForm.controls.summarizemanagercommentone.disable();
    this.goalForm.controls.summarizemanagercommenttwo.disable();
    this.goalForm.controls.summarizemanagercommentthree.disable();
  }
 //disable manager ,hr and management closure comments
  disableclosureall(){
    this.goalForm.controls.closuremanagercommentone.disable();
    this.goalForm.controls.closuremanagercommenttwo.disable();
    // this.goalForm.controls.closurehrcommentone.disable();
    // this.goalForm.controls.closurehrcommenttwo.disable();
    // this.goalForm.controls.closuremanagementcommentone.disable();
    // this.goalForm.controls.closuremanagementcommenttwo.disable();
  }
  disableclosure(){
    this.goalForm.controls.closuremanagercommentone.disable();
    this.goalForm.controls.closuremanagercommenttwo.disable();
    this.goalForm.controls.closurehrcommentone.disable();
    this.goalForm.controls.closurehrcommenttwo.disable();
    this.goalForm.controls.closuremanagementcommentone.disable();
    this.goalForm.controls.closuremanagementcommenttwo.disable();
  }
}
