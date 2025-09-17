import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { PageHeaderComponent } from '../../../../../shared/components/page header/page-header-component/page-header-component';
import { ICasesList, IDraftCaseRow } from '../../../../../core/models/requests';

@Component({
  selector: 'app-draft-cases-page',
  imports: [MatTableModule, PageHeaderComponent],
  templateUrl: './draft-cases-page.html',
  styleUrl: './draft-cases-page.css'
})
export class DraftCasesPage {
  displayedColumns:string[] = ['index', 'stats',  'courtName', 'subject', 'actions']
  draftCases:ICasesList<IDraftCaseRow>;

  /**
   *
   */
  constructor() {
    this.draftCases = {} as ICasesList<IDraftCaseRow>;
    this.draftCases.items = [
      {courtName: 'التجارية', caseId: '1', stats: 'مسودة', subject: 'ارض'},
      {courtName: 'التجارية', caseId: '1', stats: 'مسودة', subject: 'ارض'},
      {courtName: 'التجارية', caseId: '1', stats: 'مسودة', subject: 'ارض'},
      {courtName: 'التجارية', caseId: '1', stats: 'مسودة', subject: 'ارض'},
      {courtName: 'التجارية', caseId: '1', stats: 'مسودة', subject: 'ارض'}
    ]
  }
}

