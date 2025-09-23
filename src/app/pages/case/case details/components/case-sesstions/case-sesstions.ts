import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AddSessionDialog } from '../../dialogs/add-session-dialog/add-session-dialog';
import { IListDTO, ISessionsRow } from '../../../../../../core/models/requests';
import { ClsTableUtil } from '../../../../../../shared/util/table/cls-table-util';
import { EmptyTable } from '../../../../../../shared/components/empty-table/empty-table/empty-table';
import { ClsHelpers } from '../../../../../../shared/util/helpers/cls-helpers';
import { SessionService } from '../../../../../../shared/services/session.service/session-service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-case-sesstions',
  standalone: true,
  providers: [
    {
      provide: MatPaginatorIntl,
      useValue: ClsTableUtil.getArabicPaginatorIntl(),
    },
  ],
  imports: [MatTableModule, MatPaginator, MatSortModule, EmptyTable, DatePipe],
  templateUrl: './case-sesstions.html',
  styleUrl: './case-sesstions.css',
})
export class CaseSessions implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['index', 'date', 'assignedEmployeeName', 'createdByEmployeeName', 'createdDate'];
  sessionsDataSource = new MatTableDataSource<ISessionsRow>();
  sessions: IListDTO<ISessionsRow> = {} as IListDTO<ISessionsRow>;
  currentPage = 0;
  caseId: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialogof: MatDialog,
    public helper: ClsHelpers,
    private sessionService: SessionService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.activatedRoute.parent?.params.subscribe((params) => {
      this.caseId = params['caseId'] || '';
      // this.loadSessions();
    });

    this.sessionsDataSource.data = [
      {
        sessionDate: new Date('2025-09-01'),
        assignedEmployeeName: 'أحمد الزهراني',
        createdByEmployeeName: 'سارة العتيبي',
        createdDate: new Date('2025-08-25'),
      },
      {
        sessionDate: new Date('2025-09-10'),
        assignedEmployeeName: 'نورة القحطاني',
        createdByEmployeeName: 'خالد الحربي',
        createdDate: new Date('2025-09-01'),
      },
      {
        sessionDate: new Date('2025-09-15'),
        assignedEmployeeName: 'فهد السبيعي',
        createdByEmployeeName: 'أحمد الزهراني',
        createdDate: new Date('2025-09-05'),
      },
      {
        sessionDate: new Date('2025-09-20'),
        assignedEmployeeName: 'سارة العتيبي',
        createdByEmployeeName: 'نورة القحطاني',
        createdDate: new Date('2025-09-10'),
      },
      {
        sessionDate: new Date('2025-09-25'),
        assignedEmployeeName: 'خالد الحربي',
        createdByEmployeeName: 'فهد السبيعي',
        createdDate: new Date('2025-09-15'),
      },
    ];

    console.log('i am the data of the sessions', this.sessionsDataSource.data);
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

  loadSessions() {
    this.sessionService.getSessionsByCaseId(this.caseId).subscribe((data) => {
      this.sessions = data;
      this.sessionsDataSource.data = this.sessions.items;
    });
  }
}
