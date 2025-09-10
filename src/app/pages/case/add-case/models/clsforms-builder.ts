import { FormGroup, Validators, NonNullableFormBuilder } from '@angular/forms';
import { ICaseForm } from './icase-form';
import { INewClientForm } from './inew-client-form';
import { IExistingClientForm } from './iexisting-client-form';
import { IAddCaseForm } from './iadd-case-form';
import { INewPersonForm } from './inew-person-form';
import { Injectable } from '@angular/core';
import { INewEmployee } from '../../../employee/components/add-employee/model/iemployee';
import { IPhone } from './icourt';
import { minAgeValidator } from '../../../../../shared/validators/minuimum-date.validator';

@Injectable({
  providedIn: 'root',
})
export class clsFormsBuilder {
  constructor(private fb: NonNullableFormBuilder) {}

  createCaseForm(): FormGroup<ICaseForm> {
    return this.fb.group({
      subject: this.fb.control('', Validators.required),
      partiesToTheCase: this.fb.control(1, {
        validators: [Validators.required],
      }),
      estimatedTime: this.fb.control('', { validators: [Validators.required] }),
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
      email: this.fb.control('', {validators: [Validators.email, Validators.required]}),
      role: this.fb.control('', {validators: [Validators.required]}),
    });
  }


  createExistingClientForm(): FormGroup<IExistingClientForm> {
    return this.fb.group({
      Id: this.fb.control('', { validators: [Validators.required] }),
      natId: this.fb.control('', Validators.required),
    });
  }

  createPersonForm(obj?:INewPersonForm): FormGroup<INewPersonForm> {
    return this.fb.group({
      name: this.fb.control(obj?.name || '', {validators: [Validators.required, Validators.minLength(3)]}),
      natId: this.fb.control(obj?.natId || '', {validators: [Validators.required, Validators.pattern(/^\d{10}/)]}),
      birthDate: this.fb.control(obj?.birthDate || '', {validators: [Validators.required, minAgeValidator(18)]}),
      phone: this.fb.control<IPhone>(obj?.phone || {} as IPhone, {validators: [Validators.required, Validators.min(9), Validators.max(15)]}),
      address: this.fb.control(obj?.address || '', {validators: [Validators.required, Validators.minLength(10)]}),
      countryCode: this.fb.control(obj?.countryCode || 'SA', {validators: [Validators.required]}),
    });
  }

  createAddCasesForm(): FormGroup<IAddCaseForm> {
    return this.fb.group({
      case: this.createCaseForm(),
      existingClients: this.fb.array<FormGroup<IExistingClientForm>>([]),
      newClients: this.fb.array<FormGroup<INewClientForm>>([]),
    });
  }
}
