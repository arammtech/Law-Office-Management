import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  IAddSessionForm,
  IemployeeName,
} from '../../../../../../core/models/requests';
import { clsFormsBuilder } from '../../../../../../core/services/formBuilder/clsforms-builder';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NgIf } from '@angular/common';
import { DialogHeaderComponent } from '../../../../../../shared/components/dialog-header/dialog-header-component/dialog-header-component';

@Component({
  selector: 'app-add-session-dialog',
  imports: [ReactiveFormsModule, MatDialogModule, NgIf, DialogHeaderComponent],
  templateUrl: './add-session-dialog.html',
  styleUrl: './add-session-dialog.css',
})
export class AddSessionDialog {
  submit() {
    throw new Error('Method not implemented.');
  }
  sessionForm: FormGroup<IAddSessionForm>;
  employees: IemployeeName[] = [
    {
      id: '1',
      name: 'عبدالعزيز حسن عبدالله',
    },
  ];
  constructor(
    clsFormBuilder: clsFormsBuilder,
    public dialogRef: MatDialogRef<AddSessionDialog>
  ) {
    this.sessionForm = clsFormBuilder.createAddSessionForm();
  }
}
