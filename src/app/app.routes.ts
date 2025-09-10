import { Routes } from '@angular/router';
import { Login } from './pages/auth/login/login/login';
import { HomeComponent } from './pages/home/home-component/home-component';
import { AddCaseComponent } from './pages/case/add-case/add-case-page/add-case-page';
import { AddClientComponent } from './pages/case/add-case/components/add-client/add-client-component/add-client-component';
import { MangeEmployeePage } from './pages/employee/mange-employee-page/mange-employee-page/mange-employee-page';
import { courtResolverResolver } from './pages/case/resolvers/court-resolver-resolver';
import { employeeNamesResolver } from './pages/case/resolvers/employee/employee-names-resolver';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'home', component: HomeComponent },
  {
    path: 'add-case',
    component: AddCaseComponent,
    resolve: {
      court: courtResolverResolver,
      employeeNames: employeeNamesResolver,
    },
  },
  { path: 'add-client', component: AddClientComponent },
  { path: 'employees', component: MangeEmployeePage },
];
