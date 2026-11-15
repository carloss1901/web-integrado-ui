import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { IncidenciaResponse } from "../../../../api/api/models/incidencia-response";
import { MaestroResponse } from "../../../../api/api/models/maestro-response";
import { PlaceholderEnum } from "../../../../core/enums/placeholder.enum";
import { AlertService } from "../../../../core/services/alert.service";
import { AppButtonComponent } from "../../../../shared/components/app-button/app-button.component";

export interface IncidenciaRevisionResult {
  idIncidencia: number;
  idSeveridad: number;
  impacto: number;
  urgencia: number;
}

@Component({ selector: "app-incidencia-view-modal", standalone: true, imports: [CommonModule, ReactiveFormsModule, NgSelectModule, AppButtonComponent], templateUrl: "./incidencia-view-modal.component.html" })
export class IncidenciaViewModalComponent {
  readonly placeholders = PlaceholderEnum;
  @Input({ required: true }) incidencia!: IncidenciaResponse;
  @Input() modoRevision = false;
  @Input() severidades: MaestroResponse[] = [];
  submitted = false;
  readonly impactos = [
    { id: 1, nombre: "Bajo" },
    { id: 2, nombre: "Medio" },
    { id: 3, nombre: "Alto" },
    { id: 4, nombre: "Crítico" },
  ];
  readonly urgencias = [
    { id: 1, nombre: "Baja" },
    { id: 2, nombre: "Media" },
    { id: 3, nombre: "Alta" },
    { id: 4, nombre: "Inmediata" },
  ];
  readonly form = this.formBuilder.group({
    idSeveridad: [null as number | null, [Validators.required, Validators.min(1)]],
    impacto: [null as number | null, [Validators.required, Validators.min(1), Validators.max(4)]],
    urgencia: [null as number | null, [Validators.required, Validators.min(1), Validators.max(4)]],
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    public readonly activeModal: NgbActiveModal,
    private readonly alertService: AlertService,
  ) {}

  controlInvalido(controlName: string): boolean {
    const control = this.form.get(controlName);
    return Boolean(control?.invalid && (control.touched || this.submitted));
  }

  guardarRevision(): void {
    this.submitted = true;
    this.form.markAllAsTouched();
    if (this.form.invalid || this.incidencia.idIncidencia === undefined) {
      this.alertService.warning("Completa los datos de clasificación de la incidencia.");
      return;
    }
    this.activeModal.close({ idIncidencia: this.incidencia.idIncidencia, ...this.form.getRawValue() } as IncidenciaRevisionResult);
  }

  cerrar(): void {
    this.activeModal.dismiss();
  }
}
