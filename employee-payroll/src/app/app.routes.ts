import { Routes } from '@angular/router';
import { EmployeeListComponent } from '../app/components/employee-list/employee-list.component';
import { EmployeeFormComponent } from '../app/components/employee-form/employee-form.component';

export const routes: Routes = [
  { path: '', component: EmployeeListComponent }, // Home Page (Employee List)
  { path: 'add', component: EmployeeFormComponent }, // Add Employee Form
  { path: '**', redirectTo: '' } // Redirect invalid routes to home
];
