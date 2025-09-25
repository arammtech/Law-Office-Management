import { Injectable } from '@angular/core';
import { environmentDev } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { IemployeeName } from '../../../../core/models/requests';
import { AppService } from '../../../../shared/common/app-service';
import { Adapter } from '../../../../core/services/adapter/adapter';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService extends AppService {
  constructor(private http: HttpClient, private adapter:Adapter) {
    super();
  }
  // add(client: ICreateEmployee) {
  //   return this.http.post(`${this.baseURL}/employees`, client);
  // }

  getEmployeeNames(): Observable<IemployeeName[]> {
    return this.http
      .get<any[]>(`${this.baseURL}/employees/names`)
      .pipe(
        map((data) => data.map((ele) => this.adapter.fromEmployeeNamesAPI(ele)))
      );
  }
}
