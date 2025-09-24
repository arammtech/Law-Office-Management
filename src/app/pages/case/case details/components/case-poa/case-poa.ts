import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { AddPoaDialog } from '../../dialogs/add-poa/add-poa';
import { ClsTableUtil } from '../../../../../../shared/util/table/cls-table-util';
import { EmptyTable } from '../../../../../../shared/components/empty-table/empty-table/empty-table';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-case-poa',
  standalone: true,
  providers: [
    {
      provide: MatPaginatorIntl,
      useValue: ClsTableUtil.getArabicPaginatorIntl(),
    },
  ],
  imports: [MatTableModule, MatPaginator, MatSortModule, EmptyTable],
  templateUrl: './case-poa.html',
  styleUrl: './case-poa.css',
})
export class CasePoa implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'index',
    'POAnumber',
    'POAissueDate',
    'authorizedBy',
  ];
  POAsDataSource = new MatTableDataSource<IPOARow>();
  currentPage = 0;
  caseId: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialogof: MatDialog,
    private activatedRoute: ActivatedRoute
  ) {
    const initialData: IPOARow[] = [
      { authorizedBy: 'عبدالعزيز', POAnumber: '4545', POAissueDate: '2025' },
      { authorizedBy: 'عبدالعزيز', POAnumber: '4545', POAissueDate: '2025' },
      { authorizedBy: 'عبدالعزيز', POAnumber: '4545', POAissueDate: '2025' },
      { authorizedBy: 'عبدالعزيز', POAnumber: '4545', POAissueDate: '2025' },
      { authorizedBy: 'عبدالعزيز', POAnumber: '4545', POAissueDate: '2025' },
    ];
    this.POAsDataSource.data = initialData;
  }
  ngOnInit(): void {
    this.activatedRoute.parent?.params.subscribe((params) => {
      this.caseId = params['caseId'] || '';
    });
  }

  ngAfterViewInit(): void {
    this.POAsDataSource.paginator = this.paginator;
    this.POAsDataSource.sort = this.sort;
  }

  filterPOAs(event: Event): void {
    const value = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.POAsDataSource.filter = value;
  }

  handlePage(event: any): void {
    this.currentPage = event.pageIndex;
  }

  openAddPOA(): void {
    this.dialogof.open(AddPoaDialog, {
      height: '325x',
      minWidth: '600px',
      data: { caseId: this.caseId },
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

export interface IPOARow {
  POAnumber: string;
  POAissueDate: string;
  authorizedBy: string;
}
