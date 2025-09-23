import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import {
  MatPaginator,
  MatPaginatorModule,
  MatPaginatorIntl,
  PageEvent,
} from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../../../../../shared/components/page header/page-header-component/page-header-component';
import {
  IListDTO,
  IDraftCaseRow,
  ICaseRow,
} from '../../../../../core/models/requests';
import { ClsHelpers } from '../../../../../shared/util/helpers/cls-helpers';
import { ClsTableUtil } from '../../../../../shared/util/table/cls-table-util';
import { EmptyTable } from '../../../../../shared/components/empty-table/empty-table/empty-table';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CaseService } from '../../services/case-service';
import { enCaseStatus } from '../../../../../shared/enums/case-status';

@Component({
  selector: 'app-draft-cases-page',
  imports: [
    MatTableModule,
    PageHeaderComponent,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    EmptyTable,
    DatePipe,
    RouterLink,
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useValue: ClsTableUtil.getArabicPaginatorIntl(),
    },
  ],
  templateUrl: './draft-cases-page.html',
  styleUrl: './draft-cases-page.css',
})
export class DraftCasesPage implements OnInit, AfterViewInit {
  // ViewChild references for pagination and sorting
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Component properties
  currentPage: number = 0;
  draftCases: IListDTO<ICaseRow> = {} as IListDTO<ICaseRow>;

  // Enhanced data source for table functionality
  draftCasesDataSource = new MatTableDataSource<ICaseRow>([]);

  displayedColumns: string[] = [
    'index',
    'fileNumber',
    'caseNumber',
    'status',
    'courtTypeName',
    'createdDate',
    'employeeName',
    'caseSubject',
    'details',
  ];

  constructor(public helper: ClsHelpers, private caseService: CaseService) {
    this.draftCasesDataSource.data = [
      {
        caseId: 'CR-001',
        employeeName: 'أحمد الزهراني',
        caseSubject: 'نزاع عقاري',
        courtTypeName: 'محكمة عامة',
        status: 'مفتوحة',
        caseNumber: 'CN-1001',
        fileNumber: 'FN-2001',
        createdDate: new Date('2025-08-01'),
      },
      {
        caseId: 'CR-002',
        employeeName: 'سارة العتيبي',
        caseSubject: 'سرقة',
        courtTypeName: 'محكمة جزائية',
        status: 'مغلقة',
        caseNumber: 'CN-1002',
        fileNumber: 'FN-2002',
        createdDate: new Date('2025-07-15'),
      },
      {
        caseId: 'CR-003',
        employeeName: 'خالد الحربي',
        caseSubject: 'طلاق',
        courtTypeName: 'محكمة أحوال شخصية',
        status: 'معلقة',
        caseNumber: 'CN-1003',
        fileNumber: 'FN-2003',
        createdDate: new Date('2025-06-20'),
      },
      {
        caseId: 'CR-004',
        employeeName: 'نورة القحطاني',
        caseSubject: 'تجاري',
        courtTypeName: 'محكمة تجارية',
        status: 'مفتوحة',
        caseNumber: 'CN-1004',
        fileNumber: 'FN-2004',
        createdDate: new Date('2025-09-10'),
      },
      {
        caseId: 'CR-005',
        employeeName: 'فهد السبيعي',
        caseSubject: 'إرث',
        courtTypeName: 'محكمة عامة',
        status: 'مغلقة',
        caseNumber: 'CN-1005',
        fileNumber: 'FN-2005',
        createdDate: new Date('2025-05-30'),
      },
    ];
    this.draftCases.items = this.draftCasesDataSource.data;
  }

  ngOnInit(): void {
    this.loadDraftCases();
  }

  ngAfterViewInit(): void {
    // Connect paginator and sort to data source
    this.draftCasesDataSource.paginator = this.paginator;
    this.draftCasesDataSource.sort = this.sort;
  }

  private loadDraftCases(): void {
    // Update the data source with draft cases data
    // if (this.draftCases?.items && Array.isArray(this.draftCases.items)) {
    //   this.draftCasesDataSource.data = this.draftCases.items;
    // } else {
    //   this.draftCasesDataSource.data = [];
    // }
    // // Reset to first page when data loads
    // if (this.paginator) {
    //   this.paginator.firstPage();
    // }
  }

  // Filter function for search
  filter(event: any): void {
    const filterValue = event.target.value?.trim() || '';
    this.draftCasesDataSource.filter = filterValue;

    // Reset to first page when filtering
    if (this.draftCasesDataSource.paginator) {
      this.draftCasesDataSource.paginator.firstPage();
    }
  }

  // Handle pagination changes
  handlePage(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    console.log('Page changed:', event);
  }

  // Handle sort changes
  handleSort(sortState: Sort): void {
    console.log('Sort changed:', sortState);
  }

  // Action methods for buttons
  approveDraftCase(draftCase: IDraftCaseRow): void {
    this.caseService
      .updateCaseStatus(draftCase.caseId, enCaseStatus.UnderReview)
      .subscribe(() => {
        // Update the status
        const index = this.draftCasesDataSource.data.findIndex(
          (item) => item.caseId === draftCase.caseId
        );
        if (index !== -1) {
          this.draftCasesDataSource.data[index].status = 'معتمدة';
          // Trigger change detection
          this.draftCasesDataSource._updateChangeSubscription();
        }
      });
  }

  cancelDraftCase(draftCase: IDraftCaseRow): void {
    if (confirm('هل أنت متأكد من إلغاء هذه القضية')) {
      this.caseService
        .updateCaseStatus(draftCase.caseId, enCaseStatus.Cancelled)
        .subscribe(() => {
          // Remove from data source
          this.draftCasesDataSource.data =
            this.draftCasesDataSource.data.filter(
              (c) => c.caseId != draftCase.caseId
            );
        });
    }
  }

  // Utility methods
  getTotalDraftCases(): number {
    return this.draftCasesDataSource?.data?.length || 0;
  }

  getFilteredDraftCases(): number {
    return this.draftCasesDataSource?.filteredData?.length || 0;
  }

  hasData(): boolean {
    return this.getTotalDraftCases() > 0;
  }

  isLoading(): boolean {
    // Add loading state if needed
    return false;
  }

  // Export functionality (optional)
  exportData(): void {
    const dataToExport = this.draftCasesDataSource.filteredData;
    console.log('Exporting draft cases data:', dataToExport);
    // Implement your export logic here
  }

  // Refresh data
  refreshData(): void {
    this.loadDraftCases();
  }

  // Clear filters
  clearFilter(): void {
    this.draftCasesDataSource.filter = '';
  }

  // Get status color class (optional helper)
  getStatusClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      مسودة: 'text-warning',
      معلقة: 'text-info',
      معتمدة: 'text-success',
      'قيد المراجعة': 'text-primary',
      مرفوضة: 'text-danger',
    };

    return statusMap[status] || 'text-muted';
  }

  // Get status badge class (optional helper)
  getStatusBadgeClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      مسودة: 'badge bg-warning',
      معلقة: 'badge bg-info',
      معتمدة: 'badge bg-success',
      'قيد المراجعة': 'badge bg-primary',
      مرفوضة: 'badge bg-danger',
    };

    return statusMap[status] || 'badge bg-secondary';
  }

  // Bulk actions (optional)
  approveSelectedCases(): void {
    // Implement bulk approval logic
    console.log('Bulk approve selected cases');
  }

  deleteSelectedCases(): void {
    // Implement bulk deletion logic
    console.log('Bulk delete selected cases');
  }

  // Search and filter helpers
  searchByStatus(status: string): void {
    this.draftCasesDataSource.filter = status;
  }

  searchByCourt(courtName: string): void {
    this.draftCasesDataSource.filter = courtName;
  }

  resetFilters(): void {
    this.draftCasesDataSource.filter = '';
    if (this.paginator) {
      this.paginator.firstPage();
    }
  }
}
