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
import { ICasesList, IDraftCaseRow } from '../../../../../core/models/requests';
import { ClsHelpers } from '../../../../../shared/util/helpers/cls-helpers';
import { ClsTableUtil } from '../../../../../shared/util/table/cls-table-util';
import { EmptyTable } from "../../../../../shared/components/empty-table/empty-table/empty-table";

@Component({
  selector: 'app-draft-cases-page',
  imports: [
    MatTableModule,
    PageHeaderComponent,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    EmptyTable
],
  providers: [
    {
      provide: MatPaginatorIntl,
      useValue: ClsTableUtil.getArabicPaginatorIntl(),
    },
  ],
  templateUrl: './draft-cases-page.html',
  styleUrl: './draft-cases-page.css'
})
export class DraftCasesPage implements OnInit, AfterViewInit {
  // ViewChild references for pagination and sorting
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Component properties
  currentPage: number = 0;
  draftCases!: ICasesList<IDraftCaseRow>;

  // Enhanced data source for table functionality
  draftCasesDataSource = new MatTableDataSource<IDraftCaseRow>([]);

  // Updated column definitions to match your template
  displayedColumns: string[] = [
    'index',     // # 
    'stats',     // الحالة
    'courtName', // المحكمة
    'subject',   // الموضوع
    'actions'    // الاجراءات
  ];

  constructor(
    public helper: ClsHelpers // Added helper for index calculation and other utilities
  ) {
    this.initializeDraftCases();
  }

  ngOnInit(): void {
    this.loadDraftCases();
  }

  ngAfterViewInit(): void {
    // Connect paginator and sort to data source
    this.draftCasesDataSource.paginator = this.paginator;
    this.draftCasesDataSource.sort = this.sort;

    // Configure custom filter predicate for Arabic text
    this.draftCasesDataSource.filterPredicate = (data: IDraftCaseRow, filter: string) => {
      const filterValue = filter.trim().toLowerCase();
      return (
        data.courtName?.toLowerCase().includes(filterValue) ||
        data.stats?.toLowerCase().includes(filterValue) ||
        data.subject?.toLowerCase().includes(filterValue) ||
        data.caseId?.toString().toLowerCase().includes(filterValue)
      );
    };
  }

  private initializeDraftCases(): void {
    this.draftCases = {} as ICasesList<IDraftCaseRow>;
    this.draftCases.items = [
      { courtName: 'التجارية', caseId: '1', stats: 'مسودة', subject: 'ارض' },
      { courtName: 'التجارية', caseId: '2', stats: 'مسودة', subject: 'ارض' },
      { courtName: 'الجزائية', caseId: '3', stats: 'معلقة', subject: 'عقار' },
      { courtName: 'المدنية', caseId: '4', stats: 'مسودة', subject: 'تجارية' },
      { courtName: 'التجارية', caseId: '5', stats: 'مسودة', subject: 'ارض' },
      { courtName: 'الأحوال الشخصية', caseId: '6', stats: 'قيد المراجعة', subject: 'نفقة' },
      { courtName: 'العمالية', caseId: '7', stats: 'مسودة', subject: 'تعويض' },
      { courtName: 'التجارية', caseId: '8', stats: 'معلقة', subject: 'دين' }
    ];
  }

  private loadDraftCases(): void {
    // Update the data source with draft cases data
    if (this.draftCases?.items && Array.isArray(this.draftCases.items)) {
      this.draftCasesDataSource.data = this.draftCases.items;
    } else {
      this.draftCasesDataSource.data = [];
    }

    // Reset to first page when data loads
    if (this.paginator) {
      this.paginator.firstPage();
    }
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
    console.log('Approving draft case:', draftCase);
    // Implement approval logic here
    // You might want to call a service method
    // this.draftCaseService.approveDraftCase(draftCase.caseId)
    
    // Update the status
    const index = this.draftCasesDataSource.data.findIndex(item => item.caseId === draftCase.caseId);
    if (index !== -1) {
      this.draftCasesDataSource.data[index].stats = 'معتمدة';
      // Trigger change detection
      this.draftCasesDataSource._updateChangeSubscription();
    }
  }

  deleteDraftCase(draftCase: IDraftCaseRow): void {
    console.log('Deleting draft case:', draftCase);
    // Implement deletion logic here
    // You might want to show a confirmation dialog first
    
    if (confirm('هل أنت متأكد من حذف هذه القضية المسودة؟')) {
      // Remove from data source
      const currentData = this.draftCasesDataSource.data;
      const updatedData = currentData.filter(item => item.caseId !== draftCase.caseId);
      this.draftCasesDataSource.data = updatedData;
      
      // Update the original data as well
      this.draftCases.items = updatedData;
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
      'مسودة': 'text-warning',
      'معلقة': 'text-info', 
      'معتمدة': 'text-success',
      'قيد المراجعة': 'text-primary',
      'مرفوضة': 'text-danger',
    };

    return statusMap[status] || 'text-muted';
  }

  // Get status badge class (optional helper)
  getStatusBadgeClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      'مسودة': 'badge bg-warning',
      'معلقة': 'badge bg-info',
      'معتمدة': 'badge bg-success',
      'قيد المراجعة': 'badge bg-primary',
      'مرفوضة': 'badge bg-danger',
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