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
import { IAddAttachmetnForm } from '../../../../../../core/models/requests';

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

    


  onFileChange(event: Event) {
    console.log('enetered the on file change evenet in the attachment');
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
        const file = input.files[0];
      // Set the files in the form control
      this.addAttachmentForm.controls.attachmentFile?.setValue(file);
      // Mark the control as touched and update validity
      this.addAttachmentForm.controls.attachmentFile?.markAsTouched();
      this.addAttachmentForm.controls.attachmentFile?.updateValueAndValidity();
    } else {
      // Clear the form control if no files selected
      this.addAttachmentForm.controls.attachmentFile?.setValue(null);
    }
  }
}
