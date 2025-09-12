import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environmentDev } from '../../../../environments/environment.development';
import { map, Observable } from 'rxjs';
import { ClientAdapter } from '../add-case/adapters/client-adappter';
import { IAddCaseForm } from '../add-case/models/iadd-case-form';
import { INewClientForm } from '../add-case/models/inew-client-form';
import { IClientDetails } from '../add-case/models/iclient-details';
import { FormGroup } from '@angular/forms';
import { CourtAdapter } from '../add-case/adapters/courts/court-adapter';
import { EmployeeAdapter } from '../add-case/adapters/employee/employee-adapter';
import { IemployeeName } from '../add-case/models/iemployee-name';
import { ICourt } from '../models/icourt';
import { ICasesList } from '../cases list/models/i-cases-list';
import { ICourtDetaills } from '../cases list/models/icourt-detaills';
import { CaseAdappter } from '../adappters/case-adappter';
import { ICseGeneralDetails } from '../case details/components/case-details-component/case-details-component';

@Injectable({
  providedIn: 'root',
})
export class CaseService {
  baseURL = environmentDev.baseURL;
  constructor(
    private http: HttpClient,
    private clientAdappter: ClientAdapter,
    private courtAdapter: CourtAdapter,
    private employeeAdapter: EmployeeAdapter, 
    private caseAdappter:CaseAdappter
  ) {}

  toAddCaseAPI(creaCaseForm: FormGroup<IAddCaseForm>, isDraft: boolean): any {
    const formValue = creaCaseForm.getRawValue(); // safer than .value for disabled fields
    const newClients = formValue.newClients?.map((clientGroup) => ({
      kind: 'new',
      client: {
        person: {
          fullName: clientGroup.person.name,
          nationalId: clientGroup.person.natId,
          birthDate: clientGroup.person.birthDate,
          phoneNumber: clientGroup.person.phone.e164Number,
          address: clientGroup.person.address,
          countryCode: clientGroup.person.countryCode,
        },
      },
    }));

    const existingClients = formValue.existingClients?.map(
      (existingClient) => ({
        kind: 'existing',
        ClientId: existingClient.Id,
      })
    );

    const allClients = [...(newClients ?? []), ...(existingClients ?? [])];

    const body = {
      caseNumber: formValue.case?.caseNumber,
      courtTypeId: formValue.case?.courtType,
      caseSubject: formValue.case?.subject,
      partyRole: formValue.case.partiesToTheCase as number,
      clientRequestDetails: formValue.case.subject,
      estimatedReviewDate: formValue.case.estimatedTime,
      isDraft: isDraft,
      lawyerOpinion: formValue.case.lawyerOpinion,
      assignedEmployeeId: formValue.case.assignedOfficer,
      clients: allClients,
    };

    console.log(body);
    return body;
  }

  add(
    createCaseModel: FormGroup<IAddCaseForm>,
    isDraft: boolean
  ): Observable<string> {
    const body = this.toAddCaseAPI(createCaseModel, isDraft);
    return this.http
      .post(`${this.baseURL}/cases`, body)
      .pipe(map((data) => data as string));
  }

  getClientByNatId(natId: string): Observable<IClientDetails> {
    return this.http
      .get(`${this.baseURL}/clients/national-id/${natId}`)
      .pipe(map((data) => this.clientAdappter.fromClientDetailsAPI(data)));
  }

  getCourtSDetails(): Observable<ICourtDetaills[]> {
    return this.http
      .get<any[]>(`${this.baseURL}/court-types`)
      .pipe(
        map((data) =>
          data.map((ele) => this.courtAdapter.fromCourtDetailsAPI(ele))
        )
      );
  }

  getEmpoloyeeNames(): Observable<IemployeeName[]> {
    return this.http
      .get<any[]>(`${this.baseURL}/employees/names`)
      .pipe(
        map((data) =>
          data.map((ele) => this.employeeAdapter.fromEmployeeNamesAPI(ele))
        )
      );
  }

  getCasesList(
    courtId: string,
    year: string,
    pageNumber: number = 1,
    pageSize: number = 10
  ): Observable<ICasesList> {
    return this.http
      .get<any>(
        `${this.baseURL}/cases/by-court-type/${courtId}/year/${year}?pageNumber=${pageNumber}&pageSize=${pageSize}`
      )
      .pipe(map((data) => data as ICasesList));
  }

  getYearsForCourt(courtId: string): Observable<string[]> {
    return this.http.get<any>(`${this.baseURL}/court-types/${courtId}/years`);
  }

  getCaeDetails(caseId: string): Observable<ICseGeneralDetails> {
    return this.http.get<any>(`${this.baseURL}/cases/${caseId}`).pipe(map(res => this.caseAdappter.fromCaseDetailsAPI(res)));
  }
}
