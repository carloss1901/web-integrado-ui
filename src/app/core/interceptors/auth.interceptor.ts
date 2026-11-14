import { HttpInterceptorFn } from '@angular/common/http';
import { STORAGE_KEYS } from '../constants/storage-keys.constant';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const token = localStorage.getItem(STORAGE_KEYS.token)?.replace(/^Bearer\s+/i, '').trim();

  if (!token || request.url.includes('/auth/login')) {
    return next(request);
  }

  return next(request.clone({ setHeaders: { Authorization: `Bearer ${token}` } }));
};
