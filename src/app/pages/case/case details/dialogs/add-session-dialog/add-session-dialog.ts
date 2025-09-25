import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  IAddSessionForm,
  IemployeeName,
} from '../../../../../../core/models/requests';
import { clsFormsBuilder } from '../../../../../../core/services/formBuilder/clsforms-builder';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { NgIf } from '@angular/common';
import { DialogHeaderComponent } from '../../../../../../shared/components/dialog-header/dialog-header-component/dialog-header-component';
import { SessionService } from '../../../../../../shared/services/session.service/session-service';
import { ToasterService } from '../../../../../../core/services/toaster-service';
import { EmployeeService } from '../../../../employee/services/employee-service';

@Component({
  selector: 'app-add-session-dialog',
  imports: [ReactiveFormsModule, MatDialogModule, NgIf, DialogHeaderComponent],
  templateUrl: './add-session-dialog.html',
  styleUrl: './add-session-dialog.css',
})
export class AddSessionDialog {
  sessionForm: FormGroup<IAddSessionForm>;
  employees: IemployeeName[] = [];
  constructor(
    clsFormBuilder: clsFormsBuilder,
    private sessionService: SessionService,
    public dialogRef: MatDialogRef<AddSessionDialog>,
    private toastService: ToasterService,
    private employeeService: EmployeeService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.sessionForm = clsFormBuilder.createAddSessionForm();
    this.employeeService.getEmployeeNames().subscribe((data) => {
      this.employees = data;
    });
  }
  submit() {
    this.sessionForm.markAllAsTouched();
    if (!this.sessionForm.invalid) {
      this.sessionService.add(this.sessionForm, this.data.caseId).subscribe({
        next: (response) => {
          this.toastService.success('تم إضافة الجلسة بنجاح');
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.log('Error details:', error);
          this.toastService.error('حدث خطا في اضافة الجلسة');
        },
      });
    }
  }
}
