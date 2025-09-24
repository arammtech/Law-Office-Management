import { Injectable } from '@angular/core';
import { environmentDev } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { map } from 'rxjs';
import { frmAddContract, IAddPOAForm } from '../../models/requests';
import { Adapter } from '../adapter/adapter';
import { AppService } from '../../../shared/common/app-service';

@Injectable({
  providedIn: 'root',
})
export class POAService extends AppService {
  constructor(private http: HttpClient, private adapter: Adapter) {
    super();
  }

  add(poaFrm: FormGroup<IAddPOAForm>, caseId: string) {
    const formdate = this.adapter.toAddPOAFormAPI(poaFrm);
    return this.http
      .post(`${this.baseURL}/cases/${caseId}/poas`, formdate)
      .pipe(map((data) => data as string));
  }
}
