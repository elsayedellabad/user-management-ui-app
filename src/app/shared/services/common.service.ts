
import { EventEmitter, Injectable, Output } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
/* eslint-disable */

@Injectable({
  providedIn: 'root',
})
export class CommonService {
 
  constructor(
    private snackBar: MatSnackBar,
  ) {}

  successMessage = (
    message: string,
    durationInSeconds: number = 2,
    verticalPosition: MatSnackBarVerticalPosition = 'top',
    horizontalPosition: MatSnackBarHorizontalPosition = 'right'
  ) => {
    this.snackBarMessage(
      message,
      durationInSeconds,
      verticalPosition,
      horizontalPosition,
      'mat-primary'
    );
  };

  errorMessage = (
    message: string,
    durationInSeconds: number = 2,
    verticalPosition: MatSnackBarVerticalPosition = 'top',
    horizontalPosition: MatSnackBarHorizontalPosition = 'right'
  ) => {
    this.snackBarMessage(
      message,
      durationInSeconds,
      verticalPosition,
      horizontalPosition,
      'mat-warn'
    );
  };

  snackBarMessage = (
    message: string,
    durationInSeconds: number = 2,
    verticalPosition: MatSnackBarVerticalPosition = 'bottom',
    horizontalPosition: MatSnackBarHorizontalPosition = 'center',
    panelClass = 'mat-primary'
  ) => {
    {
      this.snackBar.open(message, '', {
        duration: durationInSeconds * 1000,
        verticalPosition,
        horizontalPosition,
        panelClass: ['mat-toolbar', panelClass],
      });
    }
  };

  
}
