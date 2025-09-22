import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AddSessionDialog } from '../../dialogs/add-session-dialog/add-session-dialog';
import { ISessionsRaw } from '../../../../../../core/models/requests';
import { ClsTableUtil } from '../../../../../../shared/util/table/cls-table-util';

@Component({
  selector: 'app-case-sesstions',
  standalone: true,
  providers: [
    {
      provide: MatPaginatorIntl,
      useValue: ClsTableUtil.getArabicPaginatorIntl(),
    },
  ],
  imports: [MatTableModule, MatPaginator, MatSortModule],
  templateUrl: './case-sesstions.html',
  styleUrl: './case-sesstions.css',
})
export class CaseSesstions implements AfterViewInit {
  displayedColumns: string[] = ['index', 'date', 'lawyer'];
  sessionsDataSource = new MatTableDataSource<ISessionsRaw>();
  currentPage = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialogof: MatDialog) {
    const initialSessions: ISessionsRaw[] = [
      { date: new Date('2025-01-02').toDateString(), lawyer: 'عبدالعزيز حسن' },
      { date: new Date('2025-01-02').toDateString(), lawyer: 'عبدالعزيز حسن' },
      { date: new Date('2025-01-02').toDateString(), lawyer: 'عبدالعزيز حسن' },
      { date: new Date('2025-01-02').toDateString(), lawyer: 'عبدالعزيز حسن' },
      { date: new Date('2025-01-02').toDateString(), lawyer: 'عبدالعزيز حسن' },
      { date: new Date('2025-01-02').toDateString(), lawyer: 'عبدالعزيز حسن' },
    ];
    this.sessionsDataSource.data = initialSessions;
  }

  ngAfterViewInit(): void {
    this.sessionsDataSource.paginator = this.paginator;
    this.sessionsDataSource.sort = this.sort;
  }

  filterSessions(event: Event): void {
    const value = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.sessionsDataSource.filter = value;
  }

  handlePage(event: any): void {
    this.currentPage = event.pageIndex;
  }

  openAddSession(): void {
    this.dialogof.open(AddSessionDialog, {
      height: '325x',
      minWidth: '600px',
    });
  }

  helper = {
    getCurrentRowNumber: (
      index: number,
      pageIndex: number,
      pageSize: number
    ): number => {
      return index + 1 + pageIndex * pageSize;
    },
  };
}
