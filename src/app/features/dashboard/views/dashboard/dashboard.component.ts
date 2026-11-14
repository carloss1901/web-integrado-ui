import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IncidenciaControllerService } from '../../../../api/api/services';
import { SessionService } from '../../../../core/services/session.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  readonly user = this.session.currentUser;
  loadError = false;
  metrics = [
    { label: 'Total de incidencias', value: '—', detail: 'Registros del sistema', color: 'blue', icon: 'icon-file-text' },
    { label: 'Pendientes de atención', value: '—', detail: 'Requieren seguimiento', color: 'orange', icon: 'icon-activity' },
    { label: 'Incidencias vencidas', value: '—', detail: 'Fuera del SLA', color: 'green', icon: 'icon-bell' }
  ];

  constructor(
    private readonly session: SessionService,
    private readonly incidenciaApi: IncidenciaControllerService
  ) {}

  ngOnInit(): void {
    this.incidenciaApi.obtenerIndicadores().subscribe({
      next: (indicators) => {
        this.metrics = [
          { label: 'Total de incidencias', value: String(indicators.totalIncidencias ?? 0), detail: 'Registros del sistema', color: 'blue', icon: 'icon-file-text' },
          { label: 'Pendientes de atención', value: String(indicators.incidenciasPendientes ?? 0), detail: 'Requieren seguimiento', color: 'orange', icon: 'icon-activity' },
          { label: 'Incidencias vencidas', value: String(indicators.incidenciasVencidas ?? 0), detail: 'Fuera del SLA', color: 'green', icon: 'icon-bell' }
        ];
      },
      error: () => this.loadError = true
    });
  }
}
