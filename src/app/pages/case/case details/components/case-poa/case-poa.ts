import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { AddPoa } from '../add-poa/add-poa';

@Component({
  selector: 'app-case-poa',
  imports: [MatTableModule],
  templateUrl: './case-poa.html',
  styleUrl: './case-poa.css',
})
export class CasePoa {
  POAs: IPOARow[] = [
    { authorizedBy: 'عبدالعزيز', POAnumber: '4545', POAissueDate: '2025' },
    { authorizedBy: 'عبدالعزيز', POAnumber: '4545', POAissueDate: '2025' },
    { authorizedBy: 'عبدالعزيز', POAnumber: '4545', POAissueDate: '2025' },
    { authorizedBy: 'عبدالعزيز', POAnumber: '4545', POAissueDate: '2025' },
    { authorizedBy: 'عبدالعزيز', POAnumber: '4545', POAissueDate: '2025' },
  ];

  displayedColumns: string[] = ['poaNumber', 'poaIssueDate', 'authrizedBy'];
  constructor(private dialogof: MatDialog) {}

  openAddPOA() {
    this.dialogof.open(AddPoa, {
      height: '325x',
      minWidth: '600px',
    });
  }
}

export interface IPOARow {
  POAnumber: string;
  POAissueDate: string;
  authorizedBy: string;
}
