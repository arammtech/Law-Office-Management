import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { clsFormsBuilder } from '../../../../../../core/services/formBuilder/clsforms-builder';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { DialogHeaderComponent } from '../../../../../../shared/components/dialog-header/dialog-header-component/dialog-header-component';

@Component({
  selector: 'app-add-attachment',
  imports: [
    ReactiveFormsModule,
    NgIf,
    MatDialogActions,
    DialogHeaderComponent,
    MatDialogContent,
  ],
  templateUrl: './add-attachment.html',
  styleUrl: './add-attachment.css',
})
export class AddAttachmentDialog {
  addAttachmentForm: FormGroup<IAddAttachmetnForm>;

  constructor(
    private myfb: clsFormsBuilder,
    public dialogRef: MatDialogRef<AddAttachmentDialog>
  ) {
    this.addAttachmentForm = this.myfb.createAddAttachmentForm();
  }
  submit() {
    throw new Error('Method not implemented.');
  }
}

export interface IAddAttachmetnForm {
  name: FormControl<string>;
  attachmentFile: FormControl<string>;
}
