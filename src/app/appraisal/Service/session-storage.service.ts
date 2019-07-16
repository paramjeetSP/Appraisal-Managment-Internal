import { Injectable } from '@angular/core';
import { AppraisalLoginResponse } from '../Model/Response/appraisal-login-response';
import { Global } from '../../global';

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
    return JSON.parse(sessionStorage.getItem(this._global.SESSION_LOGGED_IN_USER_INFO)) as AppraisalLoginResponse;
  }
}
