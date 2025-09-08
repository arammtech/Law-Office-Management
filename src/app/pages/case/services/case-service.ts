import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environmentDev } from '../../../../environments/environment.development';
import { map, Observable } from 'rxjs';
import { ClientAdapter } from '../add-case/adapters/client-adappter';
import { IAddCaseForm } from '../add-case/models/iadd-case-form';
import { INewClientForm } from '../add-case/models/inew-client-form';
import { IClientDetails } from '../add-case/models/iclient-details';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CaseService {
  baseURL = environmentDev.baseURL;
  constructor(
    private http: HttpClient,
    private clientAdappter: ClientAdapter
  ) {}
  add(createCaseModel: FormGroup<IAddCaseForm>, isDraft: boolean): Observable<string> {
    const formData = new FormData();
    // قيم عادية
    formData.append('caseNumber', `${createCaseModel?.value?.case?.caseNumber}`);
    formData.append('courtTypeId', `${createCaseModel?.value?.case?.courtType}`);
    formData.append('caseSubject', `${createCaseModel?.value?.case?.subject}`);
    formData.append(
      'partyRole',
      `${createCaseModel?.value?.case?.partiesToTheCase}`
    );
    formData.append(
      'clientRequestDetails',
      `${createCaseModel?.value?.case?.subject}`
    );
    formData.append(
      'estimatedReviewDate',
      `${createCaseModel?.value?.case?.estimatedTime}`
    );
    formData.append(
      'lawyerOpinion',
      `${createCaseModel?.value?.case?.lawyerOpinion}`
    );
    // الموظف المسؤول
    formData.append(
      'assignedEmployeeId',
      `${createCaseModel?.value?.case?.assignedOfficer}`
    );
    formData.append('isDraft', `${isDraft}`);

    // // بيانات العقد
    // if (createCaseModel.contract?.showContract) {
    //   formData.append(
    //     'hasContracts',
    //     `${createCaseModel?.contract?.showContract}`
    //   );
    //   formData.append(
    //     'contractsData[0].contractType',
    //     `${createCaseModel.contract.contractType}`
    //   );
    //   formData.append(
    //     'contractsData[0].issueDate',
    //     `${createCaseModel?.contract?.issueDate}`
    //   );
    //   formData.append(
    //     'contractsData[0].expiryDate',
    //     `${createCaseModel?.contract?.expirationDate}`
    //   );
    //   formData.append(
    //     'contractsData[0].baseAmount',
    //     `${createCaseModel?.contract?.totalPrice}`
    //   );
    //   formData.append(
    //     'contractsData[0].initialPayment',
    //     `${createCaseModel?.contract?.downAmount}`
    //   );
    //   formData.append(
    //     'contractsData[0].isAssigned',
    //     `${createCaseModel?.contract?.assigned}`
    //   );
    //   formData.append(
    //     'contractFiles[0]',
    //     `${createCaseModel.contract?.contractAttachment}`
    //   );
    // }

    // // بيانات الوكالة
    // if (createCaseModel?.poa.showPOA) {
    //   formData.append('hasPOAs', `${createCaseModel?.poa?.showPOA}`);
    //   formData.append('poasData[0].poaNumber', 'POA-001');
    //   formData.append('poasData[0].issueDate', '2024-05-20');
    //   formData.append('poasData[0].issuingAuthority', 'الجهات الحكومية');
    //   formData.append('poaFiles[0]', `${createCaseModel?.poa.poaAttachment}`);
    // }

    // العملاء (مصفوفة بصيغة JSON)
    const clientsJson = [];

    for (const client of createCaseModel?.value?.newClients!) {
      const newClient = this.clientAdappter.toAddClientAPI(
        client as INewClientForm
      );

      clientsJson.push(newClient);
    }

    for (const client of createCaseModel?.value?.existingClients!) {
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

  getClientByNatId(natId: string): Observable<IClientDetails> {
    return this.http
      .get(`${this.baseURL}/clients/national-id/${natId}`)
      .pipe(map((data) => this.clientAdappter.fromClientDetailsAPI(data)));
  }
}
