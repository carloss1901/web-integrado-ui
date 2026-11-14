import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";

import { UsuarioProjection } from "../../../../api/api/models/usuario-projection";
import { AppLoadingComponent } from "../../../../shared/components/app-loading/app-loading.component";
import { AppNoResultsComponent } from "../../../../shared/components/app-no-results/app-no-results.component";

@Component({
  selector: "app-users-table",
  standalone: true,
  imports: [CommonModule, AppLoadingComponent, AppNoResultsComponent],
  templateUrl: "./users-table.component.html",
})
export class UsersTableComponent {
  @Input() usuarios: UsuarioProjection[] = [];
  @Input() loading = false;
  @Input() page = 1;
  @Input() pageSize = 5;
  @Output() edit = new EventEmitter<UsuarioProjection>();
  @Output() delete = new EventEmitter<UsuarioProjection>();

  roleClass(roles: string | undefined): string {
    const normalized = (roles ?? "sin-rol")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-");
    return `ui-role-${normalized}`;
  }

  correlativo(index: number): number {
    return (this.page - 1) * this.pageSize + index + 1;
  }
}
