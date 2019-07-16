import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from '../../appraisal/Service/session-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(
    private _sesstionStorageService: SessionStorageService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  Logout(){
    this._sesstionStorageService.StoreLoggedInUserInfo(null);
    this._router.navigate(['']);
  }

}
