import { Injectable } from '@angular/core';
import {
  ICasesParties,
  ICseGeneralDetails,
} from '../case details/components/case-details-component/case-details-component';
import { IContractRaw } from '../case details/components/case-contract/case-contract';

@Injectable({providedIn:'root'})
export class CaseAdappter {
  fromCaseContractsAPI(res: any): IContractRaw[] {
    return res.map((c:any) => ( { contractNumber: c.contractNumber, contractType: c.contractType || 'محددة بمدة' } as IContractRaw ))
  }
  fromCaseDetailsAPI(data: any): ICseGeneralDetails {
    const parties:ICasesParties[] =  Array.isArray(data.clients)
        ? data.clients.map((client:any) =>
            ({
                clientId: client.clientId,
                name: client.fullName,
                natId: client.nationalId,
                phoneNumber: client.phoneNumber,
                countryCode: client.countryCode,
            } as ICasesParties)
        )
        : [] ;


    return {
      caseId: data.caseId,
      caseNumber: data.caseNumber,
      courtType: data.courtTypeName,
      assignedLawyerName: data.assignedEmployeeName,
      status: data.status,
      caseParites: parties,
    };
  }
}
