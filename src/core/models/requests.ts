import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface ICourt {
  courtTypeId: string;
  name: string;
  code: number;
  description: string;
}

export interface IAddCaseForm {
  case: FormGroup<ICaseForm>;
  existingClients: FormArray<FormGroup<IExistingClientForm>>;
  newClients: FormArray<FormGroup<INewClientForm>>;
}

export interface ICaseForm {
  subject: FormControl<string>;
  partiesToTheCase: FormControl<number>;
  estimatedTime: FormControl<Date>;
  courtType: FormControl<string>;
  assignedOfficer: FormControl<string>;
  caseNumber: FormControl<string>;
  lawyerOpinion: FormControl<string>;
}

export interface IClientDetails {
  id: string;
  person: FormGroup<IPersonDetails>;
}

export interface IemployeeName {
  id: string;
  name: string;
}

export interface IExistingClientForm {
  Id: FormControl<string>;
  natId: FormControl<string>;
}

export interface INewClientForm {
  person: FormGroup<INewPersonForm>;
}

export interface INewPersonForm {
  name: FormControl<string>;
  natId: FormControl<string>;
  birthDate: FormControl<string>;
  phone: FormControl<string>;
  address: FormControl<string>;
  countryCode: FormControl<string>;
}

export interface IPhone {
  number: string;
  internationalNumber: string;
  nationalNumber: string;
  e164Number: string;
  countryCode: string;
  dialCode: string;
}

export interface IPersonDetails extends INewPersonForm {
  id: FormControl<string>;
}

export interface INewEmployee {
  person: FormGroup<INewPersonForm>;
  email: FormControl<string>;
  role: FormControl<string>;

}
