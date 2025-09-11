import { Injectable } from '@angular/core';
import { ICourt } from '../../../models/icourt';
import { ICourtDetaills } from '../../../cases list/models/icourt-detaills';


@Injectable({ providedIn: 'root' })
export class CourtAdapter {
  fromCourtDetailsAPI(data: any): ICourtDetaills {
    return {
      courtTypeId: data?.courtTypeId,
      name: data?.name,
      code: data?.code,
      description: data?.description,
      years: ['1447']
    };
  }
}
