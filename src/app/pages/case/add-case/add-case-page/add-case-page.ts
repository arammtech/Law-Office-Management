import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '../../../../../shared/components/page header/page-header-component/page-header-component';
import {
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CaseService } from '../../services/case-service';
import { ErrorResponse } from '../../../../../core/models/error-response';
import { IAddCaseForm } from '../models/iadd-case-form';
import { clsFormsBuilder } from '../models/clsforms-builder';
import { ToasterService } from '../../../../../core/services/toaster-service';
import { IExistingClientForm } from '../models/iexisting-client-form';
import { INewClientForm } from '../models/inew-client-form';
import { IemployeeName } from '../models/iemployee-name';
import { ActivatedRoute } from '@angular/router';
import { ICourt } from '../../models/icourt';
import { AddClientComponent } from '../dialogs/add-client/add-client-dialog';

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
export class AddCaseComponent implements OnInit {
  showErrors: boolean = false;
  natId: string;
  addCaseForm: FormGroup<IAddCaseForm>;
  courts!: ICourt[];
  employeeNames!: IemployeeName[];

  constructor(
    private dialogof: MatDialog,
    private caseService: CaseService,
    private formsBuilder: clsFormsBuilder,
    private toasterService: ToasterService,
    private fb: NonNullableFormBuilder,
    private activatedRoute: ActivatedRoute
  ) {
    this.natId = '';
    this.addCaseForm = this.formsBuilder.createAddCasesForm();
  }
  ngOnInit(): void {
    this.handelCourtTypes();
    this.handelEmployeeNames();
  }

  private handelCourtTypes() {
    this.courts = this.activatedRoute.snapshot.data['court'] as ICourt[];
    console.log('court resolver');
  }

  private handelEmployeeNames() {
    this.employeeNames = this.activatedRoute.snapshot.data[
      'employeeNames'
    ] as IemployeeName[];
    console.log('empolyeenames resolver');
  }

  search(natId: string) {
    const isExsit: boolean = this.isClientExsit(natId);
    if (isExsit) {
      this.toasterService.error('العميل بالفعل مضاف في القضية', 'حسنا');
      return;
    } else {
      this.caseService.getClientByNatId(natId).subscribe({
        next: (res) => {
          //will be handeled throw the adappter
          const existingClient = this.fb.group<IExistingClientForm>({
            Id: this.fb.control(res.id),
            natId: this.fb.control(res.person.value.natId!),
          });

          this.addCaseForm.value.existingClients?.push(existingClient?.value);
          return;
        },
        error: (error) => {
          this.dialogof
            .open(AddClientComponent, {
              height: '325x',
              minWidth: '600px',
              data: { NatId: natId },
            })
            .afterClosed()
            .subscribe((result: FormGroup<INewClientForm>) => {
              if (result) {
                if (result instanceof FormGroup) {
                  console.log('abudlaziz');
                }
                this.addCaseForm?.controls.newClients?.push(result);
              }
            });
        },
      });
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
    if (this.addCaseForm.invalid) {
      this.showErrors = true;
      this.toasterService.error('تأكد من ملء جميع الحقول', 'حسنا');
    } else {
      this.caseService.add(this.addCaseForm, isDraft).subscribe({
        next: (res) => {
          this.toasterService.success('تمت إضافة القضية بنجاح', 'حسنا');
          console.log(res);
        },
        error: (res) => {
          this.toasterService.error('خطا في اضافة القضية', 'حسنا');
          console.log(res as ErrorResponse);
        },
      });
    }
  }
}
