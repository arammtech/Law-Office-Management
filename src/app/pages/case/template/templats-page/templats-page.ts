import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '../../../../../shared/components/page header/page-header-component/page-header-component';
import { TemplateBoxComponent } from '../components/template-box-component/template-box-component';
import { IListDTO, ITemplateBox } from '../../../../../core/models/requests';
import { AddTemplateDialog } from '../dialogs/add-template-dialog/add-template-dialog';
import { DialogRef } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-templats-page',
  imports: [PageHeaderComponent, TemplateBoxComponent],
  templateUrl: './templats-page.html',
  styleUrl: './templats-page.css',
})
export class TemplatesPage implements OnInit {
  templates: ITemplateBox[] = {} as ITemplateBox[];

  /**
   *
   */
  constructor(private dilogRef:MatDialog) {
    
  }
  
  ngOnInit(): void {
    this.templates = [
      {
        id: '1',
        name: 'نموذج عقد',
        filePath: 'path',
      },
      {
        id: '2',
        name: 'نموذج استرحام',
        filePath: 'path',
      },{
        id: '3',
        name: 'نموذج عرض سعر',
        filePath: 'path',
      },{
        id: '4',
        name: 'نموذج طلب رفض',
        filePath: 'path',
      },
    ];
  }
  addTemplate() {
      this.dilogRef.open(AddTemplateDialog, {
        height: '450px',
        minWidth: '400px',
      });
  }
}
