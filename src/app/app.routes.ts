import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/views/dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'inicio', component: DashboardComponent, title: 'Inicio | Web Integrado' },
  { path: '', pathMatch: 'full', redirectTo: 'inicio' },
  { path: '**', redirectTo: 'inicio' }
];
