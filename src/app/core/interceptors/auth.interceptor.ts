import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { STORAGE_KEYS } from '../constants/storage-keys.constant';
import { SessionService } from '../services/session.service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const session = inject(SessionService);
  const router = inject(Router);
  const token = localStorage.getItem(STORAGE_KEYS.token)?.replace(/^Bearer\s+/i, '').trim();

  const authenticatedRequest = token && !request.url.includes('/auth/login')
    ? request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : request;

  return next(authenticatedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      // Un 403 significa que el usuario no tiene permiso para la operación;
      // no implica que su sesión haya vencido.
      const sessionInvalida = error.status === 401;
      if (sessionInvalida && !request.url.includes('/auth/login')) {
        session.clearSession();
        void router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
