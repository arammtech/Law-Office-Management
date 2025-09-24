import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ClsHelpers {
  getCurrentRowNumber(currentRow: number, pageIndex: number, pageSize: number) {
    return currentRow + 1 + pageIndex * pageSize;
  }

  formatDateForInput(dateString: Date): string {
    return dateString.toISOString().split('T')[0];
  }
}
