import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { CaseService } from '../services/case-service';
import { Observable } from 'rxjs';
import { ICourt } from '../models/icourt';

export const courtResolverResolver: ResolveFn<Observable<ICourt[]>> = (
  route,
  state
) => {
  console.log('didn\'t the list work ?')
  return inject(CaseService).getCourtSDetails();
};
