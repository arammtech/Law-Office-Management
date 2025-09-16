import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '../../../../../shared/components/page header/page-header-component/page-header-component';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-case-details-page',
  imports: [PageHeaderComponent, RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './case-details-page.html',
  styleUrl: './case-details-page.css',
})
export class CaseDetailsPage {
  csesId!:string;
  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
    this.csesId = params.get('caseId')??'';
  });
  }
}
