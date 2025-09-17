import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '../../../../../../shared/components/page header/page-header-component/page-header-component';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { CaseService } from '../../../services/case-service';
import { FormsModule, NgModel } from '@angular/forms';
import { CaseStatus } from '../../directives/case-status/case-status';
import { NgClass } from '@angular/common';
import { ICourtDetaills, ICaseRow, ICasesList } from '../../../../../../core/models/requests';


@Component({
  selector: 'app-cases-list-page',
  imports: [
    PageHeaderComponent,
    MatTableModule,
    FormsModule,
    RouterLink,
    CaseStatus,
    NgClass,
  ],
  templateUrl: './cases-list-page.html',
  styleUrl: './cases-list-page.css',
})
export class CasesListPage implements OnInit {
  setActiveButton(code: number) {
    this.activeButton = code
  }
  activeButton:number = 100;
  courts!: ICourtDetaills[];
  tableRowsData!: ICaseRow[];
  casesList!: ICasesList<ICaseRow>;
  selectedYear!: string;
  selectedCourt!: ICourtDetaills;
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
    this.courts = this.activatedRoute.snapshot.data[
      'court'
    ] as ICourtDetaills[];
    this.selectedCourt = this.courts[0];
    this.selectedYear = this.selectedCourt?.years[0];
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
  }

  yearChanged(year: string) {
    this.selectedYear = year;
    // this.updateTableData(this.courtId, this.year);
    // console.log('entered year change');
  }

  courtChanged(courtId: string) {
    // this.courtId = courtId;
    // this.updateTableData(this.courtId, this.year);
    // console.log('entered court change');
  }

  updateTableData(courtId: string, year: string) {
    this.caseService.getCasesList(courtId, year).subscribe({
      next: (data) => {
        this.casesList = data;
      },
    });
  }
}
