import { Injectable } from '@angular/core';
import { AppraisalLoginResponse } from '../Model/Response/appraisal-login-response';
import { Global } from '../../global';
import { AppraisalEmpRes } from '../Model/Response/appraisal-employee-list-res';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor(
    private _global: Global
  ) { }

  StoreLoggedInUserInfo(data: AppraisalLoginResponse){
    sessionStorage.setItem(this._global.SESSION_LOGGED_IN_USER_INFO, JSON.stringify(data));
  }

  GetLoggedInUserInfo(): AppraisalLoginResponse{
   //debugger
    return JSON.parse(sessionStorage.getItem(this._global.SESSION_LOGGED_IN_USER_INFO)) as AppraisalLoginResponse;
  }

  StoreUserdetailInfo(employee: AppraisalEmpRes){
    sessionStorage.setItem(this._global.SESSION_USER_INFO, JSON.stringify(employee));
  }

  GetUserdetailInfo(): AppraisalEmpRes{
    return JSON.parse(sessionStorage.getItem(this._global.SESSION_USER_INFO)) as AppraisalEmpRes;
  }
}
