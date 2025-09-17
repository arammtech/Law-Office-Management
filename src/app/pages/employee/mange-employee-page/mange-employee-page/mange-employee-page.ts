import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../../../../shared/components/page header/page-header-component/page-header-component';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../../components/add-employee/add-employee-component/add-employee-component';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-mange-employee-page',
  imports: [PageHeaderComponent, MatTableModule],
  templateUrl: './mange-employee-page.html',
  styleUrl: './mange-employee-page.css',
})
export class MangeEmployeePage {
  employees: IEmployeeRow[] = [
    {
      id: '1',
      name: 'عبدالعزيز حسن',
      role: 'مدير عام',
      natId: '2234048409',
      countryCode: 'نيجيريا',
      email: 'bdalzyzalbrnawy47@gmail.com',
    },
    {
      id: '1',
      name: 'عبدالعزيز حسن',
      role: 'مدير عام',
      natId: '2234048409',
      countryCode: 'نيجيريا',
      email: 'bdalzyzalbrnawy47@gmail.com',
    },
    {
      id: '1',
      name: 'عبدالعزيز حسن',
      role: 'مدير عام',
      natId: '2234048409',
      countryCode: 'نيجيريا',
      email: 'bdalzyzalbrnawy47@gmail.com',
    },
  ];

  displayedColumns: string[] = [
    'positon',
    'name',
    'natId',
    'email',
    'role',
    'countryName',
    'actions'
  ];
  constructor(private dialogof: MatDialog) {}

  addEmployee() {
    this.dialogof.open(AddEmployeeComponent, {
      height: '550px',
      minWidth: '400px',
    });
  }
}

export interface IEmployeeRow {
  id: string;
  name: string;
  natId: string;
  countryCode: string;
  role: string;
  email: string;
}
