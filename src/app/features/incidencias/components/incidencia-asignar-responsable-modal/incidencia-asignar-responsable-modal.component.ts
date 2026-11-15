import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { IncidenciaResponse } from "../../../../api/api/models/incidencia-response";
import { ResponsableResponse } from "../../../../api/api/models/responsable-response";
import { UsuarioControllerService } from "../../../../api/api/services/usuario-controller.service";
import { PlaceholderEnum } from "../../../../core/enums/placeholder.enum";
import { AlertService } from "../../../../core/services/alert.service";
import { AppButtonComponent } from "../../../../shared/components/app-button/app-button.component";
import { AppLoadingComponent } from "../../../../shared/components/app-loading/app-loading.component";
import { finalize } from "rxjs";

export interface ResponsableOption {
  id: number;
  nombre: string;
}

export interface IncidenciaAsignarResponsableResult {
  idIncidencia: number;
  idResponsable: number;
}

@Component({
  selector: "app-incidencia-asignar-responsable-modal",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule, AppButtonComponent, AppLoadingComponent],
  templateUrl: "./incidencia-asignar-responsable-modal.component.html",
})
export class IncidenciaAsignarResponsableModalComponent implements OnInit {
  readonly placeholders = PlaceholderEnum;
  @Input({ required: true }) incidencia!: IncidenciaResponse;
  responsables: ResponsableOption[] = [];
  loading = true;
  submitted = false;
  readonly form = this.formBuilder.group({
    idResponsable: [null as number | null, [Validators.required, Validators.min(1)]],
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    public readonly activeModal: NgbActiveModal,
    private readonly alertService: AlertService,
    private readonly usuarioApi: UsuarioControllerService,
  ) {}

  ngOnInit(): void {
    this.usuarioApi.listarResponsablesActivos().pipe(finalize(() => (this.loading = false))).subscribe({
      next: (response: ResponsableResponse[]) => {
        this.responsables = (response ?? [])
          .filter((usuario: ResponsableResponse) => usuario.idUsuario !== undefined)
          .map((usuario: ResponsableResponse) => ({ id: usuario.idUsuario as number, nombre: usuario.nombre || "Responsable" }));
      },
      error: () => this.alertService.error("No se pudieron cargar los responsables de atención."),
    });
  }

  get controlInvalido(): boolean {
    const control = this.form.controls.idResponsable;
    return control.invalid && (control.touched || this.submitted);
  }

  guardar(): void {
    this.submitted = true;
    this.form.markAllAsTouched();
    const idResponsable = this.form.controls.idResponsable.value;
    if (this.loading || this.form.invalid || this.incidencia.idIncidencia === undefined || idResponsable === null) {
      this.alertService.warning("Selecciona un responsable de atención.");
      return;
    }
    this.activeModal.close({ idIncidencia: this.incidencia.idIncidencia, idResponsable });
  }

  cerrar(): void {
    this.activeModal.dismiss();
  }
}
