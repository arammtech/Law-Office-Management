import { FormGroup, NonNullableFormBuilder } from '@angular/forms';
import {
  INewClientForm,
  IClientDetails,
  IemployeeName,
  IAddCaseForm,
  frmAddContract,
  ICourtDetaills,
  ICaseRow,
  IListDTO,
  IContractRow,
  ISessionsRow,
  IAddPOAForm,
  IPOARow,
  IAddAttachmetnForm,
  IAddSessionForm,
  sessionDetails,
  INewPersonForm,
  INewEmployee,
  IEmployeeDetails,
  frmAddJudgment,
  IJudgmentRow,
  frmAddTemplate,
  frmChangePassword,
} from '../../models/requests';
import {
  ICseGeneralDetails,
  ICasesParties,
} from '../../../app/pages/case/case details/components/case-details-component/case-details-component';
import { Injectable } from '@angular/core';
import { IAttachmentRow } from '../../../app/pages/case/case details/components/case-attachments/case-attachments';

@Injectable({ providedIn: 'root' })
export class Adapter {
  frmChangePasswordAdapter(frmChangePassword: FormGroup<frmChangePassword>): any {
    return {
      username: frmChangePassword?.value?.username,
      currentPassword: frmChangePassword?.value?.current,
      newPassword: frmChangePassword?.value?.new,
    }
  }
  judgmentRowAdapter(res: any): IJudgmentRow {
    return {
      createdDate: res.createdDate,
      issueDate: res.issueDate,
      creatorName: res.creatorName,
      number: res.number,
      filePath: res.filePath,
      id: res.id,
      subType: res.subType,
      type: res.type,
      caseId: res.caseId,
    };
  }
  constructor(private fb: NonNullableFormBuilder) {}

  getCaseAttachmentRowAdapter(row: any): IAttachmentRow {
    return {
      id: row?.id ?? '',
      name: row?.name ?? '',
      rasiedDate: row?.rasiedDate ?? '',
      raisedBy: row?.raisedBy ?? '',
      fileSize: row?.fileSize ?? '',
      fileType: row?.fileType ?? '',
      filePath: row?.filePath ?? '',
    };
  }

  toAddAttachmentFormAPI(frmAddAttachment: FormGroup<IAddAttachmetnForm>) {
    const formData = new FormData();
    const { name, attachmentFile } = frmAddAttachment.controls;

    formData.append('name', name.value);
    if (attachmentFile.value) {
      formData.append('file', attachmentFile.value);
    }

    return formData;
  }
  /**
   *
   */
  toAddClientAPI(model: FormGroup<INewClientForm>): any {
    return {
      kind: 'new',
      Client: {
        person: {
          fullName: model.value.person?.name,
          nationalId: model.value.person?.natId,
          birthDate: model.value.person?.birthDate,
          phone: {
            number: model.value.person?.phone,
            code: '+966',
          },
          address: model.value.person?.address,
          countryCode: model.value.person?.countryCode,
        },
      },
    };
  }

  fromClientDetailsAPI(model: any): IClientDetails {
    return {
      id: model.clientId,
      person: this.fb.group({
        id: this.fb.control(model.person.personId),
        name: this.fb.control(model.person.fullName),
        natId: this.fb.control(model.person.nationalId),
        birthDate: this.fb.control(model.person.birthDate),
        phone: this.fb.control(model.person.phoneNumber),
        address: this.fb.control(model.person.address),
        countryCode: this.fb.control(model.person.countryCode),
      }),
    };
  }

  fromCourtDetailsAPI(data: any): ICourtDetaills {
    return {
      courtTypeId: data?.courtTypeId,
      name: data?.name,
      code: data?.code,
      description: data?.description,
      years: ['1447'],
    };
  }

  fromEmployeeNamesAPI(model: any): IemployeeName {
    return {
      id: model.employeeId,
      name: model.fullName,
    };
  }

  getCaseContractRowAdapter(res: any): IContractRow {
    return {
      id: res?.contractId,
      createdDate: res?.createdDate,
      employeeNameCreatedIt: res?.employeeName ?? 'مافي اسم',
      expirationDate: res?.createdDate,
      issueDate: res?.createdDate,
      restAmount: res?.initialPayment,
      totalAmount: res?.totalAmount,
      contractNumber: res?.contractNumber,
      contractType: res?.contractType,
    };
  }
  getCasePOARowAdapter(res: any): IPOARow {
    return {
      number: res.poaNumber,
      createdDate: res.createdDate,
      creatorName: res.employeeCreatedByName,
      publisherName: res.issuingAuthority,
      issueDate: res.issueDate,
    };
  }
  fromCaseDetailsAPI(data: any): ICseGeneralDetails {
    const parties: ICasesParties[] = Array.isArray(data.clients)
      ? data.clients.map(
          (client: any) =>
            ({
              clientId: client.clientId,
              name: client.fullName,
              natId: client.nationalId,
              phoneNumber: client.phoneNumber.number,
              countryCode: client.countryCode,
              address: client.address,
              birthDate: client.birthdate,
            } as ICasesParties)
        )
      : [];

    return {
      caseId: data.caseId,
      caseNumber: data.caseNumber,
      courtTypeName: data.courtTypeName,
      assignedEmployeeName: data.assignedEmployeeName,
      status: data.status,
      caseSubject: data.caseSubject,
      clientRequests: data.clientRequests,
      employeeName: data.employeeName,
      createdDate: data.createdAt,
      estimatedDate: data.estimatedReviewDate,
      layerOpinion: data.lawyerOpinion,
      caseParities: parties,
    };
  }

  toAddCaseAPI(creaCaseForm: FormGroup<IAddCaseForm>, isDraft: boolean): any {
    const formValue = creaCaseForm.value; // safer than .value for disabled fields
    const newClients = formValue.newClients?.map((clientGroup) => ({
      kind: 'new',
      client: {
        person: {
          fullName: clientGroup?.person?.name,
          nationalId: clientGroup?.person?.natId,
          birthDate: clientGroup?.person?.birthDate,
          phone: {
            number: clientGroup?.person?.phone,
            code: '+966',
          },
          address: clientGroup?.person?.address,
          countryCode: clientGroup?.person?.countryCode,
        },
      },
    }));

    const existingClients = formValue.existingClients?.map(
      (existingClient) => ({
        kind: 'existing',
        clientId: existingClient.Id,
      })
    );

    const allClients = [...(newClients ?? []), ...(existingClients ?? [])];

    const body = {
      caseNumber: formValue.case?.caseNumber,
      courtTypeId: formValue.case?.courtType,
      caseSubject: formValue.case?.subject,
      partyRole: String(formValue.case?.partiesToTheCase),
      estimatedReviewDate: formValue.case?.estimatedTime,
      isDraft: isDraft,
      lawyerOpinion: formValue.case?.lawyerOpinion,
      assignedEmployeeId: formValue.case?.assignedOfficer,
      clientRequestDetails: formValue.case?.clientRequests,
      clients: allClients,
    };

    return body;
  }
  toAddContractFormAPI(contractFrm: FormGroup<frmAddContract>): FormData {
    const form = new FormData();

    // Add basic fields with proper conversion
    form.append('ContractType', String(contractFrm.value.contractType));
    form.append('InitialPayment', String(contractFrm.value?.downAmount));
    form.append('BaseAmount', String(contractFrm.value.totalPrice));
    form.append('IsAssigned', String(contractFrm.value.assigned));

    // Handle dates properly

    if (contractFrm.value.expirationDate) {
      form.append('ExpiresOn', String(contractFrm.value.expirationDate));
    }
    if (contractFrm.value.issueDate) {
      form.append('IssuedOn', String(contractFrm.value.issueDate));
    }

    if (contractFrm.value.contractAttachment) {
      const file = contractFrm.value.contractAttachment;
      form.append('ContractFile', file);
    }
    return form;
  }

  toAddPOAFormAPI(frmAddPoa: FormGroup<IAddPOAForm>): FormData {
    const form = new FormData();

    form.append('POANumber', String(frmAddPoa.value.poaNumber));
    form.append('IssueDate', String(frmAddPoa.value.poaIssueDate));
    form.append('IssuingAuthority', String(frmAddPoa.value.poaAuthrizedBy));
    if (frmAddPoa.value.poaAttachment)
      form.append('AttachmentFile', frmAddPoa.value.poaAttachment);

    return form;
  }

  getListDTOAdapter<Type>(
    data: any,
    itemAdapter: (row: any) => Type
  ): IListDTO<Type> {
    return {
      pageIndex: data.pageIndex,
      pageSize: data.pageSize,
      totalItemsCount: data.totalItemsCount,
      itemsCount: data.itemsCount,
      hasPreviousPage: data.hasPreviousPage,
      hasNextPage: data.hasNextPage,
      totalPages: data.totalPages,
      items: data.items.map((row: any) => itemAdapter(row)),
    };
  }
  caseListRowAdapter(row: any): ICaseRow {
    return {
      caseId: row.caseId,
      caseNumber: row.caseNumber || 'N/A',
      caseSubject: row.caseSubject,
      courtTypeName: row.courtTypeName,
      status: row.status,
      fileNumber: row.fileNumber,
      employeeName: row.createdByName,
      createdDate: row.createdDate,
    };
  }

  getSessionsByCaseIdAdapter(row: any): ISessionsRow {
    return {
      courtSessionId: row.courtSessionId,
      createdDate: new Date(row.scheduledAt),
      assignedEmployeeName: String(row.assignedEmployeeName),
      createdByEmployeeName: String(row.assignedEmployeeName),
      scheduledAt: new Date(row.scheduledAt),
    };
  }

  createSessionAdapter(data: FormGroup<IAddSessionForm>): any {
    return {
      assignedEmployeeId: data.value.layerId,
      scheduledAt: data.value.date ? new Date(data.value.date) : undefined,
      assignedTasks: data.value.tasks,
    };
  }

  updateSessionAdapter(data: FormGroup<IAddSessionForm>): any {
    return {
      assignedEmployeeId: data.value.layerId,
      newDate: data.value.date,
      assignedTasks: data.value.tasks,
    };
  }
  sessionDetailsAdapter(data: any): sessionDetails {
    return {
      id: data.id,
      caseId: data.caseId,
      assignedEmployeeId: data.assignedEmployeeId,
      assignedEmployeeName: data.assignedEmployeeName,
      scheduledAt: data.scheduledAt,
      assignedTasks: data.assignedTasks,
      isSessionDateExpired: data.isSessionDateExpired,
    };
  }

  createEmployeeAdapter(data: FormGroup<INewEmployee>): any {
    return {
      person: {
        fullName: data.value?.person?.name,
        nationalId: data.value?.person?.natId,
        birthDate: data.value?.person?.birthDate,
        phone: {
          number: data.value?.person?.phone,
          code: '+966',
        },
        address: data.value?.person?.address,
        countryCode: data.value?.person?.countryCode,
      },
      role: data.value?.role,
      email: data.value?.email,
    };
  }
  employeeDetailsAdapter(data: any): IEmployeeDetails {
    return {
      id: data.id,
      nationalId: data.nationalId,
      fullName: data.fullName,
      email: data.email,
      address: data.address,
      phone: data.phone,
      role: data.role,
      birthDate: data.birthDate,
      countryCode: data.countryCode,
    };
  }

  frmAddJudgmentAdapter(judgment: FormGroup<frmAddJudgment>): any {
    const form = new FormData();

    form.append('Number', String(judgment.value.number));
    form.append('Type', String(judgment.value.type));
    form.append('SubType', String(judgment.value.subType));
    form.append('IssuedOn', String(judgment.value.issueDate));
    form.append('ExpiresOn', String('2025-02-02'));

    if (judgment.value.file) form.append('File', judgment.value.file);

    return form;
  }

  frmAddTemplateAdapter(frmTemplate: FormGroup<frmAddTemplate>) {
    const form = new FormData();

    form.append('Number', String(frmTemplate.value.name));

    if (frmTemplate.value.file) form.append('File', frmTemplate.value.file);

    return form;
  }
}
