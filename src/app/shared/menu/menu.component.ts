import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from '../../appraisal/Service/session-storage.service';
import { Router } from '@angular/router';
import { Global } from 'src/app/global';
import { AuthService } from 'src/app/auth.service';
import { AppraisalFormService } from 'src/app/appraisal/Service/appraisal-form.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  username:string;
  count:string;
  foundRole:boolean=false;
  sections = [];
  constructor(
    private _sessionStorage: SessionStorageService,
    private _router: Router,
    private _global:Global,
    private _authenticationService:AuthService,
    private appraisalFormService:AppraisalFormService
  ) { }

  ngOnInit() {
   // debugger
    var data= this._sessionStorage.GetLoggedInUserInfo();
    const id= data.id;
    if(data.description=="Solution Architect" || data.description=="Manager" ||data.description=="Lead" || data.description=="Architect"){
      this.getleadNotifications(id);
      this.foundRole=true;
    }
    else if(data.description=="HR" || data.description=="HR Executive" ){
      this.gethrNotifications(id);
      this.foundRole=true;
    }
    else{
      this.foundRole=false;
    }
  //  this.gethrNotifications(id);
    //this.getleadNotifications(id);
    
  this.username = data.fullName;
 
  }

  Logout(){
    this._authenticationService.logout();
    this._router.navigate(['/Appraisal']);
    this._sessionStorage.StoreLoggedInUserInfo(null);
   // this._router.navigate(['']);
    localStorage.removeItem(this._global.login_by);
    localStorage.clear();
  }

  getleadNotifications(id:any){
    debugger
    const body_data = {
      'id': id,
    };
    this.appraisalFormService.GetleadNotifiactions(body_data).subscribe((body_data: any) => {
      if (body_data) {
        debugger
    this.count=body_data.length;
     this.sections=body_data;
    }
     
    });
  }

  redirect(id:any){
    debugger
    var data= this._sessionStorage.GetLoggedInUserInfo();
   
    const body_data = {
      'id': id,
    };
    if(data.description=="Solution Architect" || data.description=="Manager" ||data.description=="Lead" || data.description=="Architect"){
      this.appraisalFormService.ReadleadNotifiactions(body_data).subscribe((body_data: any) => {
        if (body_data) {
          debugger
         
          var data= this._sessionStorage.GetLoggedInUserInfo();
          const id= data.id;
          this.getleadNotifications(id);
      } 
      });
    }
    else if(data.description=="HR" || data.description=="HR Executive"){
      this.appraisalFormService.ReadhrNotifications(body_data).subscribe((body_data: any) => {
        if (body_data) {
          debugger
         
          var data= this._sessionStorage.GetLoggedInUserInfo();
          const id= data.id;
          this.gethrNotifications(id);
      } 
      });
    }
    
  }

  gethrNotifications(id:any){
    debugger
    const body_data = {
      'id': id,
    };
    this.appraisalFormService.GethrNotifiactions(body_data).subscribe((body_data: any) => {
      if (body_data) {
        debugger
     this.count=body_data.length;
      this.sections=body_data;
    }
     
    });
  }

}
