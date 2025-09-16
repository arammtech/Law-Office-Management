import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { AddContract } from '../../dialogs/add-contract/add-contract';
import { ContractType } from '../../directives/contract-type';
import { CaseService } from '../../../services/case-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-case-contract',
  imports: [MatTableModule, ContractType],
  templateUrl: './case-contract.html',
  styleUrl: './case-contract.css',
})
export class CaseContract implements OnInit {
  displayedColumns: string[] = ['contractNumber', 'contractType'];
  caseId: string = '';
  contracts: IContractRaw[] = [];

  constructor(
    private dialogof: MatDialog,
    private activatedRoute: ActivatedRoute,
    private caseService: CaseService
  ) {}
  ngOnInit(): void {
    this.activatedRoute.parent?.params.subscribe((params) => {
      this.caseId = params['caseId'] || '';
    });
    this.caseService.getCaseContracts(this.caseId).subscribe({
      next: (res) => {
        this.contracts = res;
        console.log(this.contracts);
      },
    });
  }

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
