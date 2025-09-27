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

@Component({
  selector: 'app-case-judgments-components',
  imports: [MatPaginatorModule, MatTableModule, DatePipe, EmptyTable],
  templateUrl: './case-judgments-components.html',
  styleUrl: './case-judgments-components.css',
})
export class CaseJudgmentsComponents implements OnInit{
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
    private contractService: ContractService,
    public helper: ClsHelpers
  ) {}

  ngOnInit(): void {
    this.activatedRoute.parent?.params.subscribe((params) => {
      this.caseId = params['caseId'] || '';
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
