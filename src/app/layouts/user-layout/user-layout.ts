import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerComponent } from 'ngx-spinner';

@Component({
  selector: 'app-user-layout',
  imports: [NgxSpinnerComponent, RouterOutlet],
  templateUrl: './user-layout.html',
  styleUrl: './user-layout.css'
})
export class UserLayout {

}
