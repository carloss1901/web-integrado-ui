import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";

import { MaestroResponse } from "../../../../api/api/models/maestro-response";
import { UsuarioProjection } from "../../../../api/api/models/usuario-projection";
import { PlaceholderEnum } from "../../../../core/enums/placeholder.enum";
import { AppButtonComponent } from "../../../../shared/components/app-button/app-button.component";

export interface UserModalResult {
  modo: "crear" | "editar";
  idUsuario?: number;
  usuario: string;
  nombres: string;
  apellidos: string;
  correo: string;
  password?: string;
  idRol: number;
}

@Component({
  selector: "app-user-modal",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
    AppButtonComponent,
  ],
  templateUrl: "./user-modal.component.html",
})
export class UserModalComponent implements OnInit {
  readonly placeholders = PlaceholderEnum;
  @Input() roles: MaestroResponse[] = [];
  @Input() usuario: UsuarioProjection | null = null;

  submitted = false;

  readonly userForm = this.formBuilder.nonNullable.group({
    usuario: ["", [Validators.required, Validators.maxLength(50)]],
    nombres: ["", [Validators.required, Validators.maxLength(100)]],
    apellidos: ["", [Validators.required, Validators.maxLength(100)]],
    correo: [
      "",
      [Validators.required, Validators.email, Validators.maxLength(150)],
    ],
    password: ["", [Validators.required, Validators.minLength(6)]],
    idRol: this.formBuilder.control<number | null>(null, [
      Validators.required,
      Validators.min(1),
    ]),
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    public readonly activeModal: NgbActiveModal,
  ) {}

  ngOnInit(): void {
    if (!this.usuario) return;

    const role = this.roles.find(
      (item) => item.descripcion === this.usuario?.roles,
    );
    this.userForm.reset({
      usuario: this.usuario.usuario ?? "",
      nombres: this.usuario.nombres ?? "",
      apellidos: this.usuario.apellidos ?? "",
      correo: this.usuario.correo ?? "",
      password: "",
      idRol: role?.maestroId ?? null,
    });
    this.userForm.controls.usuario.disable();
    this.userForm.controls.password.clearValidators();
    this.userForm.controls.password.updateValueAndValidity();
  }

  get modoEdicion(): boolean {
    return this.usuario !== null;
  }

  controlInvalido(controlName: string): boolean {
    const control = this.userForm.get(controlName);
    return Boolean(control?.invalid && (control.touched || this.submitted));
  }

  guardar(): void {
    this.submitted = true;
    this.userForm.markAllAsTouched();
    if (this.userForm.invalid) return;

    const value = this.userForm.getRawValue();
    const result: UserModalResult = {
      modo: this.modoEdicion ? "editar" : "crear",
      idUsuario: this.usuario?.idUsuario,
      usuario: value.usuario.trim(),
      nombres: value.nombres.trim(),
      apellidos: value.apellidos.trim(),
      correo: value.correo.trim(),
      password: value.password,
      idRol: value.idRol!,
    };

    this.activeModal.close(result);
  }

  cerrar(): void {
    this.activeModal.dismiss();
  }
}
