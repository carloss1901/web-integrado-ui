import { CommonModule } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { catchError, finalize, forkJoin, of } from "rxjs";
import { IncidenciaResponse } from "../../../../api/api/models/incidencia-response";
import { MaestroResponse } from "../../../../api/api/models/maestro-response";
import { ComunesControllerService, IncidenciaControllerService } from "../../../../api/api/services";
import { AlertService } from "../../../../core/services/alert.service";
import { ScreenLoadingService } from "../../../../core/services/screen-loading.service";
import { IncidenciasFilterComponent } from "../../components/incidencias-filter/incidencias-filter.component";
import { IncidenciasTableComponent } from "../../components/incidencias-table/incidencias-table.component";
import { IncidenciaViewModalComponent } from "../../components/incidencia-view-modal/incidencia-view-modal.component";
import { IncidenciaModalComponent, IncidenciaModalResult } from "../../components/incidencia-modal/incidencia-modal.component";
import { TopbarComponent } from "../../../../shared/components/topbar/topbar.component";
import { AppButtonComponent } from "../../../../shared/components/app-button/app-button.component";
import { PaginationChange, TableFooterPaginationComponent } from "../../../../shared/components/table-footer-pagination/table-footer-pagination.component";

@Component({ selector: "app-incidencias", standalone: true, imports: [CommonModule, ReactiveFormsModule, TopbarComponent, AppButtonComponent, TableFooterPaginationComponent, IncidenciasFilterComponent, IncidenciasTableComponent, IncidenciaModalComponent, IncidenciaViewModalComponent], templateUrl: "./incidencias.component.html" })
export class IncidenciasComponent implements OnInit {
  private incidenciasTodas: IncidenciaResponse[] = [];
  incidencias: IncidenciaResponse[] = [];
  estados: MaestroResponse[] = [];
  categorias: MaestroResponse[] = [];
  severidades: MaestroResponse[] = [];
  prioridades: MaestroResponse[] = [];
  ubicaciones: MaestroResponse[] = [];
  loading = false;
  page = 1;
  pageSize = 5;
  totalItems = 0;
  readonly pageSizeOptions = [5, 10, 15];
  readonly filterForm = this.formBuilder.group({ codigo: [""], titulo: [""], reportante: [""], estado: [null as string | null], categoria: [null as string | null], prioridad: [null as string | null], severidad: [null as string | null], ubicacion: [null as string | null] });

  constructor(private readonly formBuilder: FormBuilder, private readonly incidenciaApi: IncidenciaControllerService, private readonly comunesApi: ComunesControllerService, private readonly modalService: NgbModal, private readonly alertService: AlertService, private readonly screenLoadingService: ScreenLoadingService) {}
  ngOnInit(): void { this.cargarCatalogos(); this.cargarIncidencias(); }
  abrirVisualizar(incidencia: IncidenciaResponse): void { const modalRef = this.modalService.open(IncidenciaViewModalComponent, { centered: true, size: "lg", scrollable: true }); modalRef.componentInstance.incidencia = incidencia; }
  abrirRegistrar(): void {
    const modalRef = this.modalService.open(IncidenciaModalComponent, { centered: true, size: "lg", backdrop: "static", keyboard: false });
    modalRef.componentInstance.categorias = this.categorias;
    modalRef.componentInstance.ubicaciones = this.ubicaciones;
    modalRef.result.then((value: IncidenciaModalResult) => this.guardarIncidencia(value)).catch(() => undefined);
  }
  aplicarFiltros(): void { this.page = 1; this.aplicarFiltrado(); }
  limpiarFiltros(): void { this.filterForm.reset({ codigo: "", titulo: "", reportante: "", estado: null, categoria: null, prioridad: null, severidad: null, ubicacion: null }); this.page = 1; this.aplicarFiltrado(); }
  onChangePaginate(event: PaginationChange): void { this.page = event.page; this.pageSize = event.pageSize; this.aplicarFiltrado(); }

  private cargarIncidencias(): void {
    this.loading = true;
    this.incidenciaApi.listarIncidencias().pipe(finalize(() => (this.loading = false))).subscribe({ next: (response) => { this.incidenciasTodas = response ?? []; this.aplicarFiltrado(); }, error: (error: HttpErrorResponse) => this.mostrarError(error) });
  }
  private cargarCatalogos(): void {
    forkJoin({
      estados: this.comunesApi.listarEstadosIncidencia().pipe(catchError(() => of([] as MaestroResponse[]))),
      categorias: this.comunesApi.listarCategorias().pipe(catchError(() => of([] as MaestroResponse[]))),
      severidades: this.comunesApi.listarSeveridades().pipe(catchError(() => of([] as MaestroResponse[]))),
      prioridades: this.comunesApi.listarPrioridades().pipe(catchError(() => of([] as MaestroResponse[]))),
      ubicaciones: this.comunesApi.listarUbicaciones().pipe(catchError(() => of([] as MaestroResponse[]))),
    }).subscribe((catalogos) => {
      this.estados = catalogos.estados ?? [];
      this.categorias = catalogos.categorias ?? [];
      this.severidades = catalogos.severidades ?? [];
      this.prioridades = catalogos.prioridades ?? [];
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
  private aplicarFiltrado(): void {
    const filters = this.filterForm.getRawValue();
    const coincide = (value: string | undefined, filter: string | null): boolean => !filter?.trim() || (value ?? "").toLowerCase().includes(filter.trim().toLowerCase());
    const igual = (value: string | undefined, filter: string | null): boolean => !filter || (value ?? "") === filter;
    const filtradas = this.incidenciasTodas.filter((item) => coincide(item.codigo, filters.codigo) && coincide(item.titulo, filters.titulo) && coincide(item.reportante, filters.reportante) && igual(item.estado, filters.estado) && igual(item.categoria, filters.categoria) && igual(item.prioridad, filters.prioridad) && igual(item.severidad, filters.severidad) && igual(item.ubicacion, filters.ubicacion));
    this.totalItems = filtradas.length;
    const maxPage = Math.max(1, Math.ceil(this.totalItems / this.pageSize));
    this.page = Math.min(this.page, maxPage);
    const start = (this.page - 1) * this.pageSize;
    this.incidencias = filtradas.slice(start, start + this.pageSize);
  }
  private mostrarError(error: HttpErrorResponse): void { const body = error.error as { message?: string } | null; this.alertService.error(body?.message ?? "No se pudieron cargar las incidencias."); }
}
