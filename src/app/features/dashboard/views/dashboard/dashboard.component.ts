import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Subscription, forkJoin, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { IncidenciaControllerService } from '../../../../api/api/services';
import { CargaResponsableResponse } from '../../../../api/api/models/carga-responsable-response';
import { DashboardIncidenciasResponse } from '../../../../api/api/models/dashboard-incidencias-response';
import { IndicadorAgrupadoResponse } from '../../../../api/api/models/indicador-agrupado-response';
import { IncidenciaResponse } from '../../../../api/api/models/incidencia-response';
import { Role } from '../../../../core/constants/role.enum';
import { SessionService } from '../../../../core/services/session.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {
  readonly user = this.session.currentUser;
  readonly umbralSobrecarga = 5;
  readonly filtros = this.formBuilder.nonNullable.group({ inicio: '', fin: '' });

  cargando = false;
  loadError = false;
  dashboard: DashboardIncidenciasResponse = {};
  proximas: IncidenciaResponse[] = [];
  private roleSubscription?: Subscription;

  constructor(
    private readonly session: SessionService,
    private readonly incidenciaApi: IncidenciaControllerService,
    private readonly formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.roleSubscription = this.session.selectedRole$.subscribe((role) => {
      if (role) this.cargarDashboard();
    });
  }

  ngOnDestroy(): void {
    this.roleSubscription?.unsubscribe();
  }

  get totalPeriodo(): number { return this.dashboard.totalPeriodo ?? 0; }
  get dentroSla(): number { return this.dashboard.dentroSla ?? 0; }
  get incumplidasSla(): number { return this.dashboard.incumplidasSla ?? 0; }
  get totalConSla(): number { return this.dentroSla + this.incumplidasSla; }
  get cumplimientoSla(): number { return this.totalConSla ? Math.round((this.dentroSla / this.totalConSla) * 100) : 0; }
  get responsablesSobrecargados(): CargaResponsableResponse[] {
    return (this.dashboard.cargaResponsables ?? []).filter((item) => (item.incidenciasActivas ?? 0) >= this.umbralSobrecarga);
  }

  aplicarFiltros(): void { this.cargarDashboard(); }

  limpiarFiltros(): void {
    this.filtros.reset();
    this.cargarDashboard();
  }

  anchoBarra(total?: number, indicadores: IndicadorAgrupadoResponse[] = []): number {
    const mayor = Math.max(...indicadores.map((item) => item.total ?? 0), 1);
    return Math.max(4, Math.round(((total ?? 0) / mayor) * 100));
  }

  anchoCarga(total?: number): number {
    const mayor = Math.max(...(this.dashboard.cargaResponsables ?? []).map((item) => item.incidenciasActivas ?? 0), this.umbralSobrecarga, 1);
    return Math.max(4, Math.round(((total ?? 0) / mayor) * 100));
  }

  private cargarDashboard(): void {
    const { inicio, fin } = this.filtros.getRawValue();
    const rol = this.session.selectedRole?.id;
    const puedeConsultarAlertas = rol === Role.ADMINISTRADOR || rol === Role.OPERADOR_MESA_CONTROL || rol === Role.SUPERVISOR;

    this.cargando = true;
    this.loadError = false;
    forkJoin({
      dashboard: this.incidenciaApi.obtenerDashboardIncidencias({ inicio: inicio || undefined, fin: fin || undefined }),
      proximas: puedeConsultarAlertas
        ? this.incidenciaApi.listarIncidenciasProximasAVencer({ horas: 24, page: 1, size: 10 }).pipe(catchError(() => of({ data: [] })))
        : of({ data: [] }),
    }).pipe(finalize(() => this.cargando = false)).subscribe({
      next: ({ dashboard, proximas }) => {
        this.dashboard = dashboard ?? {};
        this.proximas = proximas.data ?? [];
      },
      error: () => {
        this.dashboard = {};
        this.proximas = [];
        this.loadError = true;
      }
    });
  }
}
