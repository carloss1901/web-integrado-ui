import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { SessionService } from '../../../core/services/session.service';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './app-shell.component.html',
  styleUrl: './app-shell.component.scss'
})
export class AppShellComponent {
  menuVisible = true;
  grupoAbierto = true;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly session: SessionService
  ) {}

  get user() {
    return this.session.currentUser;
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
