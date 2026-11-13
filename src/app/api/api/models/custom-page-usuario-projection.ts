/* tslint:disable */
/* eslint-disable */
import { CustomPageable } from './custom-pageable';
import { UsuarioProjection } from './usuario-projection';
export interface CustomPageUsuarioProjection {
  data?: Array<UsuarioProjection>;
  pageable?: CustomPageable;
}
