import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { MaestroResponse } from "../../../../api/api/models/maestro-response";
import { UsuarioListadoResponse } from "../../../../api/api/models/usuario-listado-response";
import { PlaceholderEnum } from "../../../../core/enums/placeholder.enum";
import { AlertService } from "../../../../core/services/alert.service";
import { AppButtonComponent } from "../../../../shared/components/app-button/app-button.component";
import { AppLoadingComponent } from "../../../../shared/components/app-loading/app-loading.component";
import { OnlyNumbersDirective } from "../../../../shared/directives/only-numbers.directive";

export interface UserModalResult {
  modo: "crear" | "editar";
  idUsuario?: number;
  usuario: string;
  nombres: string;
  apePaterno: string;
  apeMaterno: string;
  correo: string;
  idsRoles: number[];
}

@Component({
  selector: "app-user-modal",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppButtonComponent,
    AppLoadingComponent,
    OnlyNumbersDirective,
  ],
  templateUrl: "./user-modal.component.html",
})
export class UserModalComponent implements OnInit {
  readonly placeholders = PlaceholderEnum;
  @Input() roles: MaestroResponse[] = [];
  @Input() usuario: UsuarioListadoResponse | null = null;
  @Input() cargandoRoles = false;

  submitted = false;

  readonly userForm = this.formBuilder.nonNullable.group({
    usuario: [
      "",
      [Validators.required, Validators.maxLength(8), Validators.pattern(/^\d{1,8}$/)],
    ],
    nombres: ["", [Validators.required, Validators.maxLength(100)]],
    apePaterno: ["", [Validators.required, Validators.maxLength(100)]],
    apeMaterno: ["", [Validators.maxLength(100)]],
    correo: [
      "",
      [Validators.required, Validators.email, Validators.maxLength(150)],
    ],
    idsRoles: this.formBuilder.nonNullable.control<number[]>([], [
      Validators.minLength(1),
    ]),
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    public readonly activeModal: NgbActiveModal,
    private readonly alertService: AlertService,
  ) {}

  ngOnInit(): void {
    if (!this.usuario) return;

    this.userForm.reset({
      usuario: this.usuario.usuario ?? "",
      nombres: this.usuario.nombres ?? "",
      apePaterno: this.usuario.apePaterno ?? "",
      apeMaterno: this.usuario.apeMaterno ?? "",
      correo: this.usuario.correo ?? "",
      idsRoles: (this.usuario.roles ?? [])
        .map((role) => role.maestroId)
        .filter((id): id is number => id !== undefined),
    });
    this.userForm.controls.usuario.disable();
  }

  get modoEdicion(): boolean {
    return this.usuario !== null;
  }

  get formularioValido(): boolean {
    return this.userForm.valid && !this.cargandoRoles;
  }

  controlInvalido(controlName: string): boolean {
    const control = this.userForm.get(controlName);
    return Boolean(control?.invalid && (control.touched || this.submitted));
  }

  rolSeleccionado(idRol: number): boolean {
    return this.userForm.controls.idsRoles.value.includes(idRol);
  }

  alternarRol(idRol: number): void {
    const rolesSeleccionados = this.userForm.controls.idsRoles.value;
    const idsRoles = rolesSeleccionados.includes(idRol)
      ? rolesSeleccionados.filter((id) => id !== idRol)
      : [...rolesSeleccionados, idRol];

    this.userForm.controls.idsRoles.setValue(idsRoles);
    this.userForm.controls.idsRoles.markAsDirty();
    this.userForm.controls.idsRoles.markAsTouched();
  }

  guardar(): void {
    this.submitted = true;
    this.userForm.markAllAsTouched();
    if (!this.formularioValido) {
      this.alertService.warning(
        "Completa los campos obligatorios y selecciona al menos un rol.",
      );
      return;
    }

    const value = this.userForm.getRawValue();
    const result: UserModalResult = {
      modo: this.modoEdicion ? "editar" : "crear",
      idUsuario: this.usuario?.idUsuario,
      usuario: value.usuario.trim(),
      nombres: value.nombres.trim(),
      apePaterno: value.apePaterno.trim(),
      apeMaterno: value.apeMaterno.trim(),
      correo: value.correo.trim(),
      idsRoles: value.idsRoles,
    };

    this.activeModal.close(result);
  }

  cerrar(): void {
    this.activeModal.dismiss();
  }
}
