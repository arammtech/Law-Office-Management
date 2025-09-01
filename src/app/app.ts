import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from "./pages/auth/login/login/login";
import { PageHeaderComponent } from "../shared/components/page header/page-header-component/page-header-component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PageHeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('LawOfficeManagement');
}
