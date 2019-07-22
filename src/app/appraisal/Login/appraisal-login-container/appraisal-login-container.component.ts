import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroupDirective, NgForm, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AppraisalLoginService } from '../../Service/appraisal-login.service';
import { AppraisalLoginModel } from '../../Model/appraisal-login-model';
import { catchError, tap } from 'rxjs/operators';
import { AppraisalLoginResponse } from '../../Model/Response/appraisal-login-response';
import { throwError } from 'rxjs';
import { ErrorService } from '../../Service/error.service';
import { Router } from '@angular/router';
import { Global } from '../../../global';
import { SessionStorageService } from '../../Service/session-storage.service';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-appraisal-login-container',
  templateUrl: './appraisal-login-container.component.html',
  styleUrls: ['./appraisal-login-container.component.css']
})
export class AppraisalLoginContainerComponent implements OnInit {
  form = new FormGroup({
    uName: new FormControl('', [
      Validators.required,
    ]),
    pass: new FormControl('', [
      Validators.required,
    ])
  });

  get userName(): any { return this.form.get('uName'); }
  get password(): any { return this.form.get('pass'); }

  matcher = new MyErrorStateMatcher();
  submitClicked = false;

  showSpinner = false;
  constructor(
    private _loginService: AppraisalLoginService,
    private _errorService: ErrorService,
    private _router: Router,
    private _global: Global,
    private _sessionStorage: SessionStorageService
  ) { }

  ngOnInit() {
  }

  SubmitLoginDetails() {
    this.submitClicked = true;
    if (!this.userName.valid && !this.password.valid) {// Inputs are not valid
      return;
    }
    this.showSpinner = true;
    const loginBody: AppraisalLoginModel = {
      UserName: this.userName.value,
      Password: this.password.value
    };
    this._loginService.AppraisalLogin(loginBody)
      .pipe(catchError(x => {
        this._errorService.LogError(x);
        return throwError(x);
      }))
      .subscribe((data: AppraisalLoginResponse) => {
        debugger
        // localStorage.setItem('deptID', data.deptID);
        this.showSpinner = false;
        this._sessionStorage.StoreLoggedInUserInfo(data);
        let roleHR = this.RoleHr(data);
        if (roleHR) { // If role is HR then go to listing
          this._router.navigate([this._global.ROUTE_APPRAISAL_LISTING]);
          return;
        }
        debugger
        let roleManager = this.RoleManager(data);
        if (roleManager) { // If role is Manager then go to own department listing
          this._router.navigate([this._global.ROUTE_APPRAISAL_MANAGER_PAGE]);
          return;
        }
        this._router.navigate([this._global.ROUTE_APPRAISAL_FORM]);// Go to your appraisal form
      },
        (error: any) => {
          this._errorService.LogError(error);
          console.log(error);
        });
  }
  RoleManager(data: AppraisalLoginResponse): boolean {
    debugger
    let roles = this._global.ROLES_MANAGER;
    let foundRole = false;
    for (let index = 0; index < roles.length; index++) {
      const element = roles[index];
      let matches = data.description.match(element);
      foundRole = matches !== null ? true : false;
      if(foundRole) break;
    }
    return foundRole;
  }
  RoleHr(data: AppraisalLoginResponse): boolean {
    let roles = this._global.ROLES_HR;
    let foundRole = false;
    roles.map(x => {
      let matches = data.description.match(x);
      foundRole = matches !== null ? true : false;
    });
    return foundRole;
  }

}
