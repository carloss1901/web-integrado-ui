import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  readonly loginForm = this.formBuilder.nonNullable.group({
    usuario: ['', Validators.required],
    contrasenia: ['', Validators.required],
    recordar: [false]
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {}

  ingresar(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.router.navigate(['/inicio']);
  }
}
