/* tslint:disable */
/* eslint-disable */
import { CustomPageable } from './custom-pageable';
import { UsuarioListadoResponse } from './usuario-listado-response';
export interface CustomPageUsuarioListadoResponse {
  data?: Array<UsuarioListadoResponse>;
  pageable?: CustomPageable;
}
