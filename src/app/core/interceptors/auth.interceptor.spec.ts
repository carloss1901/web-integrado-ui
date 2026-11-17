import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { STORAGE_KEYS } from '../constants/storage-keys.constant';
import { SessionService } from '../services/session.service';
import { authInterceptor } from './auth.interceptor';

describe('authInterceptor', () => {
  const session = { clearSession: vi.fn() };
  const router = { navigate: vi.fn().mockResolvedValue(true) };

  beforeEach(() => {
    localStorage.clear();
    session.clearSession.mockClear();
    router.navigate.mockClear();
    TestBed.configureTestingModule({
      providers: [
        { provide: SessionService, useValue: session },
        { provide: Router, useValue: router },
      ],
    });
  });

  it('adjunta un Bearer token a las solicitudes protegidas', async () => {
    localStorage.setItem(STORAGE_KEYS.token, 'token-prueba');
    let authorization = '';
    const request = new HttpRequest('GET', '/incidencias/listar');

    await new Promise<void>((resolve) => TestBed.runInInjectionContext(() =>
      authInterceptor(request, (nextRequest) => {
        authorization = nextRequest.headers.get('Authorization') ?? '';
        resolve();
        return of(new HttpResponse({ status: 200 }));
      }).subscribe()
    ));

    expect(authorization).toBe('Bearer token-prueba');
  });

  it.each([401, 403])('limpia la sesión y redirige al login ante %i', async (status) => {
    localStorage.setItem(STORAGE_KEYS.token, 'token-prueba');
    const request = new HttpRequest('GET', '/incidencias/listar');

    await new Promise<void>((resolve) => TestBed.runInInjectionContext(() =>
      authInterceptor(request, () => throwError(() => new HttpErrorResponse({ status })))
        .subscribe({ error: () => resolve() })
    ));

    expect(session.clearSession).toHaveBeenCalledOnce();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
