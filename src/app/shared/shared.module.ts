import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { SnackBarSuccessComponent } from './snack-bar-success/snack-bar-success.component';
import { SnackBarErrorComponent } from './snack-bar-error/snack-bar-error.component';
import { FormsModule } from '@angular/forms';
import { MatDialogComponent } from './mat-dialog/mat-dialog.component';
import { SharedMaterialModule } from '../shared-material/shared-material.module';

@NgModule({
  declarations: [MenuComponent, SnackBarSuccessComponent, SnackBarErrorComponent, MatDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedMaterialModule
  ],
  exports: [MenuComponent, SnackBarSuccessComponent, SnackBarErrorComponent, FormsModule],
  entryComponents: [SnackBarSuccessComponent, SnackBarErrorComponent,MatDialogComponent]
})
export class SharedModule { }
