import { NonNullableFormBuilder } from "@angular/forms";
import { ICourtDetaills } from "../../../app/pages/case/cases list/models/icourt-detaills";
import { INewClientForm, IClientDetails, IemployeeName } from "../../models/requests";
import { IContractRaw } from "../../../app/pages/case/case details/components/case-contract/case-contract";
import { ICseGeneralDetails, ICasesParties } from "../../../app/pages/case/case details/components/case-details-component/case-details-component";

export class Addapter {
    /**
     *
     */
    constructor(private fb:NonNullableFormBuilder) {
        
        
    }
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
      id: model.ClientId,
      person: this.fb.group({
        id: this.fb.control(model.PersonId),
        name: this.fb.control(model.FullName),
        natId: this.fb.control(model.NationalId),
        birthDate: this.fb.control(model.BirthDate),
        phone: this.fb.control(model.PhoneNumber),
        address: this.fb.control(model.Address),
        countryCode: this.fb.control(model.CountryCode),
      }),
    };
  }

    fromCourtDetailsAPI(data: any): ICourtDetaills {
    return {
      courtTypeId: data?.courtTypeId,
      name: data?.name,
      code: data?.code,
      description: data?.description,
      years: ['1447']
    };
  }

    fromEmployeeNamesAPI(model: any): IemployeeName {
    return {
      id: model.employeeId,
      name: model.fullName,
    };
  }

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
