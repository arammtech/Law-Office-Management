import { Injectable } from '@angular/core';
import { AppService } from '../../../shared/common/app-service';
import { HttpClient } from '@angular/common/http';
import { Adapter } from '../adapter/adapter';
import { IAddAttachmetnForm, IListDTO } from '../../models/requests';
import { FormGroup } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { IAttachmentRow } from '../../../app/pages/case/case details/components/case-attachments/case-attachments';

@Injectable({
  providedIn: 'root'
})
export class AttachmentService extends AppService{
  constructor(private http: HttpClient, private adapter: Adapter) {
    super();
  }

   add(frmAddAttachment: FormGroup<IAddAttachmetnForm>, caseId: string) {
    const formdate = this.adapter.toAddAttachmentFormAPI(frmAddAttachment);
    return this.http
      .post(`${this.baseURL}/cases/${caseId}/attachments`, formdate)
      .pipe(map((data) => data as string));
  }

  getAttachments(caseId: string): Observable<IListDTO<IAttachmentRow>> {
    return this.http.get<any>(`${this.baseURL}/cases/${caseId}/attachments`).pipe(
      map((res) => {
        console.log(res);
        return this.adapter.getListDTOAdapter<IAttachmentRow>(
          res,
          this.adapter.getCaseAttachmentRowAdapter
        );
      })
    );
  }
}
