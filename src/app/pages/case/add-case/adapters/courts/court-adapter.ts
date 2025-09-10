import { Injectable } from '@angular/core';
import { ICourt } from '../../models/icourt';

@Injectable({ providedIn: 'root' })
export class CourtAdapter {
  fromCourtDetailsAPI(data: any): ICourt {
    return {
      courtTypeId: data?.courtTypeId,
      name: data?.name,
      code: data?.code,
      description: data?.description,
    };
  }
}
