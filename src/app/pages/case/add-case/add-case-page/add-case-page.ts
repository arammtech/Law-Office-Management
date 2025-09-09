import { Component, model } from '@angular/core';
import { PageHeaderComponent } from '../../../../../shared/components/page header/page-header-component/page-header-component';
import { FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { CaseService } from '../../services/case-service';
import { ErrorResponse } from '../../../../../core/models/error-response';
import { IAddCaseForm } from '../models/iadd-case-form';
import { clsFormsBuilder } from '../models/clsforms-builder';
import { IExistingClientForm } from '../models/iexisting-client-form';
import { AddClientComponent } from '../components/add-client/add-client-component/add-client-component';
import { INewClientForm } from '../models/inew-client-form';
import { INewPersonForm } from '../models/inew-person-form';
import { ToasterService } from '../../../../../core/services/toaster-service';

@Component({
  selector: 'app-add-case-component',
  standalone: true,
  imports: [
    PageHeaderComponent,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    JsonPipe,
  ],
  templateUrl: './add-case-page.html',
  styleUrl: './add-case-page.css',
})
export class AddCaseComponent {
  showErrors: boolean = false;
  natId: string;
  addCaseForm: FormGroup<IAddCaseForm>;

  constructor(
    private dialogof: MatDialog,
    private caseService: CaseService,
    private formsBuilder: clsFormsBuilder,
    private toasterService:ToasterService
  ) {
    this.natId = '';
    this.addCaseForm = this.formsBuilder.createAddCasesForm();
  }

  errorToast(title: string, msg: string) {
    Swal.fire({
      title: title,
      text: msg,
      icon: 'error',
    });
  }

  search(natId: string) {
    const isExsit: boolean = this.isClientExsit(natId);
    if (isExsit) {
      this.errorToast('خطأ', 'العميل بالفعل مضاف في القضية');
      return;
    } else {
      // this.caseService.getClientByNatId(natId).subscribe({
      //   next: (res) => {
      //     //will be handeled throw the adappter
      //     const existingClient = this.fb.group<IExistingClientForm>({
      //       Id: this.fb.control(res.id),
      //       natId: this.fb.control(res.person.value.natId!),
      //     })

      //     this.addCaseForm.value.existingClients?.push(existingClient?.value);
      //     return;
      //   },
      //   error: (error) => {
      //     console.log(`from get cleint ${error as ErrorResponse}`);
      //     this.dialogof
      //       .open(AddClientComponent, {
      //         height: '325x',
      //         minWidth: '600px',
      //         data: { NatId: natId },
      //       })
      //       // .afterClosed()
      //       // .subscribe((result: INewClientForm) => {
      //       //   if (result) {
      //       //     const test =  this.fb.group<INewClientForm>({
      //       //       person: this.fb.group<INewPersonForm>({})
      //       //     })
      //       //     this.addCaseForm?.value?.newClients?.push(result);
      //       //   }
      //       // });
      //   },
      // });
    
        this.dialogof
            .open(AddClientComponent, {
              height: '325x',
              minWidth: '600px',
              data: { NatId: natId },
            })
    }

    return;
  }

  private isClientExsit(natId: string) {
    if (
      this.addCaseForm.value.existingClients?.find((c) => c.natId == natId) !=
      undefined
    )
      return true;
    else
      return (
        this.addCaseForm.value.newClients?.find(
          (c) => c.person?.natId == natId
        ) != undefined
      );
  }

  deleteNewClient(natId: string) {
    this.addCaseForm.value.newClients =
      this.addCaseForm.value.newClients?.filter(
        (x) => x.person?.natId != natId
      );
  }
  deleteExistingClient(natId: string) {
    this.addCaseForm.value.existingClients =
      this.addCaseForm.value.existingClients?.filter((x) => x.natId != natId);
  }

  submit(isDraft: boolean) {
    // if (this.addCaseForm.invalid) {
    //   this.showErrors = true;
    //   this.errorToast('خطأ', 'تأكد من ملء جميع الحقول');
    // } else {
      console.log('in the send part');

      this.caseService.add(this.addCaseForm, isDraft).subscribe({
        next: (res) => {
          this.toasterService.success('تمت إضافة القضية بنجاح', 'حسنا');
          console.log(res);
        },
        error: (res) => {
          this.toasterService.error('تمت إضافة القضية بنجاح', 'حسنا');  
          console.log(res as ErrorResponse);
        },
      });
    // }
  }

  successToast(title: string, msg: string) {
    Swal.fire({
      title: title,
      text: msg,
      icon: 'success',
    });
  }
}
