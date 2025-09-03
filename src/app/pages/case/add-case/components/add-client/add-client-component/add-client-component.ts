import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogRef,
  MatDialogModule
} from '@angular/material/dialog';
import { IClient } from '../../../models/icase';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-add-client-component',
  imports: [FormsModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './add-client-component.html',
  styleUrl: './add-client-component.css',
})
export class AddClientComponent implements OnInit {
  clientForm!: FormGroup;

  get name() {
    return this.clientForm.get('fullname');
  }

  get birthdate() {
    return this.clientForm.get('birthdate');
  }

  get phone() {
    return this.clientForm.get('phone');
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddClientComponent>
  ) {
    this.initClient();
    console.log(data.NatId);
  }

  ngOnInit(): void {}

  submit() {
    if (this.clientForm.invalid)
      Swal.fire({
        title: 'خطأ',
        text: 'تجقق من الحقول الحمراء',
        icon: 'error',
      });
    else {
      this.dialogRef.close(this.clientForm.value as IClient);
    }
  }

  private initClient() {
    this.clientForm = new FormGroup({
      fullname: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      natId: new FormControl(this.data?.NatId || ''),
      countryId: new FormControl(1, [Validators.required]),
      birthdate: new FormControl(null, [Validators.required]),
      phone: new FormControl('', [
        Validators.required,
        // Validators.pattern('^05\d{8}$'),
      ]),
      address: new FormControl(''),
    });
  }
}
