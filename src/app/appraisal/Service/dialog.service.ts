import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MatDialogComponent } from '../../shared/mat-dialog/mat-dialog.component';
import { DialogDataForInitiateAppraisalProcess } from '../Model/generic.models';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    public dialog: MatDialog
  ) { }

  OpenDialogForConfirmInitiateProcess(name: DialogDataForInitiateAppraisalProcess): MatDialogRef<MatDialogComponent>  {
    return this.dialog.open(MatDialogComponent, {
      width: '250px',
      data: name
    });
  }
  
}
