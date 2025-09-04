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
import { IClient } from '../models/icase';
import { MatDialog } from '@angular/material/dialog';
import { AddClientComponent } from '../components/add-client/add-client-component/add-client-component';

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
  constructor(private dialogof: MatDialog) {
    this.natId = '';

    // case form
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

  get estimatedtime() {
    return this.caseForm?.get('estimatedtime');
  }

  get courttype() {
    return this.caseForm?.get('courttype');
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
    return this.caseForm?.get('contract') as FormGroup;
  }
  get showcontract() {
    return this.contract?.get('showcontract');
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
  get poaNumber() {
    return this.poa?.get('poaNumber');
  }
  get poaissueDate() {
    return this.poa?.get('poaissueDate');
  }
  get poaAuthrizedBy() {
    return this.poa?.get('poaAuthrizedBy');
  }
  get poaAttachment() {
    return this.poa?.get('poaAttachment');
  }
  ngOnInit(): void {
    this.addcaseForm = new FormGroup({
      caseForm: new FormGroup({
        subject: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        PartiesToTheCase: new FormControl(1, Validators.required),
        estimatedtime: new FormControl(Date, Validators.required),
        courttype: new FormControl(1, Validators.required),
        AssignedOfficer: new FormControl(1, Validators.required),
        caseNumber: new FormControl(''),
        lawyerOpinion: new FormControl('', [
          Validators.required,
          Validators.minLength(10),
        ]),
      }),
      contract: new FormGroup({
        showcontract: new FormControl(true),
        contractType: new FormControl('', Validators.required),
        totalPrice: new FormControl(0, [
          Validators.required,
          Validators.min(1),
        ]),
        issueDate: new FormControl(''),
        expirationDate: new FormControl(Date, Validators.maxLength(Date.now())),
        downAmount: new FormControl('', [Validators.min(0)]),
        assigned: new FormControl(false),
        contractAttachment: new FormControl(''),
      }),
      poa: new FormGroup({
        poaNumber: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        poaissueDate: new FormControl(Date, [Validators.required]),
        poaAuthrizedBy: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        poaAttachment: new FormControl(null)
      }),
    });
  }

  showPOA: boolean = false;
  selectedContract: number = 1;
  natId: string;

  clients: IClient[] = [
    {
      natId: '1',
      name: 'Abdulaziz',
      address: 'Address',
      phone: '0123456789',
      birth: new Date(),
      countryId: 1,
    },
    {
      natId: '2',
      name: 'Abdulaziz',
      address: 'Address',
      phone: '0123456789',
      birth: new Date(),
      countryId: 1,
    },
    {
      natId: '3',
      name: 'Abdulaziz',
      address: 'Address',
      phone: '0123456789',
      birth: new Date(),
      countryId: 1,
    },
  ];

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.contractAttachment?.setValue(input.files[0]);
    }
  }

  search(natId: string) {
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

  deleteClient(natid: string) {
    this.clients = this.clients.filter((x) => x.natId != natid);
  }
}
