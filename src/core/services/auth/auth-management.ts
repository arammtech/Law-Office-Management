import { HttpClient } from '@angular/common/http';
import { environmentDev } from '../../../environments/environment.development';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { SessionManagement } from '../session/session-management';
import { loggedUser } from '../session/models/cls-user';

@Injectable({
  providedIn: 'root',
})
export class AuthManagement {
  constructor(
    private http: HttpClient,
    private sessionService: SessionManagement
  ) {}
  baseURL = environmentDev.baseURL;

  login(natId: string, password: string): Observable<any> {
    return this.http
      .post<LoginResponse>(`${this.baseURL}/auth/login`, {
        username: natId,
        password: password,
      },
      {
        withCredentials: true
      }
    )
      .pipe(
        map((responses) => {
          if (responses) {
            console.log('in the response', responses);
            const myLoggedUser: loggedUser = {
              id: responses.user.userId,
              expiration: responses.refreshTokenExpiration,
              isTempPassword: responses.user.isUsingTempPassword,
              username: responses.user.username,
              role: responses.user.roles[0],
            };
            this.sessionService.setSession(myLoggedUser);
          }
        }),
        catchError((error) => {
          console.error('Error in login pipe:', error);
          return throwError(() => error);
        })
      );
  }

  logout(): Observable<loggedUser> {
    this.sessionService.endSession();
    return this.http.post<loggedUser>(`${this.baseURL}/auth/logout`, {
      withCredentials: true,
    });
  }

  refreshToken(): Observable<loggedUser> {
    return this.http.post<loggedUser>(
      `${this.baseURL}/auth/token/refresh-token`,
      {},
      {
        withCredentials: true
      }
    ).pipe(); // handel the returned expiration token time
  }
}

interface LoginResponse {
  user: {
    userId:string;
    email:string;
    username:string;
    isUsingTempPassword: boolean;
    roles:string[];
    claims: [
      {
        issuer: 'string';
        originalIssuer: 'string';
        properties: {
          additionalProp1: 'string';
          additionalProp2: 'string';
          additionalProp3: 'string';
        };
        subject: {
          authenticationType: 'string';
          isAuthenticated: true;
          actor: 'string';
          bootstrapContext: 'string';
          claims: ['string'];
          label: 'string';
          name: 'string';
          nameClaimType: 'string';
          roleClaimType: 'string';
        };
        type: 'string';
        value: 'string';
        valueType: 'string';
      }
    ];
  };
  refreshTokenExpiration:Date;
}
