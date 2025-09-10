import { Injectable } from '@angular/core';
import { IemployeeName } from '../../models/iemployee-name';

@Injectable({ providedIn: 'root' })
export class EmployeeAdapter {
  fromEmployeeNamesAPI(model: any): IemployeeName {
    return {
      id: model.employeeId,
      name: model.fullName,
    };
  }
}
