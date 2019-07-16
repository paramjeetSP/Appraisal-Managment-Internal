import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from '../Model/Response/department';
import { Global } from '../../global';
import { AppraisalEmpRes } from '../Model/Response/appraisal-employee-list-res';

@Injectable({
  providedIn: 'root'
})
export class CommonTaskService {

  constructor(
    private _http: HttpClient,
    private _global: Global
  ) { }

  GetAllDepartments(): Observable<Department[]> {
    const url = `${this._global.API_FULL_URL}GetDepartmentList`;
    return this._http.get<Department[]>(url);
  }

  GetEmployeesByDepartmentId(departmentId: number): Observable<AppraisalEmpRes[]> {
    const url = `${this._global.API_FULL_URL}GetDepartmentEmployeeList`;
    return this._http.post<AppraisalEmpRes[]>(url, { Depid: departmentId }, this._global.HTTP_OPTIONS);
  }
}
