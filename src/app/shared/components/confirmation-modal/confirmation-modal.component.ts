import { Component, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { AppButtonComponent } from "../app-button/app-button.component";

@Component({
  selector: "app-confirmation-modal",
  standalone: true,
  imports: [AppButtonComponent],
  templateUrl: "./confirmation-modal.component.html",
})
export class ConfirmationModalComponent {
  @Input() title = "Confirmación";
  @Input() message = "¿Deseas continuar con esta acción?";
  @Input() confirmText = "Confirmar";
  @Input() confirmIcon = "check";

  constructor(public readonly activeModal: NgbActiveModal) {}

  cancelar(): void {
    this.activeModal.dismiss("cancelado");
  }

  confirmar(): void {
    this.activeModal.close(true);
  }
}
