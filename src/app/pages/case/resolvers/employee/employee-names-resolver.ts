import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { IemployeeName } from '../../add-case/models/iemployee-name';
import { CaseService } from '../../services/case-service';


export const employeeNamesResolver: ResolveFn<Observable<IemployeeName[]>> = (route, state) => {
  return inject(CaseService).getEmpoloyeeNames();
};
