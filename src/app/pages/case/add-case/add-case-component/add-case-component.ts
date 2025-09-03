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
      NatId: '1',
      Name: 'Abdulaziz',
      Address: 'Address',
      Phone: '0123456789',
      Birth: new Date(),
      CountryId: 1,
    },
    {
      NatId: '2',
      Name: 'Abdulaziz',
      Address: 'Address',
      Phone: '0123456789',
      Birth: new Date(),
      CountryId: 1,
    },
    {
      NatId: '3',
      Name: 'Abdulaziz',
      Address: 'Address',
      Phone: '0123456789',
      Birth: new Date(),
      CountryId: 1,
    },
  ];

  search(natId: string) {
    // backend logic
    // switch (Math.random()) {
    //   case 1:
    //     this.clients.push({ Id: 5, NatId: '1' });
    //     break;
    //   case 0:
    //     // show add client form
    //     this.dialogof.open(AddClientComponent);
    //     break;
    // }
    this.dialogof.open(AddClientComponent, {
      height: '325x',
      minWidth: '600px',
      data: { NatId: natId },
    }).afterClosed().subscribe((result:IClient | undefined) => {
      // save in the array
      console.log(result)
    });
    return;
  }

  deleteClient(natid: string) {
    this.clients = this.clients.filter((x) => x.NatId != natid);
  }
}
