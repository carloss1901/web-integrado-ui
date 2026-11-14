import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/views/dashboard/dashboard.component';
import { LoginComponent } from './features/auth/views/login/login.component';
import { AppLayoutComponent } from './shared/components/app-layout/app-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { UsuariosComponent } from './features/usuarios/views/usuarios/usuarios.component';
import { IncidenciasComponent } from './features/incidencias/views/incidencias/incidencias.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, title: 'Iniciar sesión | CampusSeguro 360' },
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'inicio', component: DashboardComponent, title: 'Inicio | CampusSeguro 360' },
      { path: 'usuarios', component: UsuariosComponent, title: 'Usuarios | CampusSeguro 360' },
      { path: 'incidencias', component: IncidenciasComponent, title: 'Incidencias | CampusSeguro 360' }
    ]
  },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', redirectTo: 'login' }
];
