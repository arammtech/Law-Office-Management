import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { clsFormsBuilder } from '../../../../../../core/services/formBuilder/clsforms-builder';

@Component({
  selector: 'app-add-attachment',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './add-attachment.html',
  styleUrl: './add-attachment.css'
})
export class AddAttachment {
submit() {
throw new Error('Method not implemented.');
}
  addAttachmentForm:FormGroup<IAddAttachmetnForm>;

  constructor(private myfb:clsFormsBuilder) {
    this.addAttachmentForm = this.myfb.createAddAttachmentForm()
  }
}

export interface IAddAttachmetnForm {
  name: FormControl<string>;
  attachmentFile: FormControl<string>;
}
