import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { IncidenciaResponse } from "../../../../api/api/models/incidencia-response";
import { PlaceholderEnum } from "../../../../core/enums/placeholder.enum";
import { AlertService } from "../../../../core/services/alert.service";
import { AppButtonComponent } from "../../../../shared/components/app-button/app-button.component";

export interface IncidenciaResolverResult {
  descripcionResolucion: string;
}

@Component({
  selector: "app-incidencia-resolver-modal",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AppButtonComponent],
  templateUrl: "./incidencia-resolver-modal.component.html",
})
export class IncidenciaResolverModalComponent {
  readonly placeholders = PlaceholderEnum;
  @Input({ required: true }) incidencia!: IncidenciaResponse;
  submitted = false;
  readonly form = this.formBuilder.group({
    descripcionResolucion: ["", [Validators.required, Validators.maxLength(1000)]],
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    public readonly activeModal: NgbActiveModal,
    private readonly alertService: AlertService,
  ) {}

  get descripcionInvalida(): boolean {
    const control = this.form.controls.descripcionResolucion;
    return control.invalid && (control.touched || this.submitted);
  }

  guardar(): void {
    this.submitted = true;
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      this.alertService.warning("Registra la descripción de la resolución.");
      return;
    }
    this.activeModal.close(this.form.getRawValue() as IncidenciaResolverResult);
  }

  cerrar(): void {
    this.activeModal.dismiss();
  }
}
