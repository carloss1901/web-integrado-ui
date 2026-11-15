import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IncidenciaResponse } from "../../../../api/api/models/incidencia-response";
import { AppLoadingComponent } from "../../../../shared/components/app-loading/app-loading.component";
import { AppNoResultsComponent } from "../../../../shared/components/app-no-results/app-no-results.component";

@Component({ selector: "app-incidencias-table", standalone: true, imports: [CommonModule, AppLoadingComponent, AppNoResultsComponent], templateUrl: "./incidencias-table.component.html" })
export class IncidenciasTableComponent {
  @Input() incidencias: IncidenciaResponse[] = [];
  @Input() loading = false;
  @Input() page = 1;
  @Input() pageSize = 5;
  @Input() puedeRevisar = false;
  @Input() puedeIniciarAtencion = false;
  @Input() puedeCerrar = false;
  @Input() mostrarReportante = true;
  @Output() view = new EventEmitter<IncidenciaResponse>();
  @Output() review = new EventEmitter<IncidenciaResponse>();
  @Output() assign = new EventEmitter<IncidenciaResponse>();
  @Output() startAttention = new EventEmitter<IncidenciaResponse>();
  @Output() resolve = new EventEmitter<IncidenciaResponse>();
  @Output() close = new EventEmitter<IncidenciaResponse>();
  @Output() reopen = new EventEmitter<IncidenciaResponse>();
  correlativo(index: number): number { return (this.page - 1) * this.pageSize + index + 1; }
  estadoClass(estado?: string): string {
    const value = this.normalizar(estado);
    if (value.includes("registr")) return "ui-status-badge is-registered";
    if (value.includes("clasific")) return "ui-status-badge is-classified";
    if (value.includes("asign")) return "ui-status-badge is-assigned";
    if (value.includes("atencion")) return "ui-status-badge is-attending";
    if (value.includes("espera")) return "ui-status-badge is-waiting";
    if (value.includes("resuelt")) return "ui-status-badge is-resolved";
    if (value.includes("cerr")) return "ui-status-badge is-closed";
    if (value.includes("reabiert")) return "ui-status-badge is-reopened";
    if (value.includes("cancel") || value.includes("venc")) return "ui-status-badge is-inactive";
    return "ui-status-badge is-default";
  }
  prioridadClass(prioridad?: string): string {
    const value = this.normalizar(prioridad);
    if (!value || value === "—" || value === "-") return "ui-incident-badge ui-incident-badge--empty";
    if (value.includes("crit")) return "ui-incident-badge ui-incident-badge--critical";
    if (value.includes("alta")) return "ui-incident-badge ui-incident-badge--high";
    if (value.includes("media")) return "ui-incident-badge ui-incident-badge--medium";
    return "ui-incident-badge ui-incident-badge--low";
  }
  esAsignada(incidencia: IncidenciaResponse): boolean {
    return this.normalizar(incidencia.estado).includes("asign");
  }
  esEnAtencion(incidencia: IncidenciaResponse): boolean {
    return this.normalizar(incidencia.estado).includes("atencion");
  }
  esResuelta(incidencia: IncidenciaResponse): boolean {
    return this.normalizar(incidencia.estado).includes("resuelt");
  }
  vencida(incidencia: IncidenciaResponse): boolean {
    const estado = this.normalizar(incidencia.estado);
    if (!incidencia.fechaLimite || estado.includes("resuelt") || estado.includes("cerr")) return false;
    const fechaLimite = new Date(incidencia.fechaLimite);
    return !Number.isNaN(fechaLimite.getTime()) && fechaLimite.getTime() < Date.now();
  }
  private normalizar(value?: string): string { return (value ?? "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); }
}
