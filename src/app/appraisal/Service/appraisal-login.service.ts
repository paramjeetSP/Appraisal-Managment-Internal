import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppraisalLoginModel } from '../Model/appraisal-login-model';
import { Global } from '../../global';
import { Observable } from 'rxjs';
import { AppraisalLoginResponse } from '../Model/Response/appraisal-login-response';

@Injectable({
  providedIn: 'root'
})
export class AppraisalLoginService {

  constructor(private _http: HttpClient,
              private _global: Global) { }

  AppraisalLogin(body: AppraisalLoginModel): Observable<AppraisalLoginResponse> {
    const url = `${this._global.API_FULL_URL}loginDetail`;
    return this._http.post<AppraisalLoginResponse>(url, body, this._global.HTTP_OPTIONS);
  }
}
