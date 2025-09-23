import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { CaseStatus } from '../../../cases list/directives/case-status/case-status';
import { ClsHelpers } from '../../../../../../shared/util/helpers/cls-helpers';
import { ClsTableUtil } from '../../../../../../shared/util/table/cls-table-util';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-case-details-component',
  standalone: true,
  providers: [
    {
      provide: MatPaginatorIntl,
      useValue: ClsTableUtil.getArabicPaginatorIntl(),
    },
  ],
  imports: [MatTableModule, CaseStatus, MatPaginator, MatSortModule, DatePipe],
  templateUrl: './case-details-component.html',
  styleUrl: './case-details-component.css',
})
export class CaseDetailsComponent implements OnInit {
  case!: ICseGeneralDetails;
  displayedColumns: string[] = [
    'index',
    'name',
    'natId',
    'phone',
    'birthDate',
    'countryName',
    'address',
  ];
  partiesDataSource = new MatTableDataSource<ICasesParties>();
  currentPage = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private route: ActivatedRoute, public helper: ClsHelpers) {}

  ngOnInit(): void {
    this.case = this.route.snapshot.data['caseDetails'] as ICseGeneralDetails;
    this.partiesDataSource.data = this.case.caseParities;
  }

  ngAfterViewInit(): void {
    this.partiesDataSource.paginator = this.paginator;
    this.partiesDataSource.sort = this.sort;
  }

  filterParties(event: Event): void {
    const value = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.partiesDataSource.filter = value;
  }

  handlePage(event: any): void {
    this.currentPage = event.pageIndex;
  }
}

export interface ICseGeneralDetails {
  caseId: string;
  caseNumber: string;
  caseSubject: string;
  caseParities: ICasesParties[];
  clientRequests: string;
  estimatedDate: Date;
  status: string;
  layerOpinion: string;
  assignedEmployeeName: string;
  employeeName: string; // employee created the case
  courtTypeName: string;
  createdDate: Date;
}

export interface ICasesParties {
  clientId: string;
  name: string;
  natId: string;
  phoneNumber: string;
  countryCode: string;
  address: string;
  birthDate: Date;
}
