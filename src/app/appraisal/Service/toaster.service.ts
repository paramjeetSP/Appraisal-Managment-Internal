import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material';
import { SnackBarSuccessComponent } from 'src/app/shared/snack-bar-success/snack-bar-success.component';
import { SnackBarErrorComponent } from '../../shared/snack-bar-error/snack-bar-error.component';

@Injectable({
  providedIn: 'root'
})
export class ToasterServiceCustom {

  constructor(
    private _toaster: ToastrService,
    private _snackBar: MatSnackBar
  ) { }

  SuccessToasterDefualt(message, title) {
    this._toaster.success(message, title, {
      closeButton: true,
      easing: 'ease-in',
      tapToDismiss: true
    });
  }

  SuccessSnackBarRightBottom(message) {
    this._snackBar.openFromComponent(SnackBarSuccessComponent, {
      data: { msg: `${message}` },
      panelClass: ['sucess-snackbar'],
      verticalPosition: 'bottom',
      horizontalPosition: 'right'
    });
  }
  SuccessSnackBarLeftBottom(message, nameOfPerson) {
    this._snackBar.openFromComponent(SnackBarSuccessComponent, {
      data: { msg: message, name: nameOfPerson },
      panelClass: ['sucess-snackbar'],
      verticalPosition: 'bottom',
      horizontalPosition: 'left'
    });
  }
  ErrorSnackBarRightBottom(message) {
    this._snackBar.openFromComponent(SnackBarErrorComponent, {
      data: { msg: message },
      panelClass: ['error-snackbar'],
      verticalPosition: 'bottom',
      horizontalPosition: 'right'
    });
  }
}
