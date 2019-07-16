import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogDataForInitiateAppraisalProcess } from '../../appraisal/Model/generic.models';

@Component({
  selector: 'app-mat-dialog',
  templateUrl: './mat-dialog.component.html',
  styleUrls: ['./mat-dialog.component.css']
})
export class MatDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MatDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataForInitiateAppraisalProcess
  ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.data.wantToSubmit = false;
    this.dialogRef.close();
  }
  OkClicked(){
    debugger
    this.data.wantToSubmit = true;
  }

}
