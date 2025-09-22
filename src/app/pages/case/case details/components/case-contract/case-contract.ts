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
  ],
  templateUrl: './case-contract.html',
  styleUrl: './case-contract.css',
})
export class CaseContract implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['index', 'contractNumber', 'contractType'];
  contractsDataSource = new MatTableDataSource<IContractRaw>();
  caseId: string = '';
  currentPage = 0;

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
        this.contractsDataSource.data = res;
        console.log(res);
      },
    });
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
export interface IContractRaw {
  contractNumber: string;
  contractType: string;
}
