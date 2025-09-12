import { Injectable } from '@angular/core';
import {
  ICasesParties,
  ICseGeneralDetails,
} from '../case details/components/case-details-component/case-details-component';

@Injectable({providedIn:'root'})
export class CaseAdappter {
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
