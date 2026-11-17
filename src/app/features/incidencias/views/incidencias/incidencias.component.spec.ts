import { FormBuilder } from '@angular/forms';
import { describe, expect, it } from 'vitest';
import { Role } from '../../../../core/constants/role.enum';
import { IncidenciasComponent } from './incidencias.component';

describe('IncidenciasComponent: permisos visuales', () => {
  function createComponent(roleId: Role): IncidenciasComponent {
    const session = { selectedRole: { id: roleId, nombre: 'Rol de prueba' } };
    return new IncidenciasComponent(
      new FormBuilder(),
      {} as never,
      {} as never,
      {} as never,
      {} as never,
      {} as never,
      session as never,
    );
  }

  it('habilita el registro únicamente para reportante y administrador', () => {
    expect(createComponent(Role.REPORTANTE).puedeRegistrarIncidencia).toBe(true);
    expect(createComponent(Role.ADMINISTRADOR).puedeRegistrarIncidencia).toBe(true);
    expect(createComponent(Role.SUPERVISOR).puedeRegistrarIncidencia).toBe(false);
  });

  it('asigna las acciones de revisión, atención y cierre al rol correspondiente', () => {
    expect(createComponent(Role.OPERADOR_MESA_CONTROL).puedeRevisarIncidencia).toBe(true);
    expect(createComponent(Role.RESPONSABLE_ATENCION).esResponsableAtencion).toBe(true);
    expect(createComponent(Role.SUPERVISOR).esSupervisor).toBe(true);
  });
});
