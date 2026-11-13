import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/views/dashboard/dashboard.component';
import { LoginComponent } from './features/auth/views/login/login.component';
import { AppLayoutComponent } from './shared/components/app-layout/app-layout.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, title: 'Iniciar sesión | CampusSeguro 360' },
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: 'inicio', component: DashboardComponent, title: 'Inicio | CampusSeguro 360' }
    ]
  },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', redirectTo: 'login' }
];
