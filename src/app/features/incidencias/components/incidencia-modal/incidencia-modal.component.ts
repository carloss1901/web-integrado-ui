import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { MaestroResponse } from "../../../../api/api/models/maestro-response";
import { PlaceholderEnum } from "../../../../core/enums/placeholder.enum";
import { AlertService } from "../../../../core/services/alert.service";
import { AppButtonComponent } from "../../../../shared/components/app-button/app-button.component";

export interface IncidenciaModalResult {
  idCategoria: number;
  idUbicacion: number;
  titulo: string;
  descripcion: string;
}

@Component({
  selector: "app-incidencia-modal",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule, AppButtonComponent],
  templateUrl: "./incidencia-modal.component.html",
})
export class IncidenciaModalComponent {
  readonly placeholders = PlaceholderEnum;
  @Input() categorias: MaestroResponse[] = [];
  @Input() ubicaciones: MaestroResponse[] = [];
  submitted = false;

  readonly form = this.formBuilder.group({
    idCategoria: [null as number | null, [Validators.required, Validators.min(1)]],
    idUbicacion: [null as number | null, [Validators.required, Validators.min(1)]],
    titulo: ["", [Validators.required, Validators.maxLength(200)]],
    descripcion: ["", [Validators.required, Validators.maxLength(1000)]],
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

  guardar(): void {
    this.submitted = true;
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      this.alertService.warning("Completa los campos obligatorios para registrar la incidencia.");
      return;
    }
    this.activeModal.close(this.form.getRawValue() as unknown as IncidenciaModalResult);
  }

  cerrar(): void {
    this.activeModal.dismiss();
  }
}
