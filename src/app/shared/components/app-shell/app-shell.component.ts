import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { SessionRole, SessionService } from '../../../core/services/session.service';
import { ScreenLoadingComponent } from '../screen-loading/screen-loading.component';
import { ScreenLoadingService } from '../../../core/services/screen-loading.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule, RouterLink, RouterLinkActive, ScreenLoadingComponent],
  templateUrl: './app-shell.component.html',
  styleUrl: './app-shell.component.scss'
})
export class AppShellComponent {
  menuVisible = true;
  grupoAbierto = true;
  requiresRoleSelection = false;
  roles: SessionRole[] = [];
  rolActual: SessionRole | null = null;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly session: SessionService,
    private readonly loading: ScreenLoadingService
  ) {
    this.sincronizarRoles();
    this.requiresRoleSelection = !this.session.selectedRole && this.session.availableRoles.length > 0;
  }

  get user() {
    return this.session.currentUser;
  }

  seleccionarRol(role: SessionRole): void {
    const rolAnterior = this.rolActual;
    this.rolActual = role;
    this.loading.show();
    this.authService.selectRole(role.id).pipe(finalize(() => this.loading.hide())).subscribe({
      next: () => {
        this.sincronizarRoles();
        this.requiresRoleSelection = false;
      },
      error: () => {
        this.rolActual = rolAnterior;
        this.requiresRoleSelection = !rolAnterior && this.roles.length > 0;
      }
    });
  }

  cambiarRol(role: SessionRole | null): void {
    if (role && role.id !== this.rolActual?.id) {
      this.seleccionarRol(role);
    }
  }

  private sincronizarRoles(): void {
    this.roles = this.session.availableRoles;
    const idRolSeleccionado = this.session.selectedRole?.id;
    this.rolActual = this.roles.find((role) => role.id === idRolSeleccionado) ?? null;
  }

  alternarMenu(): void {
    this.menuVisible = !this.menuVisible;
  }

  alternarGrupo(): void {
    this.grupoAbierto = !this.grupoAbierto;
  }

  salir(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
