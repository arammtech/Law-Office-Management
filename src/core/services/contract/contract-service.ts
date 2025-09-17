import { Injectable } from '@angular/core';
import { environmentDev } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Addapter } from '../addapter/addapter';
import { FormGroup } from '@angular/forms';
import { map } from 'rxjs';
import { IAddContract } from '../../models/requests';

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  baseURL = environmentDev.baseURL;
  constructor(private http: HttpClient, private addapter: Addapter) {}

  add(contractFrm: FormGroup<IAddContract>, caseId: string) {
    const formdate  = this.addapter.toAddContractFormAPI(contractFrm);
    console.log('i tried in the service', formdate);
    return this.http
      .post(`${this.baseURL}/cases/${caseId}/contracts`, formdate)
      .pipe(map((data) => data as string));
  }
}
