import { Routes } from '@angular/router';
import { Login } from './pages/auth/login/login/login';
import { HomeComponent } from './pages/home/home-component/home-component';
import { AddCaseComponent } from './pages/case/add-case/add-case-page/add-case-page';
import { MangeEmployeePage } from './pages/employee/mange-employee-page/mange-employee-page/mange-employee-page';
import { courtResolverResolver } from './pages/case/resolvers/court-resolver-resolver';
import { employeeNamesResolver } from './pages/case/resolvers/employee/employee-names-resolver';
import { CasesListPage } from './pages/case/cases list/cases-list-page/cases-list-page/cases-list-page';
import { CaseDetailsPage } from './pages/case/case details/case-details-page/case-details-page';
import { CaseDetailsComponent } from './pages/case/case details/components/case-details-component/case-details-component';
import { caseDetailsResolverResolver } from './pages/case/resolvers/case/case-details-resolver-resolver';
import { CaseContract } from './pages/case/case details/components/case-contract/case-contract';
import { CasePoa } from './pages/case/case details/components/case-poa/case-poa';
import { CaseAttachments } from './pages/case/case details/components/case-attachments/case-attachments';
import { App } from './app';

export const routes: Routes = [
  { path: '', component: Login },
  {
    path: 'office',
    component: App,
    children: [
      {path: '', redirectTo: 'cases-list', pathMatch:'full'},
      { path: 'home', component: App },
      {
        path: 'add-case',
        component: AddCaseComponent,
        resolve: {
          court: courtResolverResolver,
          employeeNames: employeeNamesResolver,
        },
      },
      { path: 'employees', component: MangeEmployeePage },
      {
        path: 'cases-list',
        component: CasesListPage,
        resolve: {
          court: courtResolverResolver,
        },
      },

      {
        path: 'case-details/:caseId',
        component: CaseDetailsPage,
        children: [
          {
            path: '',
            redirectTo: 'case',
            pathMatch: 'full',
          },
          {
            path: `case`,
            component: CaseDetailsComponent,
            resolve: {
              caseDetails: caseDetailsResolverResolver,
            },
          },
          {
            path: `contracts`,
            component: CaseContract,
          },
          {
            path: `poas`,
            component: CasePoa,
          },

          {
            path: `attachments`,
            component: CaseAttachments,
          },
        ],
      },
    ],
  },
];
