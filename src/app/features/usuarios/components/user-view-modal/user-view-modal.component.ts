import { Component, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { UsuarioListadoResponse } from "../../../../api/api/models/usuario-listado-response";

@Component({
  selector: "app-user-view-modal",
  standalone: true,
  imports: [],
  templateUrl: "./user-view-modal.component.html",
})
export class UserViewModalComponent {
  @Input({ required: true }) usuario!: UsuarioListadoResponse;

  constructor(public readonly activeModal: NgbActiveModal) {}

  cerrar(): void {
    this.activeModal.dismiss();
  }

  roleClass(role: string | undefined): string {
    const normalized = (role ?? "sin-rol")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-");

    if (normalized.includes("administrador")) return "ui-role-administrador";
    if (normalized.includes("supervisor")) return "ui-role-supervisor";
    if (normalized.includes("operador") && normalized.includes("mesa")) {
      return "ui-role-operador-mesa-control";
    }
    if (normalized.includes("responsable") && normalized.includes("atencion")) {
      return "ui-role-responsable-atencion";
    }
    if (normalized.includes("reportante")) return "ui-role-reportante";
    return `ui-role-${normalized}`;
  }
}
