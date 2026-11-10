import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class SessionService {
  readonly currentUser: User = { id: 1, name: 'Usuario demo', role: 'Administrador' };
}
