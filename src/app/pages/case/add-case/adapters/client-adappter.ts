import { Injectable } from '@angular/core';
import { INewClientForm } from '../models/inew-client-form';
import { IClientDetails } from '../models/iclient-details';
import { NonNullableFormBuilder } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ClientAdapter {
  constructor(private fb: NonNullableFormBuilder) {}
  // from App Model → to API
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
}
