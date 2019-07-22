import { Component, OnInit,ViewChild,Input } from '@angular/core';
import { SessionStorageService } from '../../Service/session-storage.service';
import { Department } from '../../Model/Response/department';

@Component({
  selector: 'app-appraisal-form-personal-data',
  templateUrl: './appraisal-form-personal-data.component.html',
  styleUrls: ['./appraisal-form-personal-data.component.css']
})
export class AppraisalFormPersonalDataComponent implements OnInit {
  // @Input() employeesOfDepartment: Department[];
  // displayedColumns: string[] = ['fullName'];
 FullName: string;
 doj:string;
 grade:string;
 designation:string;
 department:string;
 reportingTo:string;
  
  constructor(
    private _sessionStorage: SessionStorageService
  ) { }

  ngOnInit() {  
    var data= this._sessionStorage.GetUserdetailInfo();
  this.FullName=data.fullName;
  this.doj=data.doj;
  this.grade=data.grade;
  this.designation=data.designation;
  this.department=data.department;
  this.reportingTo=data.managerName;
  }

}
