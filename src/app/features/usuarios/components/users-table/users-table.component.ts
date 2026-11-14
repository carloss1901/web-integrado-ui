import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";

import { UsuarioListadoResponse } from "../../../../api/api/models/usuario-listado-response";
import { AppLoadingComponent } from "../../../../shared/components/app-loading/app-loading.component";
import { AppNoResultsComponent } from "../../../../shared/components/app-no-results/app-no-results.component";

@Component({
  selector: "app-users-table",
  standalone: true,
  imports: [CommonModule, AppLoadingComponent, AppNoResultsComponent],
  templateUrl: "./users-table.component.html",
})
export class UsersTableComponent {
  @Input() usuarios: UsuarioListadoResponse[] = [];
  @Input() loading = false;
  @Input() page = 1;
  @Input() pageSize = 5;
  @Output() edit = new EventEmitter<UsuarioListadoResponse>();
  @Output() view = new EventEmitter<UsuarioListadoResponse>();
  @Output() delete = new EventEmitter<UsuarioListadoResponse>();
  @Output() reactivate = new EventEmitter<UsuarioListadoResponse>();

  roleClass(role: string | undefined): string {
    const normalized = (role ?? "sin-rol")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-");

    if (normalized.includes("administrador")) {
      return "ui-role-administrador";
    }
    if (normalized.includes("supervisor")) {
      return "ui-role-supervisor";
    }
    if (normalized.includes("operador") && normalized.includes("mesa")) {
      return "ui-role-operador-mesa-control";
    }
    if (normalized.includes("responsable") && normalized.includes("atencion")) {
      return "ui-role-responsable-atencion";
    }
    if (normalized.includes("reportante")) {
      return "ui-role-reportante";
    }

    return `ui-role-${normalized}`;
  }

  correlativo(index: number): number {
    return (this.page - 1) * this.pageSize + index + 1;
  }
}
