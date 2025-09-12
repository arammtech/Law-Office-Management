import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '../../../../../../shared/components/page header/page-header-component/page-header-component';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { ICourt } from '../../../models/icourt';
import { MatTableModule } from '@angular/material/table';
import { ICaseRow } from '../../models/i-case-row';
import { ICasesList } from '../../models/i-cases-list';
import { CaseService } from '../../../services/case-service';
import { FormsModule, NgModel } from '@angular/forms';
import { ICourtDetaills } from '../../models/icourt-detaills';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
@Component({
  selector: 'app-cases-list-page',
  imports: [
    PageHeaderComponent,
    MatTableModule,
    FormsModule,
    RouterLink
],
  templateUrl: './cases-list-page.html',
  styleUrl: './cases-list-page.css',
})
export class CasesListPage implements OnInit {
  courts!: ICourtDetaills[];
  tableRowsData!: ICaseRow[];
  casesList!: ICasesList;
  selectedYear!:string;
  selectedCourt!:ICourtDetaills;
  displayedColumns: string[] = [
    'position',
    'name',
    'weight',
    'symbol',
    'التفاصيل ',
  ];
  constructor(
    private activatedRoute: ActivatedRoute,
    private caseService: CaseService
  ) {}

  ngOnInit(): void {
    this.courts = this.activatedRoute.snapshot.data['court'] as ICourtDetaills[];
    this.selectedCourt = this.courts[0];
    this.selectedYear = this.selectedCourt?.years[0]
    this.updateTableData(this.selectedCourt.courtTypeId, this.selectedYear);
  }

  onCourtChange(court: ICourtDetaills) {
    // this.caseService.getYearsForCourt(courtId).subscribe({
    //   next: (years) => {
    //     this.years = years;
    //     this.courtChanged(courtId);
    //   },
    // });
    this.selectedCourt = court;
    console.log('entered on court chagne');
  }

  yearChanged(year: string) {
    this.selectedYear = year;
    console.log(this.selectedYear);
    // this.updateTableData(this.courtId, this.year);
    // console.log('entered year change');
  }

  
  courtChanged(courtId: string) {
    // this.courtId = courtId;
    // this.updateTableData(this.courtId, this.year);
    // console.log('entered court change');
  }

  updateTableData(courtId: string, year: string) {
    console.log(`court: ${courtId} and the year is ${year}`)
    this.caseService.getCasesList(courtId, year).subscribe({
      next: (data) => {
        this.casesList = data;
        console.log(data)
      },
    });
  }
}
