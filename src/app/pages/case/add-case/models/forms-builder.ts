import { FormGroup, Validators, NonNullableFormBuilder } from '@angular/forms';
import { ICaseForm } from './icase-form';
import { INewClientForm } from './inew-client-form';
import { IExistingClientForm } from './iexisting-client-form';
import { IClientForm } from './iclient-form';
import { IAddCaseForm } from './iadd-case-form';
import { INewPersonForm } from './inew-person-form';

export class FormsBuilder {
  constructor(private fb: NonNullableFormBuilder) {}

  createCaseForm(): FormGroup<ICaseForm> {
    return this.fb.group({
      subject: this.fb.control('', Validators.required),
      partiesToTheCase: this.fb.control(0),
      estimatedTime: this.fb.control(''),
      courtType: this.fb.control(0),
      assignedOfficer: this.fb.control(0),
      caseNumber: this.fb.control('', Validators.required),
      lawyerOpinion: this.fb.control(''),
    });
  }

  createNewClientForm(): FormGroup<INewClientForm> {
    return this.fb.group({
      person: this.createPersonForm(),
    });
  }

  createExistingClientForm(): FormGroup<IExistingClientForm> {
    return this.fb.group({
      Id: this.fb.control('', { validators: [Validators.required] }),
      natId: this.fb.control('', Validators.required),
    });
  }

  createPersonForm(): FormGroup<INewPersonForm> {
    return this.fb.group({
      name: this.fb.control(''),
      natId: this.fb.control(''),
      birthDate: this.fb.control(''),
      phone: this.fb.control(''),
      address: this.fb.control(''),
      countryCode: this.fb.control(''),
    });
  }

  createClientForm(): FormGroup<IClientForm> {
    return this.fb.group({
      id: this.fb.control(''),
      person: this.createPersonForm(),
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
