import { FormGroup, NonNullableFormBuilder } from '@angular/forms';
import {
  INewClientForm,
  IClientDetails,
  IemployeeName,
  IAddCaseForm,
  IAddContract,
  ICourtDetaills,
  ICaseRow,
  IListDTO,
  IContractRow,
  ISessionsRow,
} from '../../models/requests';
import {
  ICseGeneralDetails,
  ICasesParties,
} from '../../../app/pages/case/case details/components/case-details-component/case-details-component';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Adapter {
  /**
   *
   */
  constructor(private fb: NonNullableFormBuilder) {}
  toAddClientAPI(model: INewClientForm): any {
    return {
      kind: 'new',
      Client: {
        Person: {
          FullName: model.person?.value?.name,
          NationalId: model.person?.value?.natId,
          BirthDate: model.person?.value?.birthDate,
          PhoneNumber: model.person?.value?.phone,
          Address: model.person?.value?.address,
          CountryCode: model.person?.value?.countryCode,
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
      id: res.id,
      createdDate: res.createdDate,
      employeeNameCreatedIt: res.employeeName,
      expirationDate: res.expirationDate,
      issueDate: res.issueDate,
      restAmount: res.restAmount,
      totalAmount: res.totalAmount,
      contractNumber: res.contractNumber,
      contractType: res.contractType,
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
              phoneNumber: client.phoneNumber,
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
    const formValue = creaCaseForm.getRawValue(); // safer than .value for disabled fields
    const newClients = formValue.newClients?.map((clientGroup) => ({
      kind: 'new',
      client: {
        person: {
          fullName: clientGroup.person.name,
          nationalId: clientGroup.person.natId,
          birthDate: clientGroup.person.birthDate,
          phoneNumber: clientGroup.person.phone,
          address: clientGroup.person.address,
          countryCode: clientGroup.person.countryCode,
        },
      },
    }));

    const existingClients = formValue.existingClients?.map(
      (existingClient) => ({
        kind: 'existing',
        ClientId: existingClient.Id,
      })
    );

    const allClients = [...(newClients ?? []), ...(existingClients ?? [])];

    const body = {
      caseNumber: formValue.case?.caseNumber,
      courtTypeId: formValue.case?.courtType,
      caseSubject: formValue.case?.subject,
      partyRole: formValue.case.partiesToTheCase as number,
      estimatedReviewDate: formValue.case.estimatedTime,
      isDraft: isDraft,
      lawyerOpinion: formValue.case.lawyerOpinion,
      assignedEmployeeId: formValue.case.assignedOfficer,
      clientRequestDetails: formValue.case.clientRequests,
      clients: allClients,
    };

    console.log(body);
    return body;
  }
  toAddContractFormAPI(contractFrm: FormGroup<IAddContract>): FormData {
    const form = new FormData();
    if (contractFrm.valid) {
      if (contractFrm.value.contractType) {
        console.log(
          'i entered the contract type',
          contractFrm.value.contractType
        );
        form.append('ContractType', contractFrm.value.contractType.toString());
      }
      if (contractFrm.value.expirationDate) {
        console.log(
          'i entered the expiration date',
          contractFrm.value.expirationDate
        );
        form.append('ExpiresOn', contractFrm.value.expirationDate);
      }
      if (contractFrm.value.issueDate) {
        console.log(
          'i entered the issue date',
          contractFrm.value.expirationDate
        );
        form.append('IssuedOn', contractFrm.value.issueDate);
      }
      // if (contractFrm.value.downAmount) {
      console.log('i entered the downamount', contractFrm.value.downAmount);
      // form.append('InitialPayment', contractFrm?.value?.downAmount);
      // }
      if (contractFrm.value.totalPrice) {
        console.log('i entered the total price', contractFrm.value.totalPrice);
        form.append('BaseAmount', contractFrm.value.totalPrice.toString());
      }
      if (contractFrm.value.assigned) {
        console.log('i entered the assigned', contractFrm.value.assigned);

        form.append('ContractType', contractFrm.value.assigned.toString());
      }
      if (contractFrm.value.contractAttachment) {
        console.log(
          'i entered the attachments',
          contractFrm.value.contractAttachment.join(',')
        );

        for (let i = 0; i < contractFrm.value.contractAttachment.length; i++) {
          form.append(
            `ContractFiles[${i}]`,
            contractFrm.value.contractAttachment[i]
          );
        }
      }
    }
    console.log('i am the request form', contractFrm);

    console.log('i am the form', form.values());
    return form;
  }

  getListDTOAdapter<Type>(
    data: any,
    itemAdapter: (data: any) => Type
  ): IListDTO<Type> {
    return {
      pageIndex: data.pageIndex,
      pageSize: data.pageSize,
      totalItemsCount: data.totalItemsCount,
      itemsCount: data.itemsCount,
      hasPreviousPage: data.hasPreviousPage,
      hasNextPage: data.hasNextPage,
      totalPages: data.totalPages,
      items: data.items.map((data: any) => itemAdapter(data)),
    };
  }
  caseListRowAdapter(row: any): ICaseRow {
    return {
      caseId: row.caseId,
      caseNumber: row.caseNumber,
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
      sessionDate: new Date(row.sessionDate),
      assignedEmployeeName: String(row.assignedEmployeeName),
      createdByEmployeeName: String(row.createdByEmployeeName),
      createdDate: new Date(row.createdDate),
    };
  }
}
