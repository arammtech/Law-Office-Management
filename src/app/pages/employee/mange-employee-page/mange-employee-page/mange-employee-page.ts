import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../../../../shared/components/page header/page-header-component/page-header-component';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../../components/add-employee/add-employee-component/add-employee-component';

@Component({
  selector: 'app-mange-employee-page',
  imports: [PageHeaderComponent],
  templateUrl: './mange-employee-page.html',
  styleUrl: './mange-employee-page.css',
})
export class MangeEmployeePage {
  /**
   *
   */
  constructor(private dialogof: MatDialog) {}

  addEmployee() {
    this.dialogof.open(AddEmployeeComponent, {
      height: '550px',
      minWidth: '400px',
    });
  }
}
