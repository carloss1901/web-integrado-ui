import { Component, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { IncidenciaResponse } from "../../../../api/api/models/incidencia-response";

@Component({ selector: "app-incidencia-view-modal", standalone: true, templateUrl: "./incidencia-view-modal.component.html" })
export class IncidenciaViewModalComponent {
  @Input({ required: true }) incidencia!: IncidenciaResponse;
  constructor(public readonly activeModal: NgbActiveModal) {}
}
