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
  @Output() view = new EventEmitter<IncidenciaResponse>();
  correlativo(index: number): number { return (this.page - 1) * this.pageSize + index + 1; }
  estadoClass(estado?: string): string {
    const value = this.normalizar(estado);
    if (value.includes("cerr") || value.includes("resuelt")) return "ui-status-badge is-success";
    if (value.includes("venc") || value.includes("cancel")) return "ui-status-badge is-inactive";
    return "ui-status-badge";
  }
  prioridadClass(prioridad?: string): string {
    const value = this.normalizar(prioridad);
    if (value.includes("alta") || value.includes("crit")) return "ui-incident-badge ui-incident-badge--high";
    if (value.includes("media")) return "ui-incident-badge ui-incident-badge--medium";
    return "ui-incident-badge ui-incident-badge--low";
  }
  private normalizar(value?: string): string { return (value ?? "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); }
}
