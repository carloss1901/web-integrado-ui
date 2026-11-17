import { CommonModule } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { catchError, finalize, forkJoin, of, Subscription } from "rxjs";
import { IncidenciaResponse } from "../../../../api/api/models/incidencia-response";
import { MaestroResponse } from "../../../../api/api/models/maestro-response";
import { ComunesControllerService, IncidenciaControllerService } from "../../../../api/api/services";
import { AlertService } from "../../../../core/services/alert.service";
import { ScreenLoadingService } from "../../../../core/services/screen-loading.service";
import { Role } from "../../../../core/constants/role.enum";
import { SessionService } from "../../../../core/services/session.service";
import { IncidenciasFilterComponent } from "../../components/incidencias-filter/incidencias-filter.component";
import { IncidenciasTableComponent } from "../../components/incidencias-table/incidencias-table.component";
import { IncidenciaRevisionResult, IncidenciaViewModalComponent } from "../../components/incidencia-view-modal/incidencia-view-modal.component";
import { IncidenciaModalComponent, IncidenciaModalResult } from "../../components/incidencia-modal/incidencia-modal.component";
import { IncidenciaAsignarResponsableModalComponent, IncidenciaAsignarResponsableResult } from "../../components/incidencia-asignar-responsable-modal/incidencia-asignar-responsable-modal.component";
import { IncidenciaResolverModalComponent, IncidenciaResolverResult } from "../../components/incidencia-resolver-modal/incidencia-resolver-modal.component";
import { IncidenciaReabrirModalComponent, IncidenciaReabrirResult } from "../../components/incidencia-reabrir-modal/incidencia-reabrir-modal.component";
import { TopbarComponent } from "../../../../shared/components/topbar/topbar.component";
import { AppButtonComponent } from "../../../../shared/components/app-button/app-button.component";
import { ConfirmationModalComponent } from "../../../../shared/components/confirmation-modal/confirmation-modal.component";
import { PaginationChange, TableFooterPaginationComponent } from "../../../../shared/components/table-footer-pagination/table-footer-pagination.component";

@Component({ selector: "app-incidencias", standalone: true, imports: [CommonModule, ReactiveFormsModule, TopbarComponent, AppButtonComponent, TableFooterPaginationComponent, IncidenciasFilterComponent, IncidenciasTableComponent, IncidenciaModalComponent, IncidenciaViewModalComponent], templateUrl: "./incidencias.component.html" })
export class IncidenciasComponent implements OnInit, OnDestroy {
  incidencias: IncidenciaResponse[] = [];
  estados: MaestroResponse[] = [];
  categorias: MaestroResponse[] = [];
  severidades: MaestroResponse[] = [];
  ubicaciones: MaestroResponse[] = [];
  loading = false;
  page = 1;
  pageSize = 5;
  totalItems = 0;
  readonly pageSizeOptions = [5, 10, 15];
  readonly filterForm = this.formBuilder.group({ codigo: [""], titulo: [""], categoria: [null as string | null], estado: [null as number | null] });
  private roleSubscription?: Subscription;

  constructor(private readonly formBuilder: FormBuilder, private readonly incidenciaApi: IncidenciaControllerService, private readonly comunesApi: ComunesControllerService, private readonly modalService: NgbModal, private readonly alertService: AlertService, private readonly screenLoadingService: ScreenLoadingService, private readonly session: SessionService) {}
  get puedeRegistrarIncidencia(): boolean {
    const idRol = this.session.selectedRole?.id;
    return idRol === Role.REPORTANTE || idRol === Role.ADMINISTRADOR;
  }
  get puedeRevisarIncidencia(): boolean { return this.session.selectedRole?.id === Role.OPERADOR_MESA_CONTROL; }
  get esReportante(): boolean { return this.session.selectedRole?.id === Role.REPORTANTE; }
  get esResponsableAtencion(): boolean { return this.session.selectedRole?.id === Role.RESPONSABLE_ATENCION; }
  get esSupervisor(): boolean { return this.session.selectedRole?.id === Role.SUPERVISOR; }
  ngOnInit(): void {
    this.roleSubscription = this.session.selectedRole$.subscribe((role) => {
      if (role) {
        this.cargarCatalogos();
        this.cargarIncidencias();
      }
    });
  }
  ngOnDestroy(): void { this.roleSubscription?.unsubscribe(); }
  abrirVisualizar(incidencia: IncidenciaResponse): void { const modalRef = this.modalService.open(IncidenciaViewModalComponent, { centered: true, size: "lg", scrollable: true }); modalRef.componentInstance.incidencia = incidencia; }
  abrirRevision(incidencia: IncidenciaResponse): void {
    const modalRef = this.modalService.open(IncidenciaViewModalComponent, { centered: true, size: "lg", backdrop: "static", keyboard: false });
    modalRef.componentInstance.incidencia = incidencia;
    modalRef.componentInstance.modoRevision = true;
    modalRef.result.then((value: IncidenciaRevisionResult) => this.clasificarIncidencia(value)).catch(() => undefined);
  }
  abrirRegistrar(): void {
    const modalRef = this.modalService.open(IncidenciaModalComponent, { centered: true, size: "lg", backdrop: "static", keyboard: false });
    modalRef.componentInstance.categorias = this.categorias;
    modalRef.componentInstance.ubicaciones = this.ubicaciones;
    modalRef.result.then((value: IncidenciaModalResult) => this.guardarIncidencia(value)).catch(() => undefined);
  }
  abrirAsignarResponsable(incidencia: IncidenciaResponse): void {
    const modalRef = this.modalService.open(IncidenciaAsignarResponsableModalComponent, { centered: true, size: "lg", backdrop: "static", keyboard: false });
    modalRef.componentInstance.incidencia = incidencia;
    modalRef.result.then((value: IncidenciaAsignarResponsableResult) => this.asignarResponsable(value)).catch(() => undefined);
  }
  iniciarAtencion(incidencia: IncidenciaResponse): void {
    if (incidencia.idIncidencia === undefined) return;
    const modalRef = this.modalService.open(ConfirmationModalComponent, {
      centered: true,
      size: "md",
      backdrop: "static",
    });
    modalRef.componentInstance.title = "Confirmar inicio de atención";
    modalRef.componentInstance.message = `¿Deseas iniciar la atención de la incidencia ${incidencia.codigo ?? "seleccionada"}?`;
    modalRef.componentInstance.confirmText = "Iniciar atención";
    modalRef.componentInstance.confirmIcon = "play";
    modalRef.result.then((confirmado: boolean) => {
      if (confirmado) this.confirmarInicioAtencion(incidencia.idIncidencia!);
    }).catch(() => undefined);
  }
  resolverIncidencia(incidencia: IncidenciaResponse): void {
    if (incidencia.idIncidencia === undefined) return;
    const modalRef = this.modalService.open(IncidenciaResolverModalComponent, {
      centered: true,
      size: "lg",
      backdrop: "static",
      keyboard: false,
    });
    modalRef.componentInstance.incidencia = incidencia;
    modalRef.result.then((value: IncidenciaResolverResult) => {
      this.confirmarResolucion(incidencia.idIncidencia!, value.descripcionResolucion);
    }).catch(() => undefined);
  }
  cerrarIncidencia(incidencia: IncidenciaResponse): void {
    if (incidencia.idIncidencia === undefined) return;
    const modalRef = this.modalService.open(ConfirmationModalComponent, {
      centered: true,
      size: "md",
      backdrop: "static",
    });
    modalRef.componentInstance.title = "Confirmar cierre";
    modalRef.componentInstance.message = `¿Confirmas el cierre definitivo de la incidencia ${incidencia.codigo ?? "seleccionada"}?`;
    modalRef.componentInstance.confirmText = "Cerrar incidencia";
    modalRef.componentInstance.confirmIcon = "lock";
    modalRef.result.then((confirmado: boolean) => {
      if (confirmado) this.confirmarCierre(incidencia.idIncidencia!);
    }).catch(() => undefined);
  }
  revisarIncidenciaCritica(incidencia: IncidenciaResponse): void {
    if (incidencia.idIncidencia === undefined) return;
    const modalRef = this.modalService.open(IncidenciaReabrirModalComponent, {
      centered: true,
      size: "lg",
      backdrop: "static",
      keyboard: false,
    });
    modalRef.componentInstance.incidencia = incidencia;
    modalRef.componentInstance.titulo = "Revisión de incidencia crítica";
    modalRef.componentInstance.descripcion = "Registra la decisión de supervisor antes del cierre de la incidencia crítica";
    modalRef.componentInstance.etiquetaObservacion = "Observación de la revisión";
    modalRef.componentInstance.textoAccion = "Registrar revisión";
    modalRef.componentInstance.iconoAccion = "clipboard";
    modalRef.componentInstance.requiereDecision = true;
    modalRef.result.then((value: IncidenciaReabrirResult) => {
      this.confirmarRevisionCritica(incidencia.idIncidencia!, value.aprobada === true, value.observacion);
    }).catch(() => undefined);
  }
  reabrirIncidencia(incidencia: IncidenciaResponse): void {
    if (incidencia.idIncidencia === undefined) return;
    this.solicitarObservacion(incidencia, "Reabrir incidencia", "Indica por qué la incidencia debe volver a atención.", "Observación del Supervisor", "Reabrir", "rotate-ccw", (observacion) => this.confirmarReapertura(incidencia.idIncidencia!, observacion));
  }
  ponerEnEspera(incidencia: IncidenciaResponse): void {
    if (incidencia.idIncidencia === undefined) return;
    this.solicitarObservacion(incidencia, "Poner incidencia en espera", "Indica el motivo temporal por el que se suspende la atención de la incidencia", "Motivo de espera", "Poner en espera", "pause", (observacion) => this.confirmarEspera(incidencia.idIncidencia!, observacion));
  }
  reanudarAtencion(incidencia: IncidenciaResponse): void {
    if (incidencia.idIncidencia === undefined) return;
    this.solicitarObservacion(incidencia, "Reanudar atención", "Registra el motivo por el que se retoma la atención de la incidencia", "Observación", "Reanudar", "play", (observacion) => this.confirmarReanudacion(incidencia.idIncidencia!, observacion));
  }
  cancelarIncidencia(incidencia: IncidenciaResponse): void {
    if (incidencia.idIncidencia === undefined) return;
    this.solicitarObservacion(incidencia, "Cancelar incidencia", "Indica el motivo por el que se cancela la incidencia", "Motivo de cancelación", "Cancelar incidencia", "slash", (observacion) => this.confirmarCancelacion(incidencia.idIncidencia!, observacion));
  }
  aplicarFiltros(): void { this.page = 1; this.cargarIncidencias(); }
  limpiarFiltros(): void { this.filterForm.reset({ codigo: "", titulo: "", categoria: null, estado: null }); this.page = 1; this.cargarIncidencias(); }
  onChangePaginate(event: PaginationChange): void { this.page = event.page; this.pageSize = event.pageSize; this.cargarIncidencias(); }

  private cargarIncidencias(): void {
    this.loading = true;
    const filtros = this.filterForm.getRawValue();
    this.incidenciaApi.listarIncidenciasPaginadas({ idEstado: filtros.estado ?? undefined, page: this.page, size: this.pageSize }).pipe(finalize(() => (this.loading = false))).subscribe({ next: (response) => { this.incidencias = response.data ?? []; this.totalItems = response.pageable?.totalElements ?? 0; }, error: (error: HttpErrorResponse) => this.mostrarError(error) });
  }
  private cargarCatalogos(): void {
    forkJoin({
      estados: this.comunesApi.listarEstadosIncidencia().pipe(catchError(() => of([] as MaestroResponse[]))),
      categorias: this.comunesApi.listarCategorias().pipe(catchError(() => of([] as MaestroResponse[]))),
      severidades: this.comunesApi.listarSeveridades().pipe(catchError(() => of([] as MaestroResponse[]))),
      ubicaciones: this.comunesApi.listarUbicaciones().pipe(catchError(() => of([] as MaestroResponse[]))),
    }).subscribe((catalogos) => {
      this.estados = catalogos.estados ?? [];
      this.categorias = catalogos.categorias ?? [];
      this.severidades = catalogos.severidades ?? [];
      this.ubicaciones = catalogos.ubicaciones ?? [];
    });
  }
  private guardarIncidencia(value: IncidenciaModalResult): void {
    this.screenLoadingService.show();
    this.incidenciaApi.registrarIncidencia({ body: value }).pipe(finalize(() => this.screenLoadingService.hide())).subscribe({
      next: () => {
        this.alertService.success("Incidencia registrada correctamente.");
        this.page = 1;
        this.cargarIncidencias();
      },
      error: (error: HttpErrorResponse) => this.mostrarError(error),
    });
  }
  private clasificarIncidencia(value: IncidenciaRevisionResult): void {
    this.screenLoadingService.show();
    this.incidenciaApi.clasificarIncidencia({ body: value }).pipe(finalize(() => this.screenLoadingService.hide())).subscribe({
      next: () => { this.alertService.success("Incidencia clasificada correctamente."); this.cargarIncidencias(); },
      error: (error: HttpErrorResponse) => this.mostrarError(error),
    });
  }
  private asignarResponsable(value: IncidenciaAsignarResponsableResult): void {
    this.screenLoadingService.show();
    this.incidenciaApi.asignarResponsable({ body: value }).pipe(finalize(() => this.screenLoadingService.hide())).subscribe({
      next: () => { this.alertService.success("Responsable asignado correctamente."); this.cargarIncidencias(); },
      error: (error: HttpErrorResponse) => this.mostrarError(error),
    });
  }
  private confirmarInicioAtencion(idIncidencia: number): void {
    this.screenLoadingService.show();
    this.incidenciaApi.iniciarAtencion({ body: { idIncidencia } }).pipe(finalize(() => this.screenLoadingService.hide())).subscribe({
      next: () => { this.alertService.success("La atención de la incidencia se inició correctamente."); this.cargarIncidencias(); },
      error: (error: HttpErrorResponse) => this.mostrarError(error),
    });
  }
  private confirmarResolucion(idIncidencia: number, descripcionResolucion: string): void {
    this.screenLoadingService.show();
    this.incidenciaApi.resolverIncidencia({ body: { idIncidencia, descripcionResolucion } }).pipe(finalize(() => this.screenLoadingService.hide())).subscribe({
      next: () => { this.alertService.success("La incidencia se marcó como resuelta correctamente."); this.cargarIncidencias(); },
      error: (error: HttpErrorResponse) => this.mostrarError(error),
    });
  }
  private confirmarEspera(idIncidencia: number, observacion: string): void {
    this.screenLoadingService.show();
    this.incidenciaApi.ponerEnEspera({ body: { idIncidencia, observacion } }).pipe(finalize(() => this.screenLoadingService.hide())).subscribe({
      next: () => { this.alertService.success("La incidencia quedó en espera."); this.cargarIncidencias(); },
      error: (error: HttpErrorResponse) => this.mostrarError(error),
    });
  }
  private confirmarReanudacion(idIncidencia: number, observacion: string): void {
    this.screenLoadingService.show();
    this.incidenciaApi.reanudarAtencion({ body: { idIncidencia, observacion } }).pipe(finalize(() => this.screenLoadingService.hide())).subscribe({
      next: () => { this.alertService.success("La atención de la incidencia fue reanudada."); this.cargarIncidencias(); },
      error: (error: HttpErrorResponse) => this.mostrarError(error),
    });
  }
  private confirmarCancelacion(idIncidencia: number, observacion: string): void {
    this.screenLoadingService.show();
    this.incidenciaApi.cancelarIncidencia({ body: { idIncidencia, observacion } }).pipe(finalize(() => this.screenLoadingService.hide())).subscribe({
      next: () => { this.alertService.success("La incidencia fue cancelada."); this.cargarIncidencias(); },
      error: (error: HttpErrorResponse) => this.mostrarError(error),
    });
  }
  private confirmarCierre(idIncidencia: number): void {
    this.screenLoadingService.show();
    this.incidenciaApi.cerrarIncidencia({ body: { idIncidencia } }).pipe(finalize(() => this.screenLoadingService.hide())).subscribe({
      next: () => { this.alertService.success("La incidencia se cerró correctamente."); this.cargarIncidencias(); },
      error: (error: HttpErrorResponse) => this.mostrarError(error),
    });
  }
  private confirmarRevisionCritica(idIncidencia: number, aprobada: boolean, observacion: string): void {
    this.screenLoadingService.show();
    this.incidenciaApi.registrarRevisionSupervisor({ body: { idIncidencia, aprobada, observacion } }).pipe(finalize(() => this.screenLoadingService.hide())).subscribe({
      next: () => {
        this.alertService.success(aprobada ? "La revisión fue aprobada; ahora puedes cerrar la incidencia." : "La revisión fue rechazada; la incidencia no puede cerrarse.");
        this.cargarIncidencias();
      },
      error: (error: HttpErrorResponse) => this.mostrarError(error),
    });
  }
  private confirmarReapertura(idIncidencia: number, observacion: string): void {
    this.screenLoadingService.show();
    this.incidenciaApi.reabrirIncidencia({ body: { idIncidencia, observacion } }).pipe(finalize(() => this.screenLoadingService.hide())).subscribe({
      next: () => { this.alertService.success("La incidencia fue reabierta y queda pendiente de reanudar su atención."); this.cargarIncidencias(); },
      error: (error: HttpErrorResponse) => this.mostrarError(error),
    });
  }
  private solicitarObservacion(incidencia: IncidenciaResponse, titulo: string, descripcion: string, etiquetaObservacion: string, textoAccion: string, iconoAccion: string, confirmar: (observacion: string) => void): void {
    const modalRef = this.modalService.open(IncidenciaReabrirModalComponent, { centered: true, size: "lg", backdrop: "static", keyboard: false });
    modalRef.componentInstance.incidencia = incidencia;
    modalRef.componentInstance.titulo = titulo;
    modalRef.componentInstance.descripcion = descripcion;
    modalRef.componentInstance.etiquetaObservacion = etiquetaObservacion;
    modalRef.componentInstance.textoAccion = textoAccion;
    modalRef.componentInstance.iconoAccion = iconoAccion;
    modalRef.result.then((value: IncidenciaReabrirResult) => confirmar(value.observacion)).catch(() => undefined);
  }
  private mostrarError(error: HttpErrorResponse): void { const body = error.error as { message?: string } | null; this.alertService.error(body?.message ?? "No se pudieron cargar las incidencias."); }
}
