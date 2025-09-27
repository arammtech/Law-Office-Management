import { Injectable } from '@angular/core';
import { environmentDev } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

import { FormGroup } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { frmAddContract, IContractRow, IListDTO } from '../../models/requests';
import { Adapter } from '../adapter/adapter';

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  baseURL = environmentDev.baseURL;
  constructor(private http: HttpClient, private adapter: Adapter) {}

  add(contractFrm: FormGroup<frmAddContract>, caseId: string) {
    const formdate = this.adapter.toAddContractFormAPI(contractFrm);
    return this.http
      .post(`${this.baseURL}/cases/${caseId}/contracts`, formdate)
      .pipe(map((data) => data as string));
  }

   getContractsByCaseId(caseId: string): Observable<IListDTO<IContractRow>> {
    console.log(caseId);
    return this.http.get<any>(`${this.baseURL}/cases/${caseId}/contracts/paged`).pipe(
      map((res) => {
        console.log(res);
        return this.adapter.getListDTOAdapter<IContractRow>(
          res,
          this.adapter.getCaseContractRowAdapter
        );
      })
    );
  }
}
