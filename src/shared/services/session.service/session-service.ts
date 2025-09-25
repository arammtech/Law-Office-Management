import { Injectable } from '@angular/core';
import { environmentDev } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Adapter } from '../../../core/services/adapter/adapter';
import { AppService } from '../../common/app-service';
import {
  IAddSessionForm,
  IListDTO,
  ISessionsRow,
} from '../../../core/models/requests';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class SessionService extends AppService {
  constructor(private http: HttpClient, private adapter: Adapter) {
    super();
  }

  add(
    frmNewSession: FormGroup<IAddSessionForm>,
    caseId: string
  ): Observable<void> {
    const body = this.adapter.createSessionAdapter(frmNewSession);
    console.log('the session body', body);
    return this.http.post<any>(
      `${this.baseURL}/cases/${caseId}/court-sessions`,
      body
    );
  }

  getSessionsByCaseId(caseId: string): Observable<IListDTO<ISessionsRow>> {
    return this.http
      .get<any>(`${this.baseURL}/cases/${caseId}/court-sessions/paged`)
      .pipe(
        map((data) =>
          this.adapter.getListDTOAdapter(
            data,
            this.adapter.getSessionsByCaseIdAdapter
          )
        )
      );
  }
}
