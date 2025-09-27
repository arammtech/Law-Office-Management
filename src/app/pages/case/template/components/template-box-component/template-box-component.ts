import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-template-box-component',
  imports: [],
  templateUrl: './template-box-component.html',
  styleUrl: './template-box-component.css'
})
export class TemplateBoxComponent {
  @Input({required:true}) header:string = '';
}
