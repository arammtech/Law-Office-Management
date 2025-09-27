import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { enContractType } from '../../shared/enums/contract-types';
import { enJudgmentSubType, enJudgmentType } from '../../shared/enums/enums';

export interface ICourt {
  courtTypeId: string;
  name: string;
  code: number;
  description: string;
}

export interface IAddCaseForm {
  case: FormGroup<frmAddNewCase>;
  existingClients: FormArray<FormGroup<IExistingClientForm>>;
  newClients: FormArray<FormGroup<INewClientForm>>;
}

export interface frmAddNewCase {
  subject: FormControl<string>;
  clientRequests: FormControl<string>;
  partiesToTheCase: FormControl<string>;
  estimatedTime: FormControl<string>;
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

export interface frmAddContract {
  contractType: FormControl<enContractType>;
  totalPrice: FormControl<number>;
  downAmount: FormControl<number>;
  assigned: FormControl<boolean>;
  contractAttachment: FormControl<File | null>;
  issueDate: FormControl<string>;
  expirationDate: FormControl<string>;
}

export interface IAddSessionForm {
  date: FormControl<string>;
  tasks: FormControl<string>;
  layerId: FormControl<string>;
}

export interface ISessionsRow {
  scheduledAt: Date
  assignedEmployeeName: string;
  createdByEmployeeName: string;
  createdDate: Date;
  courtSessionId: string;
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

export interface IAddPOAForm {
  poaNumber: FormControl<string>;
  poaIssueDate: FormControl<string>;
  poaAuthrizedBy: FormControl<string>;
  poaAttachment: FormControl<File | null>;
}

export interface IAddAttachmetnForm {
  name: FormControl<string>;
  attachmentFile: FormControl<File | null>;
}

export interface IPOARow {
  number: string;
  issueDate: Date;
  creatorName: string;
  createdDate: Date;
  publisherName: string;
}

export interface sessionDetails {
  id: string;
  caseId: string;
  assignedEmployeeId: string;
  assignedEmployeeName: string;
  scheduledAt: Date;
  assignedTasks: string;
  isSessionDateExpired: boolean;
}

export interface ICounty {
  code: string;
  name: string;
}

export interface IEmployeeDetails extends PersonDetails {
  id: string;
  role: string;
  email: string;
}

export interface PersonDetails {
  fullName: string;
  nationalId: string;
  birthDate: Date;
  phone: string;
  address: string;
  countryCode: string;
}



export interface frmAddJudgment {
  number: FormControl<string>;
  type: FormControl<enJudgmentType>;
  subType: FormControl<enJudgmentSubType>;
  issueDate: FormControl<string>;
  file: FormControl<File | null>;
}

export interface IJudgmentRow {
  id:string;
  number:string;
  type:string;
  subType:string;
  issueDate:Date;
  creatorName:string;
  createdDate:string;
  filePath:string;
  caseId: string;
}