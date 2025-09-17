import { FormGroup, Validators, NonNullableFormBuilder } from '@angular/forms';
import { IAddAttachmetnForm } from '../../../app/pages/case/case details/dialogs/add-attachment/add-attachment';
import { Injectable } from '@angular/core';
import { IAddPOAForm } from '../../../app/pages/case/case details/dialogs/add-poa/add-poa';
import { featureValidator } from '../../../shared/validators/Date/feature-date-validator';
import { minAgeValidator } from '../../../shared/validators/minuimum-date.validator';
import {
  ICaseForm,
  INewClientForm,
  IExistingClientForm,
  INewPersonForm,
  IAddCaseForm,
  INewEmployee,
  IAddContract,
  IAddSessionForm,
} from '../../models/requests';

@Injectable({
  providedIn: 'root',
})
export class clsFormsBuilder {
  createAddAttachmentForm(): FormGroup<IAddAttachmetnForm> {
    return this.fb.group({
      name: this.fb.control(''),
      attachmentFile: this.fb.control(''),
    });
  }
  constructor(private fb: NonNullableFormBuilder) {}

  createCaseForm(): FormGroup<ICaseForm> {
    return this.fb.group({
      subject: this.fb.control('', Validators.required),
      clientRequests: this.fb.control('', Validators.required),
      partiesToTheCase: this.fb.control(1, {
        validators: [Validators.required],
      }),
      estimatedTime: this.fb.control(new Date(), {
        validators: [Validators.required, featureValidator],
      }),
      courtType: this.fb.control(''),
      assignedOfficer: this.fb.control(''),
      caseNumber: this.fb.control(''),
      lawyerOpinion: this.fb.control('', Validators.required),
    });
  }

  createNewClientForm(): FormGroup<INewClientForm> {
    return this.fb.group({
      person: this.createPersonForm(),
    });
  }

  createNewEmployeeForm(): FormGroup<INewEmployee> {
    return this.fb.group({
      person: this.createPersonForm(),
      email: this.fb.control('', {
        validators: [Validators.email, Validators.required],
      }),
      role: this.fb.control('', { validators: [Validators.required] }),
    });
  }

  createExistingClientForm(): FormGroup<IExistingClientForm> {
    return this.fb.group({
      Id: this.fb.control('', { validators: [Validators.required] }),
      natId: this.fb.control('', Validators.required),
    });
  }

  createPersonForm(obj?: INewPersonForm): FormGroup<INewPersonForm> {
    return this.fb.group({
      name: this.fb.control(obj?.name || '', {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      natId: this.fb.control(obj?.natId || '', {
        validators: [Validators.required, Validators.pattern(/^\d{10}/)],
      }),
      birthDate: this.fb.control(obj?.birthDate || '', {
        validators: [Validators.required, minAgeValidator(18)],
      }),
      phone: this.fb.control<string>(obj?.phone || '', {
        validators: [Validators.required, Validators.pattern(/^05\d{8}$/)],
      }),
      address: this.fb.control(obj?.address || '', {
        validators: [Validators.required, Validators.minLength(10)],
      }),
      countryCode: this.fb.control(obj?.countryCode || 'SA', {
        validators: [Validators.required],
      }),
    });
  }

  createAddCasesForm(): FormGroup<IAddCaseForm> {
    return this.fb.group({
      case: this.createCaseForm(),
      existingClients: this.fb.array<FormGroup<IExistingClientForm>>([]),
      newClients: this.fb.array<FormGroup<INewClientForm>>([]),
    });
  }

  createAddContractForm(): FormGroup<IAddContract> {
    return this.fb.group({
      assigned: this.fb.control(false),
      contractType: this.fb.control(1),
      totalPrice: this.fb.control(0, Validators.min(0)),
      downAmount: this.fb.control(0, Validators.min(0)),
      expirationDate: this.fb.control('', Validators.required),
      issueDate: this.fb.control('', Validators.required),
      contractAttachment: this.fb.control<File[] | null>(null, {
        validators: [Validators.required],
      }),
    });
  }

  createAddPOAForm(): FormGroup<IAddPOAForm> {
    return this.fb.group({
      poaNumber: this.fb.control('', { validators: [Validators.required] }),
      poaAuthrizedBy: this.fb.control('', {
        validators: [Validators.required],
      }),
      poaIssueDate: this.fb.control(new Date(), {
        validators: [Validators.required],
      }),
      poaAttachment: this.fb.control(''),
    });
  }

  createAddSessionForm(): FormGroup<IAddSessionForm> {
    return this.fb.group({
      date: this.fb.control(new Date(), Validators.required),
      layerId: this.fb.control('', Validators.required),
      tasks: this.fb.control('', Validators.required),
    });
  }
}
