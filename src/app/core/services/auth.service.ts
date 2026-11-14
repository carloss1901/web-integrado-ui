import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthControllerService } from '../../api/api/services';
import { SessionService } from './session.service';

interface ApiMessageResponse<T> {
  success: boolean;
  message: string;
  status: number;
  data: T;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private readonly api: AuthControllerService,
    private readonly session: SessionService
  ) {}

  login(usuario: string, contrasena: string, remember: boolean): Observable<unknown> {
    return this.api.login({ body: { usuario, contrasena } }).pipe(
      tap((response) => {
        const result = response as ApiMessageResponse<string>;
        if (!result.success || !result.data) {
          throw new Error(result.message || 'No fue posible iniciar sesión.');
        }
        this.session.startSession(result.data, remember);
      })
    );
  }

  selectRole(idRol: number): Observable<unknown> {
    const token = this.session.token;
    return this.api.seleccionarRol({
      Authorization: `Bearer ${token ?? ''}`,
      body: { idRol }
    }).pipe(
      tap((response) => {
        const result = response as ApiMessageResponse<string>;
        if (!result.success || !result.data) {
          throw new Error(result.message || 'No fue posible seleccionar el rol.');
        }
        this.session.startSession(result.data, true);
      })
    );
  }

  logout(): void {
    this.session.clearSession();
  }
}
