import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Department } from '../../Model/Response/department';
import { CommonTaskService } from '../../Service/common-task.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ErrorService } from '../../Service/error.service';
import { AppraisalEmpRes } from '../../Model/Response/appraisal-employee-list-res';
@Component({
  selector: 'app-manager-department',
  templateUrl: './manager-department.component.html',
  styleUrls: ['./manager-department.component.css']
})
export class ManagerDepartmentComponent implements OnInit {
  @Input() departments: Department[];
  selectedDepartment:string;
  @Output() departmentSelectionChanged = new EventEmitter<number>();
  constructor(
    private _commonTasks: CommonTaskService,
    private _errorService: ErrorService,
    private _spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
  }

  DepartmentSelected(value: any){
  //  debugger
    console.log(value);
    this.departmentSelectionChanged.emit(value.value);
  }

}
