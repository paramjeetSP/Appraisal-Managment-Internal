import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Department } from '../../Model/Response/department';
import { AppraisalEmpRes } from '../../Model/Response/appraisal-employee-list-res';

@Component({
  selector: 'app-manager-employee-list',
  templateUrl: './manager-employee-list.component.html',
  styleUrls: ['./manager-employee-list.component.css']
})
export class ManagerEmployeeListComponent implements OnInit {
  @Input() employeesOfDepartment: Department[];
  displayedColumns: string[] = ['fullName', 'emp_Code', 'officialEmail', 'appraisalStatus'];
  @Output() viewForm = new EventEmitter<AppraisalEmpRes>();

  constructor() { }

  ngOnInit() {
  }

  ViewFormClicked(employee: AppraisalEmpRes){
    debugger
    this.viewForm.emit(employee);
  }



}
