import '@angular/compiler';
import { describe, expect, it } from 'vitest';
import { IncidenciaResponse } from '../../../../api/api/models/incidencia-response';
import { IncidenciasTableComponent } from './incidencias-table.component';

const incidencia = (estado: string): IncidenciaResponse => ({ idIncidencia: 1, estado });

describe('IncidenciasTableComponent', () => {
  it('muestra al operador solo clasificación, asignación o cancelación según el estado', () => {
    const component = new IncidenciasTableComponent();
    component.puedeRevisar = true;
    component.puedeCancelar = true;

    expect(component.puedeClasificarIncidencia(incidencia('Registrada'))).toBe(true);
    expect(component.puedeAsignarResponsable(incidencia('Registrada'))).toBe(false);
    expect(component.puedeAsignarResponsable(incidencia('Clasificada'))).toBe(true);
    expect(component.puedeCancelarIncidencia(incidencia('Asignada'))).toBe(true);
    expect(component.puedeClasificarIncidencia(incidencia('Resuelta'))).toBe(false);
  });

  it('muestra al responsable únicamente las acciones compatibles con su estado', () => {
    const component = new IncidenciasTableComponent();
    component.puedeIniciarAtencion = true;

    expect(component.puedeIniciarAtencionIncidencia(incidencia('Asignada'))).toBe(true);
    expect(component.puedeResolverIncidencia(incidencia('Asignada'))).toBe(false);
    expect(component.puedePonerEnEspera(incidencia('En atención'))).toBe(true);
    expect(component.puedeReanudarAtencion(incidencia('En espera'))).toBe(true);
    expect(component.puedeReanudarAtencion(incidencia('Reabierta'))).toBe(true);
  });

  it('muestra cierre y reapertura al supervisor solo para incidencias resueltas', () => {
    const component = new IncidenciasTableComponent();
    component.puedeCerrar = true;

    expect(component.puedeCerrarIncidencia(incidencia('Resuelta'))).toBe(true);
    expect(component.puedeReabrirIncidencia(incidencia('Resuelta'))).toBe(true);
    expect(component.puedeCerrarIncidencia(incidencia('Cerrada'))).toBe(false);
    expect(component.puedeReabrirIncidencia(incidencia('En atención'))).toBe(false);
  });
  it('exige revisión aprobada antes de mostrar el cierre de una incidencia crítica', () => {
    const component = new IncidenciasTableComponent();
    component.puedeCerrar = true;
    const critica: IncidenciaResponse = { idIncidencia: 1, estado: 'Resuelta', severidad: 'Crítica' };

    expect(component.requiereRevisionSupervisor(critica)).toBe(true);
    expect(component.puedeCerrarIncidencia(critica)).toBe(false);

    critica.revisionSupervisorAprobada = true;
    expect(component.requiereRevisionSupervisor(critica)).toBe(false);
    expect(component.puedeCerrarIncidencia(critica)).toBe(true);
  });
});
