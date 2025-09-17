import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { AddSessionDialog } from '../../dialogs/add-session-dialog/add-session-dialog';
import { MatDialog } from '@angular/material/dialog';
import { ISessionsRaw } from '../../../../../../core/models/requests';

@Component({
  selector: 'app-case-sesstions',
  imports: [MatTableModule],
  templateUrl: './case-sesstions.html',
  styleUrl: './case-sesstions.css',
})
export class CaseSesstions {
  displayedColumns: string[] = ['possion', 'sessionDate', 'assiseindLawyer'];
  sessions: ISessionsRaw[] = [
    { date: new Date('2025-01-02').toDateString(), lawyer: 'عبدالعزيز حسن' },
    { date: new Date('2025-01-02').toDateString(), lawyer: 'عبدالعزيز حسن' },
    { date: new Date('2025-01-02').toDateString(), lawyer: 'عبدالعزيز حسن' },
    { date: new Date('2025-01-02').toDateString(), lawyer: 'عبدالعزيز حسن' },
    { date: new Date('2025-01-02').toDateString(), lawyer: 'عبدالعزيز حسن' },
    { date: new Date('2025-01-02').toDateString(), lawyer: 'عبدالعزيز حسن' },
  ];

  /**
   *
   */
  constructor(private dialogof: MatDialog) {}

  openAddSession() {
    this.dialogof.open(AddSessionDialog, {
      height: '325x',
      minWidth: '600px',
    });
  }
}

