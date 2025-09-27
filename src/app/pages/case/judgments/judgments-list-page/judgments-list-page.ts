import {
  Component,
  Input,
  ViewChild,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { IJudgmentRow, IListDTO } from '../../../../../core/models/requests';
import { PageHeaderComponent } from '../../../../../shared/components/page header/page-header-component/page-header-component';
import { DatePipe } from '@angular/common';
import { EmptyTable } from '../../../../../shared/components/empty-table/empty-table/empty-table';
import { ClsHelpers } from '../../../../../shared/util/helpers/cls-helpers';
import { JudgmentService } from '../../../../../core/services/judgments/judgment-service';

@Component({
  selector: 'app-judgment-table',
  templateUrl: './judgments-list-page.html',
  styleUrl: './judgments-list-page.css',
  imports: [
    MatPaginatorModule,
    PageHeaderComponent,
    MatTableModule,
    DatePipe,
    MatSortModule,
    EmptyTable,
  ],
})
export class JudgmentsListPage implements AfterViewInit, OnInit {
  judgments: IJudgmentRow[] = [
    {
      id: 'JUDG-001',
      number: 'حكم-2025-001',
      type: 'جنائي',
      subType: 'سرقة',
      issueDate: new Date('2025-03-15'),
      creatorName: 'أحمد الزهراني',
      createdDate: '2025-03-16T09:30:00Z',
      filePath: '/files/judgments/JUDG-001.pdf',
      caseId: 'CASE-1001',
    },
    {
      id: 'JUDG-002',
      number: 'حكم-2025-002',
      type: 'مدني',
      subType: 'عقد إيجار',
      issueDate: new Date('2025-04-10'),
      creatorName: 'سارة القحطاني',
      createdDate: '2025-04-11T14:45:00Z',
      filePath: '/files/judgments/JUDG-002.docx',
      caseId: 'CASE-1002',
    },
    {
      id: 'JUDG-003',
      number: 'حكم-2025-003',
      type: 'تجاري',
      subType: 'نزاع شراكة',
      issueDate: new Date('2025-05-05'),
      creatorName: 'فهد العتيبي',
      createdDate: '2025-05-06T11:20:00Z',
      filePath: '/files/judgments/JUDG-003.pdf',
      caseId: 'CASE-1003',
    },
    {
      id: 'JUDG-004',
      number: 'حكم-2025-004',
      type: 'أحوال شخصية',
      subType: 'طلاق',
      issueDate: new Date('2025-06-01'),
      creatorName: 'نورة السبيعي',
      createdDate: '2025-06-02T08:10:00Z',
      filePath: '/files/judgments/JUDG-004.doc',
      caseId: 'CASE-1004',
    },
    {
      id: 'JUDG-005',
      number: 'حكم-2025-005',
      type: 'إداري',
      subType: 'مخالفة تنظيمية',
      issueDate: new Date('2025-07-20'),
      creatorName: 'عبدالله الحربي',
      createdDate: '2025-07-21T16:00:00Z',
      filePath: '/files/judgments/JUDG-005.pdf',
      caseId: 'CASE-1005',
    },
  ];

  judgmentsList: IListDTO<IJudgmentRow> = {} as IListDTO<IJudgmentRow>;

  displayedColumns: string[] = [
    'index',
    'number',
    'type',
    'subType',
    'issueDate',
    'creatorName',
    'createdDate',
    'download',
  ];

  dataSource = new MatTableDataSource<IJudgmentRow>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  /**
   *
   */
  constructor(
    public helper: ClsHelpers,
    private judgmentService: JudgmentService
  ) {}
  ngOnInit(): void {
    this.judgmentService.getAllByCaseId('dsaf').subscribe((res) => {
      this.judgmentsList = res;
    });
  }

  ngAfterViewInit() {
    this.dataSource.data = this.judgmentsList.items;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.dataSource.filter = filterValue;
  }

  getDownloadUrl(row: IJudgmentRow): string {
    return `/files/judgments/${row.number}.pdf`; // Adjust if filePath is available
  }
}
