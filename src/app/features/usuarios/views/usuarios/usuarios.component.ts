import { CommonModule } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { finalize } from "rxjs";

import { MaestroResponse } from "../../../../api/api/models/maestro-response";
import { UsuarioProjection } from "../../../../api/api/models/usuario-projection";
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
  usuarios: UsuarioProjection[] = [];
  roles: MaestroResponse[] = [];
  loading = false;
  errorMessage = "";
  successMessage = "";
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
  ) {}

  ngOnInit(): void {
    this.cargarRoles();
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
    this.abrirModal(null);
  }

  abrirEditar(usuario: UsuarioProjection): void {
    this.abrirModal(usuario);
  }

  private abrirModal(usuario: UsuarioProjection | null): void {
    const modalRef = this.modalService.open(UserModalComponent, {
      backdrop: "static",
      keyboard: false,
      centered: true,
      size: "lg",
      scrollable: true,
    });
    modalRef.componentInstance.roles = this.roles;
    modalRef.componentInstance.usuario = usuario;
    modalRef.result
      .then((result: UserModalResult) => this.guardar(result))
      .catch(() => undefined);
  }

  private guardar(value: UserModalResult): void {
    this.errorMessage = "";
    const request =
      value.modo === "editar"
        ? this.usuarioApi.actualizarUsuario({
            body: {
              idUsuario: value.idUsuario ?? 0,
              nombres: value.nombres,
              apellidos: value.apellidos,
              correo: value.correo,
              idsRoles: [value.idRol],
            },
          })
        : this.usuarioApi.registrarUsuario({
            body: {
              usuario: value.usuario,
              nombres: value.nombres,
              apellidos: value.apellidos,
              correo: value.correo,
              password: value.password ?? "",
              idsRoles: [value.idRol],
            },
          });

    request.subscribe({
      next: () => {
        this.successMessage =
          value.modo === "editar"
            ? "Usuario actualizado correctamente."
            : "Usuario registrado correctamente.";
        this.page = 1;
        this.cargarUsuarios();
      },
      error: (error: HttpErrorResponse) => this.mostrarError(error),
    });
  }

  eliminar(usuario: UsuarioProjection): void {
    if (
      !usuario.idUsuario ||
      !window.confirm(
        `¿Deseas eliminar a ${usuario.usuario ?? "este usuario"}?`,
      )
    )
      return;
    this.errorMessage = "";
    this.usuarioApi
      .eliminarUsuario({ idUsuario: usuario.idUsuario })
      .subscribe({
        next: () => {
          this.successMessage = "Usuario eliminado correctamente.";
          if (this.usuarios.length === 1 && this.page > 1) this.page -= 1;
          this.cargarUsuarios();
        },
        error: (error: HttpErrorResponse) => this.mostrarError(error),
      });
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

  private cargarRoles(): void {
    this.comunesApi.listarRoles().subscribe({
      next: (roles) => (this.roles = roles ?? []),
      error: (error: HttpErrorResponse) => this.mostrarError(error),
    });
  }

  private cargarUsuarios(): void {
    this.loading = true;
    this.errorMessage = "";
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
    this.errorMessage = body?.message ?? "No se pudo completar la operación.";
  }
}
