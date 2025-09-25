import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  IAddSessionForm,
  IemployeeName,
  sessionDetails,
} from '../../../../../../core/models/requests';
import { clsFormsBuilder } from '../../../../../../core/services/formBuilder/clsforms-builder';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { JsonPipe, NgIf } from '@angular/common';
import { DialogHeaderComponent } from '../../../../../../shared/components/dialog-header/dialog-header-component/dialog-header-component';
import { SessionService } from '../../../../../../shared/services/session.service/session-service';
import { ToasterService } from '../../../../../../core/services/toaster-service';
import { EmployeeService } from '../../../../employee/services/employee-service';
import { enDialogMode } from '../../../../../../shared/enums/dialog-mode';
import { ClsHelpers } from '../../../../../../shared/util/helpers/cls-helpers';
import { MatDateFormats } from '@angular/material/core';

@Component({
  selector: 'app-add-session-dialog',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    NgIf,
    DialogHeaderComponent,
    JsonPipe,
  ],
  templateUrl: './add-session-dialog.html',
  styleUrl: './add-session-dialog.css',
})
export class AddSessionDialog {
  sessionForm!: FormGroup<IAddSessionForm>;
  employees: IemployeeName[] = [];
  mode: enDialogMode = enDialogMode.add;
  title: string = '';
  caseId!: string;
  sessionId!: string;
  constructor(
    private clsFormBuilder: clsFormsBuilder,
    private sessionService: SessionService,
    public dialogRef: MatDialogRef<AddSessionDialog>,
    private toastService: ToasterService,
    private employeeService: EmployeeService,
    private helper: ClsHelpers,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.mode = this.data.mode as enDialogMode;
    this.caseId = this.data.caseId;
    this.sessionId = this.data?.sessionId;

    this.initialize();
  }
  submit() {
    this.sessionForm.markAllAsTouched();
    switch (this.mode) {
      case enDialogMode.add:
        {
          if (!this.sessionForm.invalid) {
            this.sessionService.add(this.sessionForm, this.caseId).subscribe({
              next: (response) => {
                this.toastService.success('تم إضافة الجلسة بنجاح');
                this.dialogRef.close();
              },
              error: (error) => {
                console.log('Error details:', error);
                this.toastService.error('حدث خطا في اضافة الجلسة');
              },
            });
          }
        }
        break;

      case enDialogMode.update: {
        if (!this.sessionForm.invalid) {
          this.sessionService
            .update(this.sessionForm, this.caseId, this.sessionId)
            .subscribe({
              next: (response) => {
                this.toastService.success('تم تحديث الجلسة بنجاح');
                this.dialogRef.close();
              },
              error: (error) => {
                console.log('Error details:', error);
                this.toastService.error('حدث خطا في تحديث الجلسة');
                this.dialogRef.close();
              },
            });
        }
      }
    }
  }

  initialize() {
    this.sessionForm = this.clsFormBuilder.createAddSessionForm();
    this.employeeService.getEmployeeNames().subscribe((data) => {
      this.employees = data;
    });
    switch (this.mode) {
      case enDialogMode.add:
        {
          this.title = 'إضافة جلسة جديدة';
        }
        break;

      case enDialogMode.update:
        {
          this.title = 'تعديل الجلسة';
          this.sessionService
            .getSessionsDetails(this.sessionId, this.caseId)
            .subscribe({
              next: (data) => {
                this.sessionForm = this.fillSessionForm(data, this.sessionForm);
              },
              error: (error) => {
                console.log('Error details:', error);
                this.toastService.error('حدث خطا في تحديث الجلسة');
                this.dialogRef.close();
              },
            });
        }
        break;
    }
  }

  private fillSessionForm(
    sessionDetails: sessionDetails,
    sessionForm: FormGroup<IAddSessionForm>
  ): FormGroup<IAddSessionForm> {
    sessionForm.value.date = sessionDetails.scheduledAt.toISOString();
    sessionForm.value.layerId = sessionDetails.assignedEmployeeId;
    sessionForm.value.tasks = sessionDetails.assignedTasks;

    return sessionForm;
  }
}
