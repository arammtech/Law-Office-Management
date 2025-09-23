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
  clientRequests: FormControl<string>;
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

export interface IAddContract {
  contractType: FormControl<number>;
  totalPrice: FormControl<number>;
  downAmount: FormControl<number>;
  assigned: FormControl<boolean>;
  contractAttachment: FormControl<File[] | null>;
  issueDate: FormControl<string>;
  expirationDate: FormControl<string>;
}

export interface IAddSessionForm {
  date: FormControl<Date>;
  tasks: FormControl<string>;
  layerId: FormControl<string>;
}

export interface ISessionsRaw {
  date: string;
  lawyer: string;
}

export interface IListDTO<T> {
  pageIndex: number;
  pageSize: number;
  totalItemsCount: number;
  itemsCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  items: T[];
}

export interface IDraftCaseRow {
  caseId: string;
  stats: string;
  courtName: string;
  subject: string;
}

export interface ICaseRow {
  caseId: string;
  employeeName: string;
  caseSubject: string;
  courtTypeName: string;
  status: string;
  caseNumber: string;
  fileNumber: string;
  createdDate: Date;
}

export interface ICourtDetaills {
  courtTypeId: string;
  name: string;
  code: number;
  description: string;
  years: string[];
}

export interface IEmployeeRow {
  id: string;
  name: string;
  natId: string;
  countryCode: string;
  role: string;
  email: string;
}

export interface IContractRow extends ICommonRow {
  id: string;
  contractNumber: string;
  contractType: string;
  totalAmount: string;
  restAmount: string;
  issueDate: string;
  expirationDate: string;
}

export interface ICommonRow {
  employeeNameCreatedIt: string;
  createdDate: string;
}
