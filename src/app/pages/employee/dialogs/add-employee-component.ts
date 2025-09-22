import { JsonPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogClose, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { EmployeeService } from '../services/employee-service';
import { clsFormsBuilder } from '../../../../core/services/formBuilder/clsforms-builder';
import { INewEmployee } from '../../../../core/models/requests';
import { MatDialogContent } from "../../../../../node_modules/@angular/material/dialog/index";
import { DialogHeaderComponent } from "../../../../shared/components/dialog-header/dialog-header-component/dialog-header-component";

@Component({
  selector: 'app-add-employee-component',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, JsonPipe, MatDialogClose, NgIf, MatDialogModule, DialogHeaderComponent],
  templateUrl: './add-employee-component.html',
  styleUrl: './add-employee-component.css',
})
export class AddEmployeeComponent {
  employeeForm: FormGroup<INewEmployee>;

  constructor(
    private employeeService: EmployeeService,
    private formsBuilder: clsFormsBuilder,
    public dialogRef: MatDialogRef<AddEmployeeComponent>
  ) {
    this.employeeForm = this.formsBuilder.createNewEmployeeForm();
  }
  showErrors: boolean = false;

  submit() {
    // save to backend
    if (this.employeeForm.invalid) {
      this.showErrors = true;
      this.errorToast('خطأ', 'تأكد من ملء الحقول المطلوبة');
      return;
    } else {
      // this.employeeService.add(createEmployeeRequest).subscribe({
      //   error: (res) => {
      //     this.errorToast('العميلة فشلت', 'حدث خطأ اثناء اضافة الموظف');
      //   },
      //   next: (res) => {
      //     this.successToast('تمت العميلة بنجاح', 'تمت إضافة الموظف بنجاح');
      //   },
      // });
    }
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
