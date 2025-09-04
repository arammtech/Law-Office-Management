import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogClose } from '@angular/material/dialog';

@Component({
  selector: 'app-add-employee-component',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, JsonPipe, MatDialogClose],
  templateUrl: './add-employee-component.html',
  styleUrl: './add-employee-component.css',
})
export class AddEmployeeComponent implements OnInit {
  employeeForm!: FormGroup;

  get name() {
    return this.employeeForm?.get('name');
  }

  
  get natId() {
    return this.employeeForm?.get('natId');
  }

  get birthDate() {
    return this.employeeForm?.get('birthDate');
  }

  get phone() {
    return this.employeeForm?.get('phone');
  }

  
  get email() {
    return this.employeeForm?.get('email');
  }

  ngOnInit(): void {
    this.initEmployee()
  }

  
  private initEmployee() {
    this.employeeForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      natId: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
      countryId: new FormControl(1, Validators.required),
      birthDate: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^05\d{8}$/)]),
      address: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }
}
