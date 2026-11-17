import { firstValueFrom, of } from 'rxjs';
import { describe, expect, it, vi } from 'vitest';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  it('guarda la sesión cuando el login retorna un JWT válido', async () => {
    const api = { login: vi.fn(() => of({ success: true, data: 'jwt-demo' })) };
    const session = { startSession: vi.fn() };
    const service = new AuthService(api as never, session as never);

    await firstValueFrom(service.login('12345678', 'secreto', true));

    expect(api.login).toHaveBeenCalledWith({ body: { usuario: '12345678', contrasena: 'secreto' } });
    expect(session.startSession).toHaveBeenCalledWith('jwt-demo', true);
  });

  it('rechaza una respuesta de login sin token', async () => {
    const api = { login: vi.fn(() => of({ success: false, message: 'Credenciales inválidas' })) };
    const session = { startSession: vi.fn() };
    const service = new AuthService(api as never, session as never);

    await expect(firstValueFrom(service.login('12345678', 'fallida', false)))
      .rejects.toThrow('Credenciales inválidas');
    expect(session.startSession).not.toHaveBeenCalled();
  });
});
