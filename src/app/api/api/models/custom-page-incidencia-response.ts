/* tslint:disable */
/* eslint-disable */
import { CustomPageable } from './custom-pageable';
import { IncidenciaResponse } from './incidencia-response';
export interface CustomPageIncidenciaResponse {
  data?: Array<IncidenciaResponse>;
  pageable?: CustomPageable;
}
