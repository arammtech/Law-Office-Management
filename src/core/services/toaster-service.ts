import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  private snackBar = inject(MatSnackBar);

  success(mes:string, lbl:string) {
    this.snackBar.open(mes, lbl, {
      duration: 9000,
      panelClass: ['snackbar-success']
    });
  }

  error(mes:string, lbl:string) {
    this.snackBar.open(mes, lbl, {
      duration: 9000,
      panelClass: ['snackbar-error']
    });
  }
}
