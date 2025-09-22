import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { JsonPipe, NgIf } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ToasterService } from '../../../../../../core/services/toaster-service';
import { clsFormsBuilder } from '../../../../../../core/services/formBuilder/clsforms-builder';
import { IAddContract } from '../../../../../../core/models/requests';
import { ContractService } from '../../../../../../core/services/contract/contract-service';
import { DialogHeaderComponent } from '../../../../../../shared/components/dialog-header/dialog-header-component/dialog-header-component';

@Component({
  selector: 'app-add-contract',
  imports: [
    NgIf,
    JsonPipe,
    ReactiveFormsModule,
    MatDialogModule,
    DialogHeaderComponent,
  ],
  templateUrl: './add-contract.html',
  styleUrl: './add-contract.css',
})
export class AddContractDialog {
  contractForm: FormGroup<IAddContract>;

  constructor(
    private formBuilder: clsFormsBuilder,
    private toastService: ToasterService,
    private contractService: ContractService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    public dialogRef: MatDialogRef<AddContractDialog>
  ) {
    this.contractForm = this.formBuilder.createAddContractForm();
  }

  submit() {
    if (this.contractForm.invalid) this.toastService.error('خطا في الحقول');
    else {
      this.contractService.add(this.contractForm, this.data.caseId).subscribe({
        next: () => {
          this.toastService.success('تم إضافة القضية بنجاح');
          this.dialogRef.close();
        },
        error: (error) => {
          console.log('i am in the error', error);
          this.toastService.error('حدث خطا في اضافة العقد');
          this.dialogRef.close();
        },
      });
    }
  }

  onFileChange(event: any) {
    const myFile: File = event?.target?.files[0] as File;
    console.log('the file: ', myFile);
  }
}
