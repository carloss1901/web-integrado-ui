import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  passwordVisible = false;
  submitted = false;
  loading = false;
  errorMessage = '';

  readonly loginForm = this.formBuilder.nonNullable.group({
    usuario: ['', Validators.required],
    contrasenia: ['', Validators.required],
    recordar: [false]
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  ingresar(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    const { usuario, contrasenia, recordar } = this.loginForm.getRawValue();

    this.authService.login(usuario, contrasenia, recordar).pipe(
      finalize(() => this.loading = false)
    ).subscribe({
      next: () => this.router.navigate(['/inicio']),
      error: (error: { error?: { message?: string }; message?: string }) => {
        this.errorMessage = error.error?.message ?? error.message ?? 'No fue posible iniciar sesión.';
      }
    });
  }
}
