import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerComponent } from "ngx-spinner";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, RouterModule, NgxSpinnerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('LawOfficeManagement');
}
