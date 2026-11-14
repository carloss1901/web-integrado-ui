import { CommonModule } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { finalize } from "rxjs";

import { MaestroResponse } from "../../../../api/api/models/maestro-response";
import { UsuarioListadoResponse } from "../../../../api/api/models/usuario-listado-response";
import {
  ComunesControllerService,
  UsuarioControllerService,
} from "../../../../api/api/services";
import { UsersFilterComponent } from "../../components/users-filter/users-filter.component";
import { UsersTableComponent } from "../../components/users-table/users-table.component";
import {
  UserModalComponent,
  UserModalResult,
} from "../../components/user-modal/user-modal.component";
import { TopbarComponent } from "../../../../shared/components/topbar/topbar.component";
import { AppButtonComponent } from "../../../../shared/components/app-button/app-button.component";
import { AlertService } from "../../../../core/services/alert.service";
import { ScreenLoadingService } from "../../../../core/services/screen-loading.service";
import { ConfirmationModalComponent } from "../../../../shared/components/confirmation-modal/confirmation-modal.component";
import { UserViewModalComponent } from "../../components/user-view-modal/user-view-modal.component";
import {
  PaginationChange,
  TableFooterPaginationComponent,
} from "../../../../shared/components/table-footer-pagination/table-footer-pagination.component";

@Component({
  selector: "app-usuarios",
  standalone: true,
  imports: [
    CommonModule,
    AppButtonComponent,
    TopbarComponent,
    TableFooterPaginationComponent,
    UsersFilterComponent,
    UsersTableComponent,
  ],
  templateUrl: "./usuarios.component.html",
})
export class UsuariosComponent implements OnInit {
  usuarios: UsuarioListadoResponse[] = [];
  roles: MaestroResponse[] = [];
  errorMessage = "";
  private rolesCargados = false;
  private cargandoRoles = false;
  loading = false;
  page = 1;
  pageSize = 5;
  readonly pageSizeOptions = [5, 10, 15];
  totalItems = 0;
  readonly estadoOptions = [
    { valor: "", descripcion: "Todos" },
    { valor: "1", descripcion: "Activo" },
    { valor: "0", descripcion: "Inactivo" },
  ];

  readonly filterForm = this.formBuilder.nonNullable.group({
    usuario: [""],
    nombres: [""],
    apellidos: [""],
    correo: [""],
    estado: [""],
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly usuarioApi: UsuarioControllerService,
    private readonly comunesApi: ComunesControllerService,
    private readonly modalService: NgbModal,
    private readonly alertService: AlertService,
    private readonly screenLoadingService: ScreenLoadingService,
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.totalItems / this.pageSize));
  }
  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }
  get rangeStart(): number {
    return this.totalItems ? (this.page - 1) * this.pageSize + 1 : 0;
  }
  get rangeEnd(): number {
    return Math.min(this.page * this.pageSize, this.totalItems);
  }

  abrirCrear(): void {
    this.abrirModalConRoles(null);
  }

  abrirEditar(usuario: UsuarioListadoResponse): void {
    this.abrirModalConRoles(usuario);
  }

  abrirVisualizar(usuario: UsuarioListadoResponse): void {
    const modalRef = this.modalService.open(UserViewModalComponent, {
      centered: true,
      size: "lg",
      scrollable: true,
    });
    modalRef.componentInstance.usuario = usuario;
  }

  private abrirModalConRoles(usuario: UsuarioListadoResponse | null): void {
    if (this.rolesCargados) {
      this.abrirModal(usuario, false);
      return;
    }

    if (this.cargandoRoles) return;

    this.cargandoRoles = true;
    const modalRef = this.abrirModal(usuario, true);
    this.comunesApi
      .listarRoles()
      .pipe(finalize(() => (this.cargandoRoles = false)))
      .subscribe({
        next: (roles) => {
          this.roles = roles ?? [];
          this.rolesCargados = true;
          modalRef.componentInstance.roles = this.roles;
          modalRef.componentInstance.cargandoRoles = false;
        },
        error: (error: HttpErrorResponse) => {
          modalRef.componentInstance.cargandoRoles = false;
          this.mostrarError(error);
        },
      });
  }

  private abrirModal(usuario: UsuarioListadoResponse | null, cargandoRoles: boolean) {
    const modalRef = this.modalService.open(UserModalComponent, {
      backdrop: "static",
      keyboard: false,
      centered: true,
      size: "lg",
      scrollable: true,
    });
    modalRef.componentInstance.roles = this.roles;
    modalRef.componentInstance.usuario = usuario;
    modalRef.componentInstance.cargandoRoles = cargandoRoles;
    modalRef.result
      .then((result: UserModalResult) => this.guardar(result))
      .catch(() => undefined);
    return modalRef;
  }

  private guardar(value: UserModalResult): void {
    this.screenLoadingService.show();
    const request =
      value.modo === "editar"
        ? this.usuarioApi.actualizarUsuario({
            body: {
              idUsuario: value.idUsuario ?? 0,
              nombres: value.nombres,
              apePaterno: value.apePaterno,
              apeMaterno: value.apeMaterno,
              correo: value.correo,
              idsRoles: value.idsRoles,
            },
          })
        : this.usuarioApi.registrarUsuario({
            body: {
              usuario: value.usuario,
              nombres: value.nombres,
              apePaterno: value.apePaterno,
              apeMaterno: value.apeMaterno,
              correo: value.correo,
              password: "campus360",
              idsRoles: value.idsRoles,
            },
          });

    request.pipe(finalize(() => this.screenLoadingService.hide())).subscribe({
      next: () => {
        this.alertService.success(
          value.modo === "editar"
            ? "Usuario actualizado correctamente."
            : "Usuario registrado correctamente.",
        );
        this.page = 1;
        this.cargarUsuarios();
      },
      error: (error: HttpErrorResponse) => this.mostrarError(error),
    });
  }

  eliminar(usuario: UsuarioListadoResponse): void {
    if (!usuario.idUsuario) return;

    const modalRef = this.modalService.open(ConfirmationModalComponent, {
      centered: true,
      size: "md",
      backdrop: "static",
    });
    modalRef.componentInstance.title = "Confirmación de eliminación";
    modalRef.componentInstance.confirmText = "Eliminar";
    modalRef.componentInstance.confirmIcon = "trash-2";
    modalRef.componentInstance.message =
      `¿Deseas eliminar al usuario ${usuario.usuario ?? "seleccionado"}?`;

    modalRef.result
      .then((confirmado: boolean) => {
        if (confirmado) this.confirmarEliminacion(usuario);
      })
      .catch(() => undefined);
  }

  private confirmarEliminacion(usuario: UsuarioListadoResponse): void {
    this.errorMessage = "";
    this.screenLoadingService.show();
    this.usuarioApi
      .eliminarUsuario({ idUsuario: usuario.idUsuario! })
      .pipe(finalize(() => this.screenLoadingService.hide()))
      .subscribe({
        next: () => {
          this.alertService.success("Usuario eliminado correctamente.");
          if (this.usuarios.length === 1 && this.page > 1) this.page -= 1;
          this.cargarUsuarios();
        },
        error: (error: HttpErrorResponse) => this.mostrarError(error),
      });
  }

  reactivar(usuario: UsuarioListadoResponse): void {
    if (!usuario.idUsuario) return;

    const modalRef = this.modalService.open(ConfirmationModalComponent, {
      centered: true,
      size: "md",
      backdrop: "static",
    });
    modalRef.componentInstance.title = "Confirmación de reactivación";
    modalRef.componentInstance.message =
      `¿Deseas reactivar al usuario ${usuario.usuario ?? "seleccionado"}?`;
    modalRef.componentInstance.confirmText = "Reactivar";
    modalRef.componentInstance.confirmIcon = "refresh-cw";

    modalRef.result
      .then((confirmado: boolean) => {
        if (!confirmado) return;
        this.errorMessage = "";
        this.screenLoadingService.show();
        this.usuarioApi
          .activarUsuario({ idUsuario: usuario.idUsuario! })
          .pipe(finalize(() => this.screenLoadingService.hide()))
          .subscribe({
            next: () => {
              this.alertService.success("Usuario reactivado correctamente.");
              this.cargarUsuarios();
            },
            error: (error: HttpErrorResponse) => this.mostrarError(error),
          });
      })
      .catch(() => undefined);
  }

  cambiarPagina(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.page) return;
    this.page = page;
    this.cargarUsuarios();
  }

  cambiarPageSize(pageSize: number): void {
    this.pageSize = pageSize;
    this.page = 1;
    this.cargarUsuarios();
  }

  onChangePaginate(event: PaginationChange): void {
    this.page = event.page;
    this.pageSize = event.pageSize;
    this.cargarUsuarios();
  }

  aplicarFiltros(): void {
    this.page = 1;
    this.cargarUsuarios();
  }

  limpiarFiltros(): void {
    this.filterForm.reset({
      usuario: "",
      nombres: "",
      apellidos: "",
      correo: "",
      estado: "",
    });
    this.page = 1;
    this.cargarUsuarios();
  }

  private cargarUsuarios(): void {
    this.loading = true;
    const filters = this.filterForm.getRawValue();
    const params: Parameters<UsuarioControllerService["listarUsuario"]>[0] = {
      page: this.page,
      size: this.pageSize,
      usuario: filters.usuario.trim() || undefined,
      nombres: filters.nombres.trim() || undefined,
      apellidos: filters.apellidos.trim() || undefined,
      correo: filters.correo.trim() || undefined,
      estado: filters.estado === "" ? undefined : Number(filters.estado),
    };
    this.usuarioApi
      .listarUsuario(params)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (response) => {
          this.usuarios = response?.data ?? [];
          this.totalItems = Number(response?.pageable?.totalElements ?? 0);
        },
        error: (error: HttpErrorResponse) => this.mostrarError(error),
      });
  }

  private mostrarError(error: HttpErrorResponse): void {
    const body = error.error as { message?: string } | null;
    this.alertService.error(body?.message ?? "No se pudo completar la operación.");
    this.errorMessage = body?.message ?? "No se pudo completar la operación.";
  }
}
