import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../../../../shared/components/page header/page-header-component/page-header-component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IClient } from '../models/icase';
import { MatDialog } from '@angular/material/dialog';
import { AddClientComponent } from '../components/add-client/add-client-component/add-client-component';

@Component({
  selector: 'app-add-case-component',
  standalone: true,
  imports: [PageHeaderComponent, FormsModule, CommonModule],
  templateUrl: './add-case-component.html',
  styleUrl: './add-case-component.css',
})
export class AddCaseComponent {
  constructor(private dialogof: MatDialog) {
    this.natId = '';
  }
  showcontract: boolean = false;
  showPOA: boolean = false;
  selectedContract: number = 1;
  natId: string;

  clients: IClient[] = [
    {
      natId: '1',
      name: 'Abdulaziz',
      address: 'Address',
      phone: '0123456789',
      birth: new Date(),
      countryId: 1,
    },
    {
      natId: '2',
      name: 'Abdulaziz',
      address: 'Address',
      phone: '0123456789',
      birth: new Date(),
      countryId: 1,
    },
    {
      natId: '3',
      name: 'Abdulaziz',
      address: 'Address',
      phone: '0123456789',
      birth: new Date(),
      countryId: 1,
    },
  ];

  search(natId: string) {
    this.dialogof
      .open(AddClientComponent, {
        height: '325x',
        minWidth: '600px',
        data: { NatId: natId },
      })
      .afterClosed()
      .subscribe((result: IClient | undefined) => {
        if (result) {
          this.clients.push(result)
        }
      });
    return;
  }

  deleteClient(natid: string) {
    this.clients = this.clients.filter((x) => x.natId != natid);
  }
}
