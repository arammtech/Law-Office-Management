import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import {
  MatPaginator,
  MatPaginatorModule,
  MatPaginatorIntl,
  PageEvent,
} from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AddAttachment } from '../../dialogs/add-attachment/add-attachment';
import { ClsTableUtil } from '../../../../../../shared/util/table/cls-table-util';
import { ClsHelpers } from '../../../../../../shared/util/helpers/cls-helpers';
import { EmptyTable } from "../../../../../../shared/components/empty-table/empty-table/empty-table";

export interface IAttachmentRow {
  id?: string;
  name: string;
  rasiedDate: string;
  raisedBy: string;
  fileSize?: string;
  fileType?: string;
  filePath?: string;
}

@Component({
  selector: 'app-case-attachments',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    DatePipe,
    EmptyTable
],
  providers: [
    {
      provide: MatPaginatorIntl,
      useValue: ClsTableUtil.getArabicPaginatorIntl(),
    },
  ],
  templateUrl: './case-attachments.html',
  styleUrl: './case-attachments.css',
})
export class CaseAttachments implements OnInit, AfterViewInit {
  // ViewChild references for pagination and sorting
  @ViewChild(MatPaginator) paginator : MatPaginator = {} as MatPaginator;
  @ViewChild(MatSort) sort: MatSort = {} as MatSort;

  // Component properties
  currentPage: number = 0;
  attachments: IAttachmentRow[] = [];

  // Enhanced data source for table functionality
  attachmentsDataSource = new MatTableDataSource<IAttachmentRow>([]);

  // Updated column definitions to match enhanced template
  displayedColumns: string[] = [
    'index',      // #
    'name',       // اسم المرفق
    'rasiedDate', // تاريخ رفع المرفق
    'raisedBy',   // الموظف
    'actions'     // الإجراءات
  ];

  constructor(
    private dialogof: MatDialog,
    public helper: ClsHelpers // Added helper for utilities
  ) {
    this.initializeAttachments();
  }

  ngOnInit(): void {
    this.loadAttachments();
  }

  ngAfterViewInit(): void {
    // Connect paginator and sort to data source
    this.attachmentsDataSource.paginator = this.paginator;
    this.attachmentsDataSource.sort = this.sort;

    // // Configure custom filter predicate for Arabic text
    // this.attachmentsDataSource.filterPredicate = (data: IAttachmentRow, filter: string) => {
    //   const filterValue = filter.trim().toLowerCase();
    //   return (
    //     data.name?.toLowerCase().includes(filterValue) ||
    //     data.raisedBy?.toLowerCase().includes(filterValue) ||
    //     data.rasiedDate?.toLowerCase().includes(filterValue) ||
    //     data.fileType?.toLowerCase().includes(filterValue)
    //   );
    // };
  }

  private initializeAttachments(): void {
    this.attachments = [
      { 
        id: '1',
        name: 'عقد الإيجار الأساسي', 
        raisedBy: 'عبدالعزيز أحمد', 
        rasiedDate: '2024-12-15',
        fileSize: '2.5 MB',
        fileType: 'PDF',
        filePath: '/uploads/contract1.pdf'
      },
      { 
        id: '2',
        name: 'تقرير الخبرة القانونية', 
        raisedBy: 'فاطمة محمد', 
        rasiedDate: '2024-12-10',
        fileSize: '1.8 MB',
        fileType: 'PDF',
        filePath: '/uploads/report1.pdf'
      },
      { 
        id: '3',
        name: 'صور المستندات المطلوبة', 
        raisedBy: 'خالد سالم', 
        rasiedDate: '2024-12-08',
        fileSize: '5.2 MB',
        fileType: 'ZIP',
        filePath: '/uploads/documents.zip'
      },
      { 
        id: '4',
        name: 'مراسلات المحكمة', 
        raisedBy: 'نورا علي', 
        rasiedDate: '2024-12-05',
        fileSize: '800 KB',
        fileType: 'PDF',
        filePath: '/uploads/court_letters.pdf'
      },
      { 
        id: '5',
        name: 'شهادات الشهود', 
        raisedBy: 'عبدالعزيز أحمد', 
        rasiedDate: '2024-12-03',
        fileSize: '1.2 MB',
        fileType: 'PDF',
        filePath: '/uploads/witness_statements.pdf'
      }
    ];
  }

  private loadAttachments(): void {
    // Update the data source with attachments data
    if (this.attachments && Array.isArray(this.attachments)) {
      this.attachmentsDataSource.data = this.attachments;
    } else {
      this.attachmentsDataSource.data = [];
    }

    // Reset to first page when data loads
    // if (this.paginator) {
    //   this.paginator.firstPage();
    // }
  }

  // Filter function for search
  filter(event: any): void {
    const filterValue = event.target.value?.trim() || '';
    this.attachmentsDataSource.filter = filterValue;

    // Reset to first page when filtering
    if (this.attachmentsDataSource.paginator) {
      this.attachmentsDataSource.paginator.firstPage();
    }
  }

  // Filter by employee
  filterByEmployee(event: any): void {
    const employeeName = event.target.value?.trim() || '';
    if (employeeName) {
      this.attachmentsDataSource.filter = employeeName;
    } else {
      this.attachmentsDataSource.filter = '';
    }

    // Reset to first page when filtering
    if (this.attachmentsDataSource.paginator) {
      this.attachmentsDataSource.paginator.firstPage();
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

  // Action methods
  downloadAttachment(attachment: IAttachmentRow): void {
    console.log('Downloading attachment:', attachment);
    // Implement download logic here
    // Example: window.open(attachment.filePath, '_blank');
    
    // Create a temporary download link
    const link = document.createElement('a');
    link.href = attachment.filePath || '#';
    link.download = attachment.name;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  viewAttachment(attachment: IAttachmentRow): void {
    console.log('Viewing attachment:', attachment);
    // Implement view logic here
    // For PDFs, you might want to open in a new tab or modal
    if (attachment.filePath) {
      window.open(attachment.filePath, '_blank');
    }
  }

  deleteAttachment(attachment: IAttachmentRow): void {
    console.log('Deleting attachment:', attachment);
    
    if (confirm(`هل أنت متأكد من حذف المرفق "${attachment.name}"؟`)) {
      // Remove from data source
      const currentData = this.attachmentsDataSource.data;
      const updatedData = currentData.filter(item => item.id !== attachment.id);
      this.attachmentsDataSource.data = updatedData;
      
      // Update the original array as well
      this.attachments = updatedData;
      
      console.log('Attachment deleted successfully');
      // Here you would typically call an API to delete from server
      // this.attachmentService.deleteAttachment(attachment.id)
    }
  }

  openAddAttachment(): void {
    const dialogRef = this.dialogof.open(AddAttachment, {
      height: '400px',
      minWidth: '600px',
      maxWidth: '800px',
      disableClose: true,
      data: {
        title: 'إضافة مرفق جديد'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Add the new attachment to the data source
        const newAttachment: IAttachmentRow = {
          id: Date.now().toString(), // Generate unique ID
          name: result.name || 'مرفق جديد',
          raisedBy: result.raisedBy || 'المستخدم الحالي',
          rasiedDate: new Date().toISOString().split('T')[0],
          fileSize: result.fileSize || 'غير معروف',
          fileType: result.fileType || 'غير معروف',
          filePath: result.filePath || ''
        };

        // Add to both arrays
        this.attachments.push(newAttachment);
        const currentData = this.attachmentsDataSource.data;
        this.attachmentsDataSource.data = [...currentData, newAttachment];

        console.log('New attachment added:', newAttachment);
      }
    });
  }

  // Utility methods
  getTotalAttachments(): number {
    return this.attachmentsDataSource?.data?.length || 0;
  }

  getFilteredAttachments(): number {
    return this.attachmentsDataSource?.filteredData?.length || 0;
  }

  hasData(): boolean {
    return this.getTotalAttachments() > 0;
  }

  getUniqueEmployees(): string[] {
    const employees = this.attachments.map(att => att.raisedBy).filter(Boolean);
    return [...new Set(employees)].sort();
  }

  // Get file type icon class
  getFileTypeIcon(fileType: string): string {
    const iconMap: { [key: string]: string } = {
      'PDF': 'fa-file-pdf text-danger',
      'DOC': 'fa-file-word text-primary',
      'DOCX': 'fa-file-word text-primary',
      'XLS': 'fa-file-excel text-success',
      'XLSX': 'fa-file-excel text-success',
      'PNG': 'fa-file-image text-info',
      'JPG': 'fa-file-image text-info',
      'JPEG': 'fa-file-image text-info',
      'ZIP': 'fa-file-archive text-warning',
      'RAR': 'fa-file-archive text-warning',
    };

    return iconMap[fileType?.toUpperCase()] || 'fa-file text-muted';
  }

  // Export functionality
  exportAttachmentsList(): void {
    const dataToExport = this.attachmentsDataSource.filteredData.map(att => ({
      'اسم المرفق': att.name,
      'تاريخ الرفع': att.rasiedDate,
      'رفع بواسطة': att.raisedBy,
      'نوع الملف': att.fileType,
      'حجم الملف': att.fileSize
    }));
    
    console.log('Exporting attachments list:', dataToExport);
    // Implement CSV export logic here
  }

  // Refresh data
  refreshData(): void {
    this.loadAttachments();
  }

  // Clear filters
  clearFilter(): void {
    this.attachmentsDataSource.filter = '';
  }

  // Bulk actions (optional)
  downloadSelectedAttachments(): void {
    console.log('Bulk download selected attachments');
    // Implement bulk download logic
  }

  deleteSelectedAttachments(): void {
    console.log('Bulk delete selected attachments');
    // Implement bulk deletion logic
  }
}