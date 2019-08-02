import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppraisalEmpRes } from '../Model/Response/appraisal-employee-list-res';
import { Global } from '../../global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppraisalEmpListService {

  constructor(
    private _http: HttpClient,
    private _global: Global
  ) { }

  GetEmployeeListing(): Observable<AppraisalEmpRes[]> {
    const url = `${this._global.API_FULL_URL}GetEmplist`;
    return this._http.get<AppraisalEmpRes[]>(url);
  }

  InitiateApraisalProcess(item: AppraisalEmpRes): Observable<boolean> {
    debugger
    const url = `${this._global.API_FULL_URL}EmployeeGoalSetting`;
    return this._http.post<boolean>(url, { id: item.id, empid: item.emp_Id }, this._global.HTTP_OPTIONS);
  }

  ReInitiateApraisalProcess(item: AppraisalEmpRes): Observable<boolean> {
    debugger
    const url = `${this._global.API_FULL_URL}ReinitiateEmployeeGoal`;
    return this._http.post<boolean>(url, { id: item.id, empid: item.emp_Id }, this._global.HTTP_OPTIONS);
  }
}
