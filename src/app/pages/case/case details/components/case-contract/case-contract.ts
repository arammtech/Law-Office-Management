import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { AddContract } from '../../dialogs/add-contract/add-contract';
import { ContractType } from '../../directives/contract-type';

@Component({
  selector: 'app-case-contract',
  imports: [MatTableModule, ContractType],
  templateUrl: './case-contract.html',
  styleUrl: './case-contract.css',
})
export class CaseContract {
  displayedColumns: string[] = ['contractNumber', 'contractType'];

  contracts: IContractRaw[] = [
    { contractNumber: '47ع-', contractType: 'غير محددة بمدية' },
    { contractNumber: '47ع-', contractType: 'محددة ' },
    { contractNumber: '47ع-', contractType: ' محددة ' },
    { contractNumber: '47ع-', contractType: 'غير محددة بمدية' },
  ];

  constructor(private dialogof: MatDialog) {}

  openAddContract() {
    this.dialogof.open(AddContract, {
      height: '325x',
      minWidth: '600px',
    });
    // .afterClosed()
    // .subscribe((result: FormGroup<INewClientForm>) => {
    //   if (result) {
    //     if (result instanceof FormGroup) {
    //       console.log('abudlaziz');
    //     }
    //     this.addCaseForm?.controls.newClients?.push(result);
    //   }
    // });
  }
}

export interface IContractRaw {
  contractNumber: string;
  contractType: string;
}
