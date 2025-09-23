import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { AddContractDialog } from '../../dialogs/add-contract/add-contract';
import { ContractType } from '../../directives/contract-type';
import { CaseService } from '../../../services/case-service';
import { ActivatedRoute } from '@angular/router';
import { ClsTableUtil } from '../../../../../../shared/util/table/cls-table-util';
import { EmptyTable } from '../../../../../../shared/components/empty-table/empty-table/empty-table';
import { IContractRow, IListDTO } from '../../../../../../core/models/requests';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-case-contract',
  standalone: true,
  providers: [
    {
      provide: MatPaginatorIntl,
      useValue: ClsTableUtil.getArabicPaginatorIntl(),
    },
  ],
  imports: [
    MatTableModule,
    ContractType,
    MatPaginator,
    MatSortModule,
    EmptyTable,
    DatePipe,
  ],
  templateUrl: './case-contract.html',
  styleUrl: './case-contract.css',
})
export class CaseContract implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'index',
    'contractNumber',
    'contractType',
    'totalAmount',
    'restAmount',
    'issueDate',
    'expirationDate',
    'employeeNameCreatedIt',
    'createdDate',
  ];
  contractsDataSource = new MatTableDataSource<IContractRow>();
  caseId: string = '';
  currentPage = 0;
  contracts: IListDTO<IContractRow> = {} as IListDTO<IContractRow>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialogof: MatDialog,
    private activatedRoute: ActivatedRoute,
    private caseService: CaseService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.parent?.params.subscribe((params) => {
      this.caseId = params['caseId'] || '';
      this.loadContracts();
    });
  }

  ngAfterViewInit(): void {
    this.contractsDataSource.paginator = this.paginator;
    this.contractsDataSource.sort = this.sort;
  }

  loadContracts(): void {
    this.caseService.getCaseContracts(this.caseId).subscribe({
      next: (res) => {
        this.contracts = res;
        this.contractsDataSource.data = this.contracts.items;
      },
    });
    this.contractsDataSource.data = [
      {
        id: 'C-001',
        contractNumber: 'CN-2025-001',
        contractType: 'إيجار',
        totalAmount: '150,000 ريال',
        restAmount: '50,000 ريال',
        issueDate: '2025-01-15',
        expirationDate: '2026-01-15',
        employeeNameCreatedIt: 'أحمد الزهراني',
        createdDate: '2025-01-10',
      },
      {
        id: 'C-002',
        contractNumber: 'CN-2025-002',
        contractType: 'صيانة',
        totalAmount: '75,000 ريال',
        restAmount: '0 ريال',
        issueDate: '2025-03-01',
        expirationDate: '2025-09-01',
        employeeNameCreatedIt: 'سارة العتيبي',
        createdDate: '2025-02-28',
      },
      {
        id: 'C-003',
        contractNumber: 'CN-2025-003',
        contractType: 'توريد',
        totalAmount: '220,000 ريال',
        restAmount: '120,000 ريال',
        issueDate: '2025-05-10',
        expirationDate: '2025-11-10',
        employeeNameCreatedIt: 'خالد الحربي',
        createdDate: '2025-05-05',
      },
      {
        id: 'C-004',
        contractNumber: 'CN-2025-004',
        contractType: 'استشارة',
        totalAmount: '30,000 ريال',
        restAmount: '5,000 ريال',
        issueDate: '2025-06-20',
        expirationDate: '2025-12-20',
        employeeNameCreatedIt: 'نورة القحطاني',
        createdDate: '2025-06-18',
      },
      {
        id: 'C-005',
        contractNumber: 'CN-2025-005',
        contractType: 'إيجار',
        totalAmount: '180,000 ريال',
        restAmount: '60,000 ريال',
        issueDate: '2025-08-01',
        expirationDate: '2026-08-01',
        employeeNameCreatedIt: 'فهد السبيعي',
        createdDate: '2025-07-30',
      },
    ];
  }

  filterContracts(event: Event): void {
    const value = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.contractsDataSource.filter = value;
  }

  handlePage(event: any): void {
    this.currentPage = event.pageIndex;
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

  openAddContract() {
    this.dialogof.open(AddContractDialog, {
      height: '325x',
      minWidth: '600px',
      data: { caseId: this.caseId },
    });
  }
}
