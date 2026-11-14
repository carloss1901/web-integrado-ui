/* tslint:disable */
/* eslint-disable */
import { MaestroResponse } from './maestro-response';
export interface UsuarioListadoResponse {
  activo?: boolean;
  apeMaterno?: string;
  apePaterno?: string;
  correo?: string;
  estadoDsc?: string;
  fecModificacion?: string;
  fecRegistro?: string;
  idUsuario?: number;
  nombres?: string;
  roles?: Array<MaestroResponse>;
  usuario?: string;
}
