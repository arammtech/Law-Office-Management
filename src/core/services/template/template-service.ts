import { Injectable } from '@angular/core';
import { AppService } from '../../../shared/common/app-service';
import { Adapter } from '../adapter/adapter';
import { HttpClient } from '@angular/common/http';
import { frmAddTemplate } from '../../models/requests';
import { FormGroup } from '@angular/forms';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemplateService extends AppService {
    constructor(private http: HttpClient, private adapter: Adapter) {
    super();
  }

     add(frmAddAttachment: FormGroup<frmAddTemplate>, caseId: string) {
    const formdate = this.adapter.frmAddTemplateAdapter(frmAddAttachment);
    return this.http
      .post(`${this.baseURL}/templates`, formdate)
      .pipe(map((data) => data as string));
  }

  // getAttachments(caseId: string): Observable<IListDTO<IAttachmentRow>> {
  //   return this.http.get<any>(`${this.baseURL}/cases/${caseId}/attachments`).pipe(
  //     map((res) => {
  //       console.log(res);
  //       return this.adapter.getListDTOAdapter<IAttachmentRow>(
  //         res,
  //         this.adapter.getCaseAttachmentRowAdapter
  //       );
  //     })
  //   );
  // }
}
