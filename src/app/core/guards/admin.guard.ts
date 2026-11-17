import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Role } from '../constants/role.enum';
import { SessionService } from '../services/session.service';

export const adminGuard: CanActivateFn = () => {
  const session = inject(SessionService);
  const router = inject(Router);
  return session.selectedRole?.id === Role.ADMINISTRADOR
    ? true
    : router.createUrlTree(['/inicio']);
};
