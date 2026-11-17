import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { IncidenciaResponse } from "../../../../api/api/models/incidencia-response";
import { PlaceholderEnum } from "../../../../core/enums/placeholder.enum";
import { AlertService } from "../../../../core/services/alert.service";
import { AppButtonComponent } from "../../../../shared/components/app-button/app-button.component";

export interface IncidenciaReabrirResult { observacion: string; aprobada?: boolean; }

@Component({
  selector: "app-incidencia-reabrir-modal",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AppButtonComponent],
  templateUrl: "./incidencia-reabrir-modal.component.html",
})
export class IncidenciaReabrirModalComponent {
  readonly placeholders = PlaceholderEnum;
  @Input({ required: true }) incidencia!: IncidenciaResponse;
  @Input() titulo = "Reabrir incidencia";
  @Input() descripcion = "Indica por qué la incidencia debe volver a atención.";
  @Input() etiquetaObservacion = "Observación";
  @Input() textoAccion = "Reabrir";
  @Input() iconoAccion = "rotate-ccw";
  @Input() requiereDecision = false;
  submitted = false;
  readonly form = this.formBuilder.group({
    observacion: ["", [Validators.required, Validators.maxLength(1000)]],
    aprobada: [null as boolean | null],
  });

  constructor(private readonly formBuilder: FormBuilder, public readonly activeModal: NgbActiveModal, private readonly alertService: AlertService) {}

  get observacionInvalida(): boolean {
    const control = this.form.controls.observacion;
    return control.invalid && (control.touched || this.submitted);
  }

  guardar(): void {
    if (this.requiereDecision && this.form.controls.aprobada.value === null) {
      this.alertService.warning("Selecciona una decisión de revisión.");
      return;
    }
    this.submitted = true;
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      this.alertService.warning("Registra una observación para continuar.");
      return;
    }
    this.activeModal.close(this.form.getRawValue() as IncidenciaReabrirResult);
  }

  cerrar(): void { this.activeModal.dismiss(); }
}
