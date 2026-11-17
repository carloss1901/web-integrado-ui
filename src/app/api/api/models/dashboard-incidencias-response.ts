/* tslint:disable */
/* eslint-disable */
import { CargaResponsableResponse } from './carga-responsable-response';
import { IndicadorAgrupadoResponse } from './indicador-agrupado-response';
export interface DashboardIncidenciasResponse {
  cargaResponsables?: Array<CargaResponsableResponse>;
  dentroSla?: number;
  incumplidasSla?: number;
  porCategoria?: Array<IndicadorAgrupadoResponse>;
  porSeveridad?: Array<IndicadorAgrupadoResponse>;
  porZona?: Array<IndicadorAgrupadoResponse>;
  totalPeriodo?: number;
}
