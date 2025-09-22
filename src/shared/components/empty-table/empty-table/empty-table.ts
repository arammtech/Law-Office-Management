import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-table',
  imports: [],
  templateUrl: './empty-table.html',
  styleUrl: './empty-table.css',
})
export class EmptyTable {
  @Input() title: string = '';
  @Input() msg: string = '';
}
