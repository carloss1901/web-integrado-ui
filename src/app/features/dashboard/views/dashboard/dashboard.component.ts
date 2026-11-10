import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SessionService } from '../../../../core/services/session.service';

@Component({ selector: 'app-dashboard', standalone: true, imports: [CommonModule], templateUrl: './dashboard.component.html', styleUrl: './dashboard.component.scss' })
export class DashboardComponent {
  readonly user = this.session.currentUser;
  readonly metrics = [
    { label: 'Registros activos', value: '128', detail: '+12% este mes', color: 'blue' },
    { label: 'Procesos en curso', value: '24', detail: '6 requieren revisión', color: 'green' },
    { label: 'Notificaciones', value: '7', detail: '2 sin leer', color: 'orange' }
  ];
  constructor(private readonly session: SessionService) {}
}
