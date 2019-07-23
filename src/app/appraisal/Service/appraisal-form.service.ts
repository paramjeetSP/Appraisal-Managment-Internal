import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AppraisalLoginModel } from '../Model/appraisal-login-model';
import { Global } from '../../global';
import { Observable } from 'rxjs';
import { AppraisalLoginResponse } from '../Model/Response/appraisal-login-response';
import { AppraisalEmpRes, AppraisalEmpGoalRes, EmpDetailRes } from '../Model/Response/appraisal-employee-list-res';
const httpOptions = {
  headers: new HttpHeaders({
     'Content-Type': 'application/json',
  })
}
@Injectable({
  providedIn: 'root'
})
export class AppraisalFormService {

  constructor(private _http: HttpClient,
    private _global: Global) { }


  PostgoalformData(employeegoal:any) {
    debugger
  //  var bodyData = JSON.stringify(employeegoal);
  
    const url = `${this._global.API_FULL_URL}EmployeeGoalForm`;
   // return this._http.post<AppraisalLoginResponse>(url, body, this._global.HTTP_OPTIONS);
    return this._http.post(url,employeegoal,httpOptions)
  }

  UpdateEmployeegoalformData(Goaldataupdate:any) {
    debugger
    const url = `${this._global.API_FULL_URL}SaveEmployeeGoalFormRating`;
    return this._http.post(url,Goaldataupdate,httpOptions)
  }

  GetEmployeeGolaById(id: number): Observable<AppraisalEmpGoalRes[]> {
    debugger
    const url = `${this._global.API_FULL_URL}GetGoalByEmpId`;
    return this._http.post<AppraisalEmpGoalRes[]>(url, { id: id }, this._global.HTTP_OPTIONS);
  }

  GetEmployeeDetailsById(id: number): Observable<EmpDetailRes[]> {
    debugger
    const url = `${this._global.API_FULL_URL}GetUserInfoById`;
    return this._http.post<EmpDetailRes[]>(url, { id: id }, this._global.HTTP_OPTIONS);
  }
}