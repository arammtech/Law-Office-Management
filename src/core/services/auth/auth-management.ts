import { HttpClient } from '@angular/common/http';
import { environmentDev } from '../../../environments/environment.development';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { SessionManagement } from '../session/session-management';
import { clsUser } from '../session/models/cls-user';

@Injectable({
  providedIn: 'root',
})
export class AuthManagement {
  constructor(
    private http: HttpClient,
    private sessionService: SessionManagement
  ) {}
  baseURL = environmentDev.baseURL;

  loginUser(nathId: string, password: string): Observable<clsUser> {
    return this.http
      .post<clsUser>(
        `${this.baseURL}/login`,
        { nathId, password },
        { withCredentials: true }
      )
      .pipe(
        tap((user) => {
          if (user) {
            this.sessionService.setSession(user);
          }
        })
      );
  }

  logout(): Observable<clsUser> {
    this.sessionService.endSession();
    return this.http
      .post<clsUser>(
        `${this.baseURL}/logout`,
        { withCredentials: true }
      )
  }
}