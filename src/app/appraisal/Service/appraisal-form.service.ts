import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AppraisalLoginModel } from '../Model/appraisal-login-model';
import { Global } from '../../global';
import { Observable } from 'rxjs';
import { AppraisalLoginResponse } from '../Model/Response/appraisal-login-response';
import { AppraisalEmpRes, AppraisalEmpGoalRes, EmpDetailRes, AppraisalEmpformdetailRes, AppraisalEmpGoalRatingComments, AppraisalmanagerGoalRatingComments } from '../Model/Response/appraisal-employee-list-res';
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


  PostgoalformData(body_data:any) {
   // debugger
    const url = `${this._global.API_FULL_URL}EmployeeGoalForm`;
   // return this._http.post<AppraisalLoginResponse>(url, body, this._global.HTTP_OPTIONS);
    return this._http.post(url,body_data,httpOptions)
  }

  UpdateEmployeegoalformData(body_data:any) {
  //  debugger
    const url = `${this._global.API_FULL_URL}SaveEmployeeGoalFormRating`;
    return this._http.post(url,body_data,httpOptions)
  }

  
  GetEmployeeGolaById(body:any): Observable<AppraisalEmpGoalRes[]> {
  //  debugger
    const url = `${this._global.API_FULL_URL}GetGoalByEmpId`;
    return this._http.post<AppraisalEmpGoalRes[]>(url, body, this._global.HTTP_OPTIONS);
  }
  PostgoaleditformData(body_data:any){
    const url = `${this._global.API_FULL_URL}EditEmployeeGoalForm`;
    return this._http.post(url,body_data,httpOptions)
  }

  GetEmployeeDetailsById(id: number): Observable<EmpDetailRes[]> {
   // debugger
    const url = `${this._global.API_FULL_URL}GetUserInfoById`;
    return this._http.post<EmpDetailRes[]>(url, { id: id }, this._global.HTTP_OPTIONS);
  }

  GetEmployeeformDetailForEdit(body: any): Observable<AppraisalEmpformdetailRes[]> {
   // debugger
    const url = `${this._global.API_FULL_URL}GetEmployeeRcInfoById`;
    return this._http.post<AppraisalEmpformdetailRes[]>(url, body, this._global.HTTP_OPTIONS);
  }

  EditEmployeegoalformData(body_data:any) {
  //  debugger
    const url = `${this._global.API_FULL_URL}UpdateEmployeeRatingComment`;
    return this._http.post(url,body_data,httpOptions)
  }

  GetEmployeeRCDetailsById(body:any): Observable<AppraisalEmpGoalRatingComments[]> {
  //  debugger
    const url = `${this._global.API_FULL_URL}GetEmployeeRcInfoById`;
    return this._http.post<AppraisalEmpGoalRatingComments[]>(url, body, this._global.HTTP_OPTIONS);
  }

  PostManagerFinalSubmitData(body_data:any) {
   // debugger
    const url = `${this._global.API_FULL_URL}SaveManagerAllRatingComment`;
    return this._http.post(url,body_data,httpOptions)
  }

  GetmanagerRCDetailsById(body:any): Observable<AppraisalmanagerGoalRatingComments[]> {
   //debugger
    const url = `${this._global.API_FULL_URL}GetManagerRcInfoById`;
    return this._http.post<AppraisalmanagerGoalRatingComments[]>(url, body, this._global.HTTP_OPTIONS);
  }

  EditManagerFinalSubmitData(body_data:any) {
  //  debugger
    const url = `${this._global.API_FULL_URL}EditManagerAllRatingComment`;
    return this._http.post(url,body_data,httpOptions)
  }

  PosthrFinalSubmitData(body_data:any) {
    //debugger
    const url = `${this._global.API_FULL_URL}SaveHrFeedbackAndComment`;
    return this._http.post(url,body_data,httpOptions)
  }

  GetleadNotifiactions(body_data: any){
   // debugger
    const url = `${this._global.API_FULL_URL}GetLeadNotification`;
    return this._http.post<any[]>(url, body_data, this._global.HTTP_OPTIONS);
  }

  ReadleadNotifiactions(body_data: any){
  //  debugger
    const url = `${this._global.API_FULL_URL}SaveLeadNotification`;
    return this._http.post<any[]>(url, body_data, this._global.HTTP_OPTIONS);
  }

  
  GethrNotifiactions(body_data: any){
   // debugger
    const url = `${this._global.API_FULL_URL}GetHrNotification`;
    return this._http.post<any[]>(url, body_data, this._global.HTTP_OPTIONS);
  }

  ReadhrNotifications(body_data: any){
  //  debugger
    const url = `${this._global.API_FULL_URL}SaveHrNotification`;
    return this._http.post<any[]>(url, body_data, this._global.HTTP_OPTIONS);
  }
}