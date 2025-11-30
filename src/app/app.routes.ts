// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list';
import { LoginComponent } from './login/login';
import { EmployeeFormComponent } from './employee-form/employee-form';
import { EmployeeDetailsComponent } from './employee-details/employee-details';
import { AuthGuard } from './guards/auth.guard'; // ← Ajoute cette ligne

export const routes: Routes = [
 { path: '', redirectTo: '/login', pathMatch: 'full' }, // ← IMPORTANT

  // Routes publiques (pas besoin d'être connecté)
  { path: 'login', component: LoginComponent },

  // Routes PROTÉGÉES → AuthGuard activé
  { 
    path: 'employees', 
    component: EmployeeListComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'employees/add', 
    component: EmployeeFormComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'employees/edit/:id', 
    component: EmployeeFormComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'employees/:id', 
    component: EmployeeDetailsComponent, 
    canActivate: [AuthGuard] 
  },

  // Si tu veux une route pour ajouter sans /add (optionnel)
  { path: 'employees/new', redirectTo: '/employees/add' },

  // Route 404
  { path: '**', redirectTo: '/employees' }
];