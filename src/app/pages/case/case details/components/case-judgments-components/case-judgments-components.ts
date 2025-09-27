import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import {
  IContractRow,
  IJudgmentRow,
  IListDTO,
} from '../../../../../../core/models/requests';
import { ContractService } from '../../../../../../core/services/contract/contract-service';
import { ClsHelpers } from '../../../../../../shared/util/helpers/cls-helpers';
import { DatePipe } from '@angular/common';
import { EmptyTable } from '../../../../../../shared/components/empty-table/empty-table/empty-table';
import { AddJudgmentDialog } from '../../dialogs/add-judgment-component/add-judgment-component';
import { JudgmentService } from '../../../../../../core/services/judgments/judgment-service';

@Component({
  selector: 'app-case-judgments-components',
  imports: [MatPaginatorModule, MatTableModule, DatePipe, EmptyTable],
  templateUrl: './case-judgments-components.html',
  styleUrl: './case-judgments-components.css',
})
export class CaseJudgmentsComponents implements OnInit {
  handlePage($event: PageEvent) {
    throw new Error('Method not implemented.');
  }
  filter() {
    throw new Error('Method not implemented.');
  }
  displayedColumns: string[] = [
    'index',
    'number',
    'type',
    'subType',
    'issueDate',
    'creatorName',
    'createdDate',
    'actions',
  ];
  judgmentsDataSource = new MatTableDataSource<IJudgmentRow>();
  caseId: string = '';
  currentPage = 0;
  judgments: IListDTO<IJudgmentRow> = {} as IListDTO<IJudgmentRow>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialogof: MatDialog,
    private activatedRoute: ActivatedRoute,
    private judgmentService: JudgmentService,
    public helper: ClsHelpers
  ) {}

  ngOnInit(): void {
    this.activatedRoute.parent?.params.subscribe((params) => {
      this.caseId = params['caseId'] || '';
    });

    this.judgmentsDataSource.data = [
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
  }

  loadContracts(): void {
    this.judgmentService.getAllByCaseId(this.caseId).subscribe({
      next: (res) => {
        this.judgments = res;
        this.judgmentsDataSource.data = this.judgments.items;
      },
    });
  }

  openAddJudgmentDialog() {
    this.dialogof.open(AddJudgmentDialog, {
      height: '325x',
      minWidth: '600px',
      data: { caseId: this.caseId },
    });
  }
}
