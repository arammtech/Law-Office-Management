import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '../../../../../shared/components/page header/page-header-component/page-header-component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { ICase, IClient } from '../models/icase';
import { MatDialog } from '@angular/material/dialog';
import { AddClientComponent } from '../components/add-client/add-client-component/add-client-component';
import Swal from 'sweetalert2';
import { min } from 'rxjs';
import { IPOA } from '../models/ipoa';
import { IContract } from '../models/icontract';
import { IAddCaseForm } from '../models/iadd-case-form';

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
  addcaseForm!: FormGroup;
  showErrors:boolean = false;
  constructor(private dialogof: MatDialog) {
    this.natId = '';
  }

  get caseForm() {
    return this.addcaseForm?.get('caseForm') as FormGroup;
  }

  get subject() {
    return this.caseForm?.get('subject');
  }

  get PartiesToTheCase() {
    return this.caseForm?.get('PartiesToTheCase');
  }

  get estimatedTime() {
    return this.caseForm?.get('estimatedTime');
  }

  get courtType() {
    return this.caseForm?.get('courtType');
  }

  get AssignedOfficer() {
    return this.caseForm?.get('AssignedOfficer');
  }

  get caseNumber() {
    return this.caseForm?.get('caseNumber');
  }

  get lawyerOpinion() {
    return this.caseForm?.get('lawyerOpinion');
  }

  // Getters for template access
  get contract() {
    return this.addcaseForm?.get('contract') as FormGroup;
  }
  get showContract() {
    return this.contract?.get('showContract');
  }
  get contractType() {
    return this.contract?.get('contractType');
  }
  get totalPrice() {
    return this.contract?.get('totalPrice');
  }
  get issueDate() {
    return this.contract?.get('issueDate');
  }
  get expirationDate() {
    return this.contract?.get('expirationDate');
  }
  get downAmount() {
    return this.contract?.get('downAmount');
  }
  get assigned() {
    return this.contract?.get('assigned');
  }
  get contractAttachment() {
    return this.contract?.get('contractAttachment');
  }
  get poa() {
    return this.addcaseForm?.get('poa') as FormGroup;
  }
  get showPOA() {
    return this.poa?.get('showPOA');
  }
  get poaNumber() {
    return this.poa?.get('poaNumber');
  }
  get poaIssueDate() {
    return this.poa?.get('poaIssueDate');
  }
  get poaAuthrizedBy() {
    return this.poa?.get('poaAuthrizedBy');
  }
  get poaAttachment() {
    return this.poa?.get('poaAttachment');
  }

  get case(): FormGroup<ICase> {
    return new FormGroup<ICase>({
      subject: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(3)],
      }),
      PartiesToTheCase: new FormControl(1, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      estimatedTime: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      courtType: new FormControl(1, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      AssignedOfficer: new FormControl(1, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      caseNumber: new FormControl('', { nonNullable: true }),
      lawyerOpinion: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(10)],
      }),
    });
  }

  // get poa(): FormGroup<IPOA> {
  //   return new FormGroup<IPOA>({
  //     showPOA: new FormControl(false, { nonNullable: true }),
  //     poaNumber: new FormControl('', {
  //       nonNullable: true,
  //       validators: [Validators.required, Validators.minLength(3)],
  //     }),
  //     poaIssueDate: new FormControl('', {
  //       nonNullable: true,
  //       validators: [Validators.required],
  //     }),
  //     poaAuthrizedBy: new FormControl('', {
  //       nonNullable: true,
  //       validators: [Validators.required, Validators.minLength(3)],
  //     }),
  //     poaAttachment: new FormControl('', { nonNullable: true }),
  //   });
  // }

  // get contract(): FormGroup<IContract> {
  //   return new FormGroup<IContract>({
  //     showContract: new FormControl(false, { nonNullable: true }),
  //     contractType: new FormControl(2, {
  //       nonNullable: true,
  //       validators: Validators.required,
  //     }),
  //     totalPrice: new FormControl(0, {
  //       nonNullable: true,
  //       validators: [Validators.required, Validators.min(0)],
  //     }),
  //     issueDate: new FormControl('', {
  //       nonNullable: true,
  //       validators: Validators.required,
  //     }),
  //     expirationDate: new FormControl('', {
  //       nonNullable: true,
  //       validators: Validators.required,
  //     }),
  //     downAmount: new FormControl(0, {
  //       nonNullable: true,
  //       validators: [Validators.max(0)],
  //     }),
  //     assigned: new FormControl(false, { nonNullable: true }),
  //     contractAttachment: new FormControl<File | null>(null),
  //   });
  // }

  ngOnInit(): void {
    this.addcaseForm = new FormGroup({
      caseForm: this.buildCaseForm(),
      contract: this.buildContractForm(),
      poa: this.buildPOAForm(),
    });
  }

  selectedContract: number = 1;
  natId: string;
  clients: IClient[] = [];

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.contractAttachment?.setValue(input.files[0]);
    }
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
    }
    this.dialogof
      .open(AddClientComponent, {
        height: '325x',
        minWidth: '600px',
        data: { NatId: natId },
      })
      .afterClosed()
      .subscribe((result: IClient | undefined) => {
        if (result) {
          this.clients.push(result);
        }
      });
    return;
  }

  private isClientExsit(natId: string) {
    return this.clients.find((c) => c.natId == natId) != undefined;
  }

  deleteClient(natid: string) {
    this.clients = this.clients.filter((x) => x.natId != natid);
  }

  submit() {
    if (this.addcaseForm.invalid) {
      this.showErrors = true;
      this.errorToast('خطأ', 'تأكد من ملء جميع الحقول')
    }
  }

  private buildCaseForm(): FormGroup {
    return new FormGroup({
      subject: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      PartiesToTheCase: new FormControl(1, Validators.required),
      estimatedTime: new FormControl('', Validators.required),
      courtType: new FormControl(1, Validators.required),
      AssignedOfficer: new FormControl(1, Validators.required),
      caseNumber: new FormControl(''),
      lawyerOpinion: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  private buildPOAForm(): FormGroup<IPOA> {
    return new FormGroup<IPOA>({
      showPOA: new FormControl(false, { nonNullable: true }),
      poaNumber: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(3)],
      }),
      poaIssueDate: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      poaAuthrizedBy: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(3)],
      }),
      poaAttachment: new FormControl('', { nonNullable: true }),
    });
  }

  private buildContractForm(): FormGroup<IContract> {
    return new FormGroup<IContract>({
      showContract: new FormControl(false, { nonNullable: true }),
      contractType: new FormControl(2, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      totalPrice: new FormControl(0, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(0)],
      }),
      issueDate: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      expirationDate: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      downAmount: new FormControl(0, {
        nonNullable: true,
        validators: [Validators.max(0)],
      }),
      assigned: new FormControl(false, { nonNullable: true }),
      contractAttachment: new FormControl<File | null>(null),
    });
  }
}
