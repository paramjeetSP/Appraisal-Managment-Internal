import { Injectable } from '@angular/core';
import { AppraisalLoginModel } from '../app/appraisal/Model/appraisal-login-model'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _router : Router
  ) { }
  public  login(userInfo: AppraisalLoginModel){
sessionStorage.setItem('UserName',userInfo.UserName);
  }

  public isLoggedIn(){
//debugger
return sessionStorage.getItem('UserName') !== null && sessionStorage.getItem('UserName')!== sessionStorage.getItem('UserName')!== undefined;
  }
public logout(){
  sessionStorage.clear();
}
  }