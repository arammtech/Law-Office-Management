import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { JsonPipe, NgIf } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ToasterService } from '../../../../../../core/services/toaster-service';
import { clsFormsBuilder } from '../../../../../../core/services/formBuilder/clsforms-builder';

@Component({
  selector: 'app-add-contract',
  imports: [NgIf, JsonPipe, ReactiveFormsModule, MatDialogModule],
  templateUrl: './add-contract.html',
  styleUrl: './add-contract.css',
})
export class AddContract {
  contractForm: FormGroup<IAddContract>;

  constructor(private formBuilder: clsFormsBuilder, private toastService:ToasterService) {
    this.contractForm = this.formBuilder.createAddContractForm();
  }

  submit() {
    if (this.contractForm.invalid)
      this.toastService.error('خطا في الحقول', '')
  }
}

export interface IAddContract {
  contractType: FormControl<number>;
  totalPrice: FormControl<number>;
  downAmount: FormControl<number>;
  assigned: FormControl<boolean>;
  contractAttachment: FormControl<string>;
  issueDate: FormControl<string>;
  expirationDate: FormControl<string>;
}

