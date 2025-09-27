import { Injectable } from '@angular/core';
import { AppService } from '../../../shared/common/app-service';
import { Adapter } from '../adapter/adapter';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { frmAddJudgment } from '../../models/requests';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JudgmentService extends AppService {
  constructor(private http: HttpClient, private adapter: Adapter) {
    super();
  }

  add(judgment: FormGroup<frmAddJudgment>, caseId: string): Observable<string> {
    const formdate = this.adapter.frmAddJudgmentAdapter(judgment);
    return this.http
      .post(`${this.baseURL}/cases/${caseId}/judgments`, formdate)
      .pipe(map((data) => data as string));
  }

  // getContractsByCaseId(caseId: string): Observable<IListDTO<IContractRow>> {
  //   console.log(caseId);
  //   return this.http
  //     .get<any>(`${this.baseURL}/cases/${caseId}/contracts/paged`)
  //     .pipe(
  //       map((res) => {
  //         console.log(res);
  //         return this.adapter.getListDTOAdapter<IContractRow>(
  //           res,
  //           this.adapter.getCaseContractRowAdapter
  //         );
  //       })
  //     );
  // }
}
