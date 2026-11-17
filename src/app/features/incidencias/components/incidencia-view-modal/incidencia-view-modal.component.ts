import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { IncidenciaResponse } from "../../../../api/api/models/incidencia-response";
import { MaestroResponse } from "../../../../api/api/models/maestro-response";
import { PlaceholderEnum } from "../../../../core/enums/placeholder.enum";
import { AlertService } from "../../../../core/services/alert.service";
import { AppButtonComponent } from "../../../../shared/components/app-button/app-button.component";
import { IncidenciaAccionCorrectivaResponse } from "../../../../api/api/models/incidencia-accion-correctiva-response";
import { IncidenciaComentarioResponse } from "../../../../api/api/models/incidencia-comentario-response";
import { IncidenciaEvidenciaResponse } from "../../../../api/api/models/incidencia-evidencia-response";
import { IncidenciaHistorialResponse } from "../../../../api/api/models/incidencia-historial-response";
import { IncidenciaControllerService } from "../../../../api/api/services/incidencia-controller.service";
import { catchError, finalize, forkJoin, of } from "rxjs";
import { Role } from "../../../../core/constants/role.enum";
import { SessionService } from "../../../../core/services/session.service";

export interface IncidenciaRevisionResult {
  idIncidencia: number;
  idSeveridad: number;
  impacto: number;
  urgencia: number;
}

interface IncidenciaDetalleEnvelope {
  data?: IncidenciaResponse;
}

@Component({ selector: "app-incidencia-view-modal", standalone: true, imports: [CommonModule, ReactiveFormsModule, NgSelectModule, AppButtonComponent], templateUrl: "./incidencia-view-modal.component.html" })
export class IncidenciaViewModalComponent implements OnInit {
  readonly placeholders = PlaceholderEnum;
  @Input({ required: true }) incidencia!: IncidenciaResponse;
  @Input() modoRevision = false;
  @Input() severidades: MaestroResponse[] = [];
  submitted = false;
  cargandoDetalle = false;
  cargandoTrazabilidad = false;
  historial: IncidenciaHistorialResponse[] = [];
  comentarios: IncidenciaComentarioResponse[] = [];
  evidencias: IncidenciaEvidenciaResponse[] = [];
  acciones: IncidenciaAccionCorrectivaResponse[] = [];
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
  readonly comentarioForm = this.formBuilder.group({
    comentario: ["", [Validators.required, Validators.maxLength(1000)]],
  });
  readonly evidenciaForm = this.formBuilder.group({
    nombreArchivo: ["", [Validators.required, Validators.maxLength(255)]],
    rutaArchivo: ["", [Validators.required, Validators.maxLength(500)]],
    descripcion: ["", [Validators.maxLength(500)]],
  });
  readonly accionForm = this.formBuilder.group({
    descripcion: ["", [Validators.required, Validators.maxLength(1000)]],
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    public readonly activeModal: NgbActiveModal,
    private readonly alertService: AlertService,
    private readonly incidenciaApi: IncidenciaControllerService,
    private readonly session: SessionService,
  ) {}

  ngOnInit(): void {
    if (this.modoRevision) {
      const severidad = this.severidades.find((item) =>
        this.normalizar(item.descripcion) === this.normalizar(this.incidencia.severidad)
      );
      this.form.patchValue({
        idSeveridad: severidad?.maestroId ?? null,
        impacto: this.incidencia.impacto ?? null,
        urgencia: this.incidencia.urgencia ?? null,
      });
    } else if (this.incidencia.idIncidencia !== undefined) {
      this.cargarDetalle();
    }
  }

  get esReportante(): boolean { return this.session.selectedRole?.id === Role.REPORTANTE; }
  get esResponsable(): boolean { return this.session.selectedRole?.id === Role.RESPONSABLE_ATENCION; }
  get esSupervisor(): boolean { return this.session.selectedRole?.id === Role.SUPERVISOR; }
  get esAdministrador(): boolean { return this.session.selectedRole?.id === Role.ADMINISTRADOR; }
  get puedeVerClasificacion(): boolean { return !this.esReportante; }
  get puedeVerSeguimiento(): boolean { return true; }
  get puedeRegistrarAccion(): boolean { return this.esResponsable || this.esSupervisor || this.esAdministrador; }

  private normalizar(value?: string): string {
    return (value ?? "").trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  private cargarDetalle(): void {
    const idIncidencia = this.incidencia.idIncidencia;
    if (idIncidencia === undefined) return;

    this.cargandoDetalle = true;
    this.incidenciaApi.obtenerIncidencia({ idIncidencia }).pipe(
      finalize(() => (this.cargandoDetalle = false)),
    ).subscribe({
      next: (response) => {
        const detalle = (response as IncidenciaDetalleEnvelope).data;
        if (detalle) this.incidencia = detalle;
        this.cargarTrazabilidad();
      },
      error: () => this.alertService.error("No se pudo cargar el detalle de la incidencia."),
    });
  }

  private cargarTrazabilidad(): void {
    if (!this.puedeVerSeguimiento) return;

    const idIncidencia = this.incidencia.idIncidencia!;
    this.cargandoTrazabilidad = true;
    forkJoin({
      historial: this.incidenciaApi.listarHistorial({ idIncidencia, page: 1, size: 50 }).pipe(catchError(() => of({ data: [] }))),
      comentarios: this.incidenciaApi.listarComentarios({ idIncidencia, page: 1, size: 50 }).pipe(catchError(() => of({ data: [] }))),
      evidencias: this.incidenciaApi.listarEvidencias({ idIncidencia, page: 1, size: 50 }).pipe(catchError(() => of({ data: [] }))),
      acciones: this.incidenciaApi.listarAccionesCorrectivas({ idIncidencia, page: 1, size: 50 }).pipe(catchError(() => of({ data: [] }))),
    }).subscribe((resultados) => {
      this.historial = resultados.historial.data ?? [];
      this.comentarios = resultados.comentarios.data ?? [];
      this.evidencias = resultados.evidencias.data ?? [];
      this.acciones = resultados.acciones.data ?? [];
      this.cargandoTrazabilidad = false;
    });
  }

  historialClass(tipoEvento?: string): string {
    const evento = this.normalizar(tipoEvento);
    if (evento.includes("registro")) return "is-registration";
    if (evento.includes("clasific") || evento.includes("prioridad") || evento.includes("severidad")) return "is-classification";
    if (evento.includes("asign")) return "is-assignment";
    if (evento.includes("inicio") || evento.includes("atencion")) return "is-attention";
    if (evento.includes("resol")) return "is-resolution";
    if (evento.includes("cierre")) return "is-closure";
    if (evento.includes("reapert")) return "is-reopen";
    return "is-default";
  }

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

  registrarComentario(): void {
    const idIncidencia = this.incidencia.idIncidencia;
    if (idIncidencia === undefined || this.comentarioForm.invalid) {
      this.comentarioForm.markAllAsTouched();
      return;
    }
    this.incidenciaApi.registrarComentario({ body: { idIncidencia, comentario: this.comentarioForm.controls.comentario.value!.trim() } }).subscribe({
      next: () => {
        this.comentarioForm.reset();
        this.alertService.success("Comentario registrado correctamente.");
        this.cargarTrazabilidad();
      },
      error: () => this.alertService.error("No se pudo registrar el comentario."),
    });
  }

  registrarEvidencia(): void {
    const idIncidencia = this.incidencia.idIncidencia;
    if (idIncidencia === undefined || this.evidenciaForm.invalid) {
      this.evidenciaForm.markAllAsTouched();
      return;
    }
    const value = this.evidenciaForm.getRawValue();
    this.incidenciaApi.registrarEvidencia({ body: {
      idIncidencia,
      nombreArchivo: value.nombreArchivo!.trim(),
      rutaArchivo: value.rutaArchivo!.trim(),
      descripcion: value.descripcion?.trim() || undefined,
    } }).subscribe({
      next: () => {
        this.evidenciaForm.reset();
        this.alertService.success("Evidencia registrada correctamente.");
        this.cargarTrazabilidad();
      },
      error: () => this.alertService.error("No se pudo registrar la evidencia."),
    });
  }

  registrarAccion(): void {
    const idIncidencia = this.incidencia.idIncidencia;
    if (idIncidencia === undefined || this.accionForm.invalid) {
      this.accionForm.markAllAsTouched();
      return;
    }
    this.incidenciaApi.registrarAccionCorrectiva({ body: { idIncidencia, descripcion: this.accionForm.controls.descripcion.value!.trim() } }).subscribe({
      next: () => {
        this.accionForm.reset();
        this.alertService.success("Acción correctiva registrada correctamente.");
        this.cargarTrazabilidad();
      },
      error: () => this.alertService.error("No se pudo registrar la acción correctiva."),
    });
  }

  cerrar(): void {
    this.activeModal.dismiss();
  }
}
