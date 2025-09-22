import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { clsFormsBuilder } from '../../../../../../core/services/formBuilder/clsforms-builder';
import { DialogHeaderComponent } from '../../../../../../shared/components/dialog-header/dialog-header-component/dialog-header-component';

@Component({
  selector: 'app-add-poa',
  imports: [ReactiveFormsModule, NgIf, MatDialogModule, DialogHeaderComponent],
  templateUrl: './add-poa.html',
  styleUrl: './add-poa.css',
})
export class AddPoaDialog {
  addPOAForm: FormGroup<IAddPOAForm>;

  constructor(
    private myfb: clsFormsBuilder,
    public dialogRef: MatDialogRef<AddPoaDialog>
  ) {
    this.addPOAForm = this.myfb.createAddPOAForm();
  }
  submit() {
    throw new Error('Method not implemented.');
  }
}

export interface IAddPOAForm {
  poaNumber: FormControl<string>;
  poaIssueDate: FormControl<Date>;
  poaAuthrizedBy: FormControl<string>;
  poaAttachment: FormControl<string>;
}
