import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environmentDev } from '../../../../environments/environment.development';
import { map, Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { ICseGeneralDetails } from '../case details/components/case-details-component/case-details-component';
import { IContractRaw } from '../case details/components/case-contract/case-contract';
import { IAddCaseForm, IAddContract, ICaseRow, ICasesList, IClientDetails, ICourtDetaills, IemployeeName } from '../../../../core/models/requests';
import { Addapter } from '../../../../core/services/addapter/addapter';

@Injectable({
  providedIn: 'root',
})
export class CaseService {
  baseURL = environmentDev.baseURL;
  constructor(
    private http: HttpClient,
    private addapter: Addapter,
  ) {}



  add(
    createCaseModel: FormGroup<IAddCaseForm>,
    isDraft: boolean
  ): Observable<string> {
    const body = this.addapter.toAddCaseAPI(createCaseModel, isDraft);
    return this.http
      .post(`${this.baseURL}/cases`, body)
      .pipe(map((data) => data as string));
  }

  getClientByNatId(natId: string): Observable<IClientDetails> {
    return this.http
      .get(`${this.baseURL}/clients/national-id/${natId}`)
      .pipe(map((data) => this.addapter.fromClientDetailsAPI(data)));
  }

  getCourtSDetails(): Observable<ICourtDetaills[]> {
    return this.http
      .get<any[]>(`${this.baseURL}/court-types`)
      .pipe(
        map((data) =>
          data.map((ele) => this.addapter.fromCourtDetailsAPI(ele))
        )
      );
  }

  getEmpoloyeeNames(): Observable<IemployeeName[]> {
    return this.http
      .get<any[]>(`${this.baseURL}/employees/names`)
      .pipe(
        map((data) =>
          data.map((ele) => this.addapter.fromEmployeeNamesAPI(ele))
        )
      );
  }

  getCasesList(
    courtId: string,
    year: string,
    pageNumber: number = 1,
    pageSize: number = 10
  ): Observable<ICasesList<ICaseRow>> {
    return this.http
      .get<any>(
        `${this.baseURL}/cases/by-court-type/${courtId}/year/${year}?pageNumber=${pageNumber}&pageSize=${pageSize}`
      )
      .pipe(map((data) => data as ICasesList<ICaseRow>));
  }

  getYearsForCourt(courtId: string): Observable<string[]> {
    return this.http.get<any>(`${this.baseURL}/court-types/${courtId}/years`);
  }

  getCaeDetails(caseId: string): Observable<ICseGeneralDetails> {
    return this.http
      .get<any>(`${this.baseURL}/cases/${caseId}`)
      .pipe(map((res) => this.addapter.fromCaseDetailsAPI(res)));
  }

  addContract(
    caseId: string,
    addContractForm: FormGroup<IAddContract>
  ): Observable<ICseGeneralDetails> {
    return this.http
      .get<any>(`${this.baseURL}/cases/${caseId}`)
      .pipe(map((res) => this.addapter.fromCaseDetailsAPI(res)));
  }

  
  getCaseContracts(caseId: string): Observable<IContractRaw[]> {
    console.log('i am the id', caseId);
    return this.http
      .get<any>(`${this.baseURL}/cases/${caseId}/contracts`)
      .pipe(map((res) => this.addapter.fromCaseContractsAPI(res)));
  }
}
