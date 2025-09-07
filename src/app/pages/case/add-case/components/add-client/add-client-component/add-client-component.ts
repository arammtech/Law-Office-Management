import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { INewClientModel } from '../../../models/icase';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { JsonPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-add-client-component',
  imports: [FormsModule, ReactiveFormsModule, MatDialogModule, NgIf, JsonPipe],
  templateUrl: './add-client-component.html',
  styleUrl: './add-client-component.css',
})
export class AddClientComponent implements OnInit {
  clientForm!: FormGroup;

  get name() {
    return this.clientForm.get('name');
  }

  get birthdate() {
    return this.clientForm.get('birth');
  }

  get phone() {
    return this.clientForm.get('phone');
  }

  
  get address() {
    return this.clientForm.get('address');
  }

  
  
  get countryCode() {
    return this.clientForm.get('coutntryCode');
  }
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddClientComponent>
  ) {
    this.initClient();
  }

  ngOnInit(): void {}

  submit() {
    if (this.clientForm.invalid) {
      console.log(this.clientForm.errors);
      Swal.fire({
        title: 'خطأ',
        text: 'تجقق من الحقول الحمراء',
        icon: 'error',
      });
    } else {
      const model: INewClientModel = {
        address: this.address?.value,
        birth: this.birthdate?.value,
        name: this.name?.value, 
        countryCode: 'YE',
        phone: this.phone?.value,
        natId: this.data?.NatId
      }
      console.log(this.clientForm.get('coutntryCode')?.value)
      console.log('client')
      console.log(model);
      this.dialogRef.close(model as INewClientModel);
    }
  }

  private initClient() {
    this.clientForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      natId: new FormControl(this.data?.NatId || ''),
      countryCode: new FormControl('YE', Validators.required),
      birth: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required, Validators.pattern('^05\\d{8}$')]),
      address: new FormControl(''),
    });
  }
}
