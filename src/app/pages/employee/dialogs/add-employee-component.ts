import { JsonPipe, NgIf } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { EmployeeService } from '../services/employee-service';
import { clsFormsBuilder } from '../../../../core/services/formBuilder/clsforms-builder';
import {
  ICounty,
  IEmployeeDetails,
  INewEmployee,
} from '../../../../core/models/requests';
import { MatDialogContent } from '../../../../../node_modules/@angular/material/dialog/index';
import { DialogHeaderComponent } from '../../../../shared/components/dialog-header/dialog-header-component/dialog-header-component';
import { ClsHelpers } from '../../../../shared/util/helpers/cls-helpers';
import { ToasterService } from '../../../../core/services/toaster-service';
import { enDialogMode } from '../../../../shared/enums/dialog-mode';

@Component({
  selector: 'app-add-employee-component',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    JsonPipe,
    MatDialogClose,
    NgIf,
    MatDialogModule,
    DialogHeaderComponent,
  ],
  templateUrl: './add-employee-component.html',
  styleUrl: './add-employee-component.css',
})
export class AddEmployeeComponent {
  employeeForm!: FormGroup<INewEmployee>;
  mode!: enDialogMode;
  countries!: ICounty[];
  title!: string;
  employeeId!: string;
  constructor(
    private employeeService: EmployeeService,
    private formsBuilder: clsFormsBuilder,
    public dialogRef: MatDialogRef<AddEmployeeComponent>,
    private helper: ClsHelpers,
    private toasterService: ToasterService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.mode = this.data.mode as enDialogMode;
    this.employeeId = this.data.employeeId;
    this.initialize();
  }

  submit() {
    this.employeeForm.markAllAsTouched();
    if (!this.employeeForm.invalid) {
      switch (this.mode) {
        case enDialogMode.add:
          {
            this.employeeService.add(this.employeeForm).subscribe({
              next: (res) => {
                this.toasterService.success('تمت إضافة الموظف بنجاح');
                this.dialogRef.close();
              },
              error: (err) => {
                this.toasterService.error('حدث خطأ اثناء اضافة الموظف');
                console.log('error during adding client', err);
              },
            });
          }
          break;

        case enDialogMode.update:
          {
            this.employeeService.update(this.employeeForm, this.employeeId).subscribe({
              next: (res) => {
                this.toasterService.success('تمت تحديث بيانات الموظف بنجاح');
                this.dialogRef.close();
              },
              error: (err) => {
                this.toasterService.error('حدث خطأ اثناء تحديث بيانات الموظف');
                console.log('error during update employee', err);
              },
            });
          }
          break;
      }
    }
  }

  private initialize() {
    this.employeeForm = this.formsBuilder.createNewEmployeeForm();
    this.countries = this.helper.loadCountries();
    switch (this.mode) {
      case enDialogMode.add:
        this.title = 'إضافة موظف جديد';

        break;
      case enDialogMode.update:
        {
          this.title = 'تعديل بيانات الموظف';
          this.employeeService.getById(this.employeeId).subscribe({
            next: (data) => {
              this.employeeForm = this.fillForm(data, this.employeeForm);
            },
            error: (error) => {
              console.log('Error details:', error);
              this.toasterService.error('حدث خطا في تحديث بيانات الموظف');
              this.dialogRef.close();
            },
          });
        }
        break;
    }
  }

  private fillForm(
    employeeDetails: IEmployeeDetails,
    employeeForm: FormGroup<INewEmployee>
  ): FormGroup<INewEmployee> {
    employeeForm.value.email = employeeDetails.email;
    employeeForm.value.role = employeeDetails.role;
    if (employeeForm.value.person) {
      employeeForm.value.person.name = employeeDetails.fullName;
      employeeForm.value.person.address = employeeDetails.address;
      employeeForm.value.person.birthDate =
        employeeDetails.birthDate.toISOString();
      employeeForm.value.person.natId = employeeDetails.nationalId;
      employeeForm.value.person.countryCode = employeeDetails.countryCode;
      employeeForm.value.person.phone = employeeDetails.phone;
    }

    return employeeForm;
  }
}
