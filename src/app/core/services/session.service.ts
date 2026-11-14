import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { STORAGE_KEYS } from '../constants/storage-keys.constant';

interface JwtPayload {
  idUsuario?: number;
  nombres?: string;
  apePaterno?: string;
  apeMaterno?: string;
  roles?: Array<{ id: number | null; nombre: string }>;
  rolSeleccionado?: { id: number | null; nombre: string };
  sub?: string;
}

export interface SessionRole {
  id: number;
  nombre: string;
}

@Injectable({ providedIn: 'root' })
export class SessionService {
  private readonly fallbackUser: User = { id: 0, name: 'Usuario', role: 'Sin rol' };
  private readonly legacyTokenKey = 'web-integrado.token';

  get token(): string | null {
    return localStorage.getItem(STORAGE_KEYS.token);
  }

  get currentUser(): User {
    const savedUser = localStorage.getItem(STORAGE_KEYS.user) ?? sessionStorage.getItem(STORAGE_KEYS.user);
    return savedUser ? JSON.parse(savedUser) as User : this.fallbackUser;
  }

  get isAuthenticated(): boolean {
    return Boolean(this.token);
  }

  get availableRoles(): SessionRole[] {
    const payload = this.token ? this.decodeToken(this.token) : {};
    return (payload.roles ?? []).filter((role): role is { id: number; nombre: string } => role.id !== null);
  }

  get selectedRole(): SessionRole | null {
    const payload = this.token ? this.decodeToken(this.token) : {};
    const role = payload.rolSeleccionado;
    return role?.id === null || role?.id === undefined ? null : role as SessionRole;
  }

  startSession(token: string, _remember: boolean): void {
    const payload = this.decodeToken(token);
    const user: User = {
      id: Number(payload.idUsuario ?? 0),
      name: [payload.nombres, payload.apePaterno, payload.apeMaterno]
        .filter(Boolean)
        .join(' ') || payload.sub || 'Usuario',
      role: payload.rolSeleccionado?.nombre ?? payload.roles?.map((role) => role.nombre).join(', ') ?? 'Sin rol'
    };
    localStorage.removeItem(this.legacyTokenKey);
    localStorage.setItem(STORAGE_KEYS.token, token);
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
  }

  clearSession(): void {
    localStorage.removeItem(this.legacyTokenKey);
    localStorage.removeItem(STORAGE_KEYS.token);
    localStorage.removeItem(STORAGE_KEYS.user);
    sessionStorage.removeItem(STORAGE_KEYS.user);
  }

  private decodeToken(token: string): JwtPayload {
    const encodedPayload = token.split('.')[1];
    if (!encodedPayload) {
      return {};
    }

    const normalizedPayload = encodedPayload.replace(/-/g, '+').replace(/_/g, '/');
    const padding = '='.repeat((4 - normalizedPayload.length % 4) % 4);
    return JSON.parse(atob(normalizedPayload + padding)) as JwtPayload;
  }
}
