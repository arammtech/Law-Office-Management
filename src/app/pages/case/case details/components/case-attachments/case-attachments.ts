import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { AddAttachment } from '../add-attachment/add-attachment';

@Component({
  selector: 'app-case-attachments',
  imports: [MatTableModule],
  templateUrl: './case-attachments.html',
  styleUrl: './case-attachments.css',
})
export class CaseAttachments {
  attachments: IAttachmentRow[] = [
    { name: 'عبدالعزيز', raisedBy: 'عبدالعزيز', rasiedDate: '2025' },

  ];
  
  displayedColumns: string[] = ['name', 'raisedDate', 'raisedBy'];
  constructor(private dialogof: MatDialog) {}

  openAddAttachment() {
        this.dialogof.open(AddAttachment, {
          height: '325x',
          minWidth: '600px',
        });
  }
}

export interface IAttachmentRow {
  name: string;
  rasiedDate: string;
  raisedBy: string;
}
