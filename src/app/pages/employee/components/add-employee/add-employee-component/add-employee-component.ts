import { JsonPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogClose } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ICreateEmployee } from '../model/iemployee';
import { CaseService } from '../../../../case/services/case-service';
import { EmployeeService } from '../../../services/employee-service';
import { ErrorResponse } from '../../../../../../core/models/error-response';

@Component({
  selector: 'app-add-employee-component',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, JsonPipe, MatDialogClose, NgIf],
  templateUrl: './add-employee-component.html',
  styleUrl: './add-employee-component.css',
})
export class AddEmployeeComponent implements OnInit {
  constructor(private employeeService: EmployeeService) {}
  employeeForm!: FormGroup;
  showErrors: boolean = false;
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

  get role() {
    return this.employeeForm?.get('role');
  }

  get address() {
    return this.employeeForm?.get('address');
  }

  get countryCode() {
    return this.employeeForm?.get('countryCode');
  }

  ngOnInit(): void {
    this.initEmployee();
  }

  private initEmployee() {
    this.employeeForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      natId: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{10}$/),
      ]),
      countryCode: new FormControl(1, Validators.required),
      birthDate: new FormControl('', Validators.required),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^05\d{8}$/),
      ]),
      address: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      role: new FormControl(1, [Validators.required]),
    });
  }

  submit() {
    // save to backend
    if (this.employeeForm.invalid) {
      this.showErrors = true;
      this.errorToast('خطأ', 'تأكد من ملء الحقول المطلوبة');
      return;
    } else {
      const createEmployeeRequest = this.createEmployeeReuestModel();
      this.employeeService.add(createEmployeeRequest).subscribe({
        error: (res) => {
          this.errorToast('العميلة فشلت', 'حدث خطأ اثناء اضافة الموظف');
        },
        next: (res) => {
          this.successToast('تمت العميلة بنجاح', 'تمت إضافة الموظف بنجاح');
        },
      });
    }
  }

  private createEmployeeReuestModel() : ICreateEmployee {
    return  {
        person: {
          fullName: this.name?.value,
          birthDate: this.birthDate?.value,
          address: this.address?.value,
          nationalId: this.natId?.value,
          phoneNumber: this.phone?.value,
          countryCode: this.countryCode?.value,
        },
        email: this.email?.value,
        role: 'GeneralManager', //this.role?.value,
      };

  }

  errorToast(title: string, msg: string) {
    Swal.fire({
      title: title,
      text: msg,
      icon: 'error',
    });
  }

  successToast(title: string, msg: string) {
    Swal.fire({
      title: title,
      text: msg,
      icon: 'success',
    });
  }
}
