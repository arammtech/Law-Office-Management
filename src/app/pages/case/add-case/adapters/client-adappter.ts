import { Injectable } from '@angular/core';
import { IClientModel } from '../models/icase';

@Injectable({ providedIn: 'root' })
export class ClientAdapter {
  // from API → to App Model
  fromApi(api: any): IClientModel {
    return {
      id: api.clientId,
      person: {
        id: api.person.personId,
        name: api.person.fullName,
        natId: api.person.nationalId,
        birthDate: api.person.birthDate,
        phone: api.person.phoneNumber,
        address: api.person.address,
        countryCode: api.person.countryCode,
      },
    };
  }

  // from App Model → to API
  toApi(model: IClientModel): any {
    return {
      clientId: model.id,
      person: {
        personId: model.person.id,
        fullName: model.person.name,
        nationalId: model.person.natId,
        birthDate: model.person.birthDate,
        phoneNumber: model.person.phone,
        address: model.person.address,
        countryCode: model.person.countryCode,
      },
    };
  }
}
