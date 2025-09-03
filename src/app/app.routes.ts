import { Routes } from '@angular/router';
import { Login } from './pages/auth/login/login/login';
import { HomeComponent } from './pages/home/home-component/home-component';
import { AddCaseComponent } from './pages/case/add-case/add-case-component/add-case-component';
import { AddClientComponent } from './pages/case/add-case/components/add-client/add-client-component/add-client-component';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'home', component: HomeComponent },
  { path: 'add-case', component: AddCaseComponent },
  { path: 'add-client', component: AddClientComponent },

];
