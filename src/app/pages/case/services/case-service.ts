import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environmentDev } from '../../../../environments/environment.development';
import { ICreateCaseModel } from '../add-case/models/iadd-case-form';
import { map, Observable } from 'rxjs';
import { IClientModel } from '../add-case/models/forms-builder';
import { ClientAdapter } from '../add-case/adapters/client-adappter';

@Injectable({
  providedIn: 'root',
})
export class CaseService {
  baseURL = environmentDev.baseURL;
  constructor(
    private http: HttpClient,
    private clientAdappter: ClientAdapter
  ) {}
  add(createCaseModel: ICreateCaseModel, isDraft: boolean): Observable<string> {
    const formData = new FormData();
    // قيم عادية
    formData.append('caseNumber', `${createCaseModel.case.caseNumber}`);
    formData.append('courtTypeId', `${createCaseModel.case.courtType}`);
    formData.append('caseSubject', `${createCaseModel.case.subject}`);
    formData.append('partyRole', `${createCaseModel.case.PartiesToTheCase}`);
    formData.append('clientRequestDetails', `${createCaseModel.case.subject}`);
    formData.append(
      'estimatedReviewDate',
      `${createCaseModel.case.estimatedTime}`
    );
    formData.append('lawyerOpinion', `${createCaseModel?.case.lawyerOpinion}`);
    // الموظف المسؤول
    formData.append(
      'assignedEmployeeId',
      `${createCaseModel?.case?.AssignedOfficer}`
    );
    formData.append('isDraft', `${isDraft}`);

    // بيانات العقد
    if (createCaseModel.contract?.showContract) {
      formData.append(
        'hasContracts',
        `${createCaseModel?.contract?.showContract}`
      );
      formData.append(
        'contractsData[0].contractType',
        `${createCaseModel.contract.contractType}`
      );
      formData.append(
        'contractsData[0].issueDate',
        `${createCaseModel?.contract?.issueDate}`
      );
      formData.append(
        'contractsData[0].expiryDate',
        `${createCaseModel?.contract?.expirationDate}`
      );
      formData.append(
        'contractsData[0].baseAmount',
        `${createCaseModel?.contract?.totalPrice}`
      );
      formData.append(
        'contractsData[0].initialPayment',
        `${createCaseModel?.contract?.downAmount}`
      );
      formData.append(
        'contractsData[0].isAssigned',
        `${createCaseModel?.contract?.assigned}`
      );
      formData.append(
        'contractFiles[0]',
        `${createCaseModel.contract?.contractAttachment}`
      );
    }

    // بيانات الوكالة
    if (createCaseModel?.poa.showPOA) {
      formData.append('hasPOAs', `${createCaseModel?.poa?.showPOA}`);
      formData.append('poasData[0].poaNumber', 'POA-001');
      formData.append('poasData[0].issueDate', '2024-05-20');
      formData.append('poasData[0].issuingAuthority', 'الجهات الحكومية');
      formData.append('poaFiles[0]', `${createCaseModel?.poa.poaAttachment}`);
    }

    // العملاء (مصفوفة بصيغة JSON)
    const clientsJson = [];

    for (const client of createCaseModel?.newClients) {
      const newClient = {
        kind: 'new',
        Client: {
          Person: {
            FullName: client.name,
            NationalId: client.natId,
            BirthDate: client.birth,
            PhoneNumber: client.phone,
            Address: client.address,
            CountryCode: client.countryCode,
          },
        },
      };

      clientsJson.push(newClient);
    }

    for (const client of createCaseModel?.existingClients) {
      const newClient = {
        kind: 'existing',
        ClientId: client.Id,
      };

      clientsJson.push(newClient);
    }

    formData.append('clientsJson', JSON.stringify(clientsJson));

    return this.http
      .post(`${this.baseURL}/cases`, formData)
      .pipe(map((data) => data as string));
  }

  getClientByNatId(natId: string): Observable<IClientModel> {
    return this.http
      .get(`${this.baseURL}/clients/national-id/${natId}`)
      .pipe(map((data) => this.clientAdappter.fromApi(data)));
  }
}
