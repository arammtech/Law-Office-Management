import { Component, Input, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-case-details-component',
  imports: [MatTableModule],
  templateUrl: './case-details-component.html',
  styleUrl: './case-details-component.css',
})
export class CaseDetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  case!: ICseGeneralDetails;
  ngOnInit(): void {
    this.case = this.route.snapshot.data[
      'caseDetails'
    ] as ICseGeneralDetails;
  }
  displayedColumns: string[] = ['name', 'natId', 'phone', 'countryName'];
}

export interface ICseGeneralDetails {
  caseId: string;
  caseNumber: string;
  courtType: string;
  assignedLawyerName: string;
  status: string;
  caseParites: ICasesParties[];
}

export interface ICasesParties {
  clientId: string;
  name: string;
  natId: string;
  phoneNumber: string;
  countryCode: string;
}
