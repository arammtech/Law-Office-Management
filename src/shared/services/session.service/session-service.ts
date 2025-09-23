import { Injectable } from '@angular/core';
import { environmentDev } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Adapter } from '../../../core/services/addapter/addapter';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  baseURL = environmentDev.baseURL;
  constructor(private http: HttpClient, private adapter: Adapter) {}

  getSessionsByCaseId(caseId: string) {
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
