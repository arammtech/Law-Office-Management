import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxSpinnerComponent } from 'ngx-spinner';

@Component({
  selector: 'app-user-layout',
  imports: [NgxSpinnerComponent, RouterModule],
  templateUrl: './user-layout.html',
  styleUrl: './user-layout.css'
})
export class UserLayout {

}
