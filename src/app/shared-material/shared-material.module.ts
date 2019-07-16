import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { 
  MatInputModule, 
  MatButtonModule, 
  MatProgressSpinnerModule, 
  MatTableModule, 
  MatPaginatorModule, 
  MatSelectModule,
MatSnackBarModule, 
MatDialogModule,
MatDialog} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
  declarations: [],
  imports: [
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule, 
    MatDialogModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule, 
    MatSelectModule, 
    MatSnackBarModule, 
    MatDialogModule
  ]
})
export class SharedMaterialModule { }
