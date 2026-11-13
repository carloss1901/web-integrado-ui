/* tslint:disable */
/* eslint-disable */
import { CustomPageable } from './custom-pageable';
import { IncidenciaHistorialResponse } from './incidencia-historial-response';
export interface CustomPageIncidenciaHistorialResponse {
  data?: Array<IncidenciaHistorialResponse>;
  pageable?: CustomPageable;
}
