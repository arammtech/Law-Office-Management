import { Injectable } from '@angular/core';
import { environmentDev } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  baseURL = environmentDev.baseURL;
  constructor(private http: HttpClient) {}
  // add(client: ICreateEmployee) {
  //   return this.http.post(`${this.baseURL}/employees`, client);
  // }
}
