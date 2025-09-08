import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { JsonPipe, NgIf } from '@angular/common';
import { INewClientForm } from '../../../models/inew-client-form';
import { clsFormsBuilder } from '../../../models/clsforms-builder';

@Component({
  selector: 'app-add-client-component',
  imports: [FormsModule, ReactiveFormsModule, MatDialogModule, NgIf, JsonPipe],
  templateUrl: './add-client-component.html',
  styleUrl: './add-client-component.css',
})
export class AddClientComponent implements OnInit {
  clientForm: FormGroup<INewClientForm>;
  showErrors:boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddClientComponent>,
    private formBuilder: clsFormsBuilder
  ) {
    this.clientForm = this.formBuilder.createNewClientForm();
  }

  ngOnInit(): void {}

  submit() {
    if (this.clientForm.invalid) {
      this.showErrors = true;
      Swal.fire({
        title: 'خطأ',
        text: 'تجقق من الحقول الحمراء',
        icon: 'error',
      });
    } else {
      // const model: INewClientModel = {
      //   address: this.address?.value,
      //   birth: this.birthdate?.value,
      //   name: this.name?.value,
      //   countryCode: 'YE',
      //   phone: this.phone?.value,
      //   natId: this.data?.NatId,
      // };
      // console.log(this.clientForm.get('coutntryCode')?.value);
      // console.log('client');
      // console.log(model);
      // this.dialogRef.close(model as INewClientModel);
    }
  }
}
