import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from '../../appraisal/Service/session-storage.service';
import { Router } from '@angular/router';
import { Global } from 'src/app/global';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  username:string;
  constructor(
    private _sessionStorage: SessionStorageService,
    private _router: Router,
    private _global:Global
  ) { }

  ngOnInit() {
    var data= this._sessionStorage.GetLoggedInUserInfo();
  this.username = data.fullName;
  }

  Logout(){
    this._sessionStorage.StoreLoggedInUserInfo(null);
    this._router.navigate(['']);
    localStorage.removeItem(this._global.login_by);
    localStorage.clear();
  }

}
