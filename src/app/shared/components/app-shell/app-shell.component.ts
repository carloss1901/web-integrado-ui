import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { SessionService } from '../../../core/services/session.service';
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

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly session: SessionService,
    private readonly loading: ScreenLoadingService
  ) {
    this.requiresRoleSelection = !this.session.selectedRole && this.session.availableRoles.length > 0;
  }

  get user() {
    return this.session.currentUser;
  }

  get roles() {
    return this.session.availableRoles;
  }

  get selectedRoleId(): number | null {
    return this.session.selectedRole?.id ?? null;
  }

  seleccionarRol(idRol: number): void {
    this.loading.show();
    this.authService.selectRole(idRol).pipe(finalize(() => this.loading.hide())).subscribe({
      next: () => this.requiresRoleSelection = false,
      error: () => this.requiresRoleSelection = true
    });
  }

  cambiarRol(role: { id: number; nombre: string } | null): void {
    if (role?.id && role.id !== this.selectedRoleId) {
      this.seleccionarRol(role.id);
    }
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
