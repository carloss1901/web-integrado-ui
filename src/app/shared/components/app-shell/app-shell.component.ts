import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

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

  constructor(private readonly router: Router) {}

  alternarMenu(): void {
    this.menuVisible = !this.menuVisible;
  }

  alternarGrupo(): void {
    this.grupoAbierto = !this.grupoAbierto;
  }

  salir(): void {
    this.router.navigate(['/login']);
  }
}
