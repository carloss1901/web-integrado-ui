/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { ActualizarEstadoIncidenciaRequest } from '../models/actualizar-estado-incidencia-request';
import { ActualizarIncidenciaRequest } from '../models/actualizar-incidencia-request';
import { AsignarResponsableRequest } from '../models/asignar-responsable-request';
import { ClasificarIncidenciaRequest } from '../models/clasificar-incidencia-request';
import { CustomPageIncidenciaAccionCorrectivaResponse } from '../models/custom-page-incidencia-accion-correctiva-response';
import { CustomPageIncidenciaComentarioResponse } from '../models/custom-page-incidencia-comentario-response';
import { CustomPageIncidenciaEvidenciaResponse } from '../models/custom-page-incidencia-evidencia-response';
import { CustomPageIncidenciaHistorialResponse } from '../models/custom-page-incidencia-historial-response';
import { CustomPageIncidenciaResponse } from '../models/custom-page-incidencia-response';
import { IncidenciaBusquedaResponse } from '../models/incidencia-busqueda-response';
import { IncidenciaResponse } from '../models/incidencia-response';
import { IndicadoresIncidenciaResponse } from '../models/indicadores-incidencia-response';
import { RegistrarAccionCorrectivaRequest } from '../models/registrar-accion-correctiva-request';
import { RegistrarComentarioRequest } from '../models/registrar-comentario-request';
import { RegistrarEvidenciaRequest } from '../models/registrar-evidencia-request';
import { RegistrarIncidenciaRequest } from '../models/registrar-incidencia-request';

@Injectable({
  providedIn: 'root',
})
export class IncidenciaControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation actualizarIncidencia
   */
  static readonly ActualizarIncidenciaPath = '/incidencias/actualizar';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `actualizarIncidencia()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  actualizarIncidencia$Response(params: {
    context?: HttpContext
    body: ActualizarIncidenciaRequest
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, IncidenciaControllerService.ActualizarIncidenciaPath, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        }>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `actualizarIncidencia$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  actualizarIncidencia(params: {
    context?: HttpContext
    body: ActualizarIncidenciaRequest
  }
): Observable<{
}> {

    return this.actualizarIncidencia$Response(params).pipe(
      map((r: StrictHttpResponse<{
}>) => r.body as {
})
    );
  }

  /**
   * Path part for operation resolverIncidencia
   */
  static readonly ResolverIncidenciaPath = '/incidencias/resolver';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `resolverIncidencia()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  resolverIncidencia$Response(params: {
    context?: HttpContext
    body: ActualizarEstadoIncidenciaRequest
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, IncidenciaControllerService.ResolverIncidenciaPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        }>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `resolverIncidencia$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  resolverIncidencia(params: {
    context?: HttpContext
    body: ActualizarEstadoIncidenciaRequest
  }
): Observable<{
}> {

    return this.resolverIncidencia$Response(params).pipe(
      map((r: StrictHttpResponse<{
}>) => r.body as {
})
    );
  }

  /**
   * Path part for operation registrarIncidencia
   */
  static readonly RegistrarIncidenciaPath = '/incidencias/registrar';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registrarIncidencia()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registrarIncidencia$Response(params: {
    context?: HttpContext
    body: RegistrarIncidenciaRequest
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, IncidenciaControllerService.RegistrarIncidenciaPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        }>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `registrarIncidencia$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registrarIncidencia(params: {
    context?: HttpContext
    body: RegistrarIncidenciaRequest
  }
): Observable<{
}> {

    return this.registrarIncidencia$Response(params).pipe(
      map((r: StrictHttpResponse<{
}>) => r.body as {
})
    );
  }

  /**
   * Path part for operation iniciarAtencion
   */
  static readonly IniciarAtencionPath = '/incidencias/iniciar-atencion';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `iniciarAtencion()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  iniciarAtencion$Response(params: {
    context?: HttpContext
    body: ActualizarEstadoIncidenciaRequest
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, IncidenciaControllerService.IniciarAtencionPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        }>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `iniciarAtencion$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  iniciarAtencion(params: {
    context?: HttpContext
    body: ActualizarEstadoIncidenciaRequest
  }
): Observable<{
}> {

    return this.iniciarAtencion$Response(params).pipe(
      map((r: StrictHttpResponse<{
}>) => r.body as {
})
    );
  }

  /**
   * Path part for operation registrarEvidencia
   */
  static readonly RegistrarEvidenciaPath = '/incidencias/evidencias';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registrarEvidencia()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registrarEvidencia$Response(params: {
    context?: HttpContext
    body: RegistrarEvidenciaRequest
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, IncidenciaControllerService.RegistrarEvidenciaPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        }>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `registrarEvidencia$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registrarEvidencia(params: {
    context?: HttpContext
    body: RegistrarEvidenciaRequest
  }
): Observable<{
}> {

    return this.registrarEvidencia$Response(params).pipe(
      map((r: StrictHttpResponse<{
}>) => r.body as {
})
    );
  }

  /**
   * Path part for operation registrarComentario
   */
  static readonly RegistrarComentarioPath = '/incidencias/comentarios';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registrarComentario()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registrarComentario$Response(params: {
    context?: HttpContext
    body: RegistrarComentarioRequest
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, IncidenciaControllerService.RegistrarComentarioPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        }>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `registrarComentario$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registrarComentario(params: {
    context?: HttpContext
    body: RegistrarComentarioRequest
  }
): Observable<{
}> {

    return this.registrarComentario$Response(params).pipe(
      map((r: StrictHttpResponse<{
}>) => r.body as {
})
    );
  }

  /**
   * Path part for operation clasificarIncidencia
   */
  static readonly ClasificarIncidenciaPath = '/incidencias/clasificar';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `clasificarIncidencia()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  clasificarIncidencia$Response(params: {
    context?: HttpContext
    body: ClasificarIncidenciaRequest
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, IncidenciaControllerService.ClasificarIncidenciaPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        }>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `clasificarIncidencia$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  clasificarIncidencia(params: {
    context?: HttpContext
    body: ClasificarIncidenciaRequest
  }
): Observable<{
}> {

    return this.clasificarIncidencia$Response(params).pipe(
      map((r: StrictHttpResponse<{
}>) => r.body as {
})
    );
  }

  /**
   * Path part for operation cerrarIncidencia
   */
  static readonly CerrarIncidenciaPath = '/incidencias/cerrar';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `cerrarIncidencia()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  cerrarIncidencia$Response(params: {
    context?: HttpContext
    body: ActualizarEstadoIncidenciaRequest
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, IncidenciaControllerService.CerrarIncidenciaPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        }>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `cerrarIncidencia$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  cerrarIncidencia(params: {
    context?: HttpContext
    body: ActualizarEstadoIncidenciaRequest
  }
): Observable<{
}> {

    return this.cerrarIncidencia$Response(params).pipe(
      map((r: StrictHttpResponse<{
}>) => r.body as {
})
    );
  }

  /**
   * Path part for operation asignarResponsable
   */
  static readonly AsignarResponsablePath = '/incidencias/asignar-responsable';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `asignarResponsable()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  asignarResponsable$Response(params: {
    context?: HttpContext
    body: AsignarResponsableRequest
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, IncidenciaControllerService.AsignarResponsablePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        }>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `asignarResponsable$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  asignarResponsable(params: {
    context?: HttpContext
    body: AsignarResponsableRequest
  }
): Observable<{
}> {

    return this.asignarResponsable$Response(params).pipe(
      map((r: StrictHttpResponse<{
}>) => r.body as {
})
    );
  }

  /**
   * Path part for operation registrarAccionCorrectiva
   */
  static readonly RegistrarAccionCorrectivaPath = '/incidencias/acciones-correctivas';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registrarAccionCorrectiva()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registrarAccionCorrectiva$Response(params: {
    context?: HttpContext
    body: RegistrarAccionCorrectivaRequest
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, IncidenciaControllerService.RegistrarAccionCorrectivaPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        }>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `registrarAccionCorrectiva$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registrarAccionCorrectiva(params: {
    context?: HttpContext
    body: RegistrarAccionCorrectivaRequest
  }
): Observable<{
}> {

    return this.registrarAccionCorrectiva$Response(params).pipe(
      map((r: StrictHttpResponse<{
}>) => r.body as {
})
    );
  }

  /**
   * Path part for operation obtenerIncidencia
   */
  static readonly ObtenerIncidenciaPath = '/incidencias/{idIncidencia}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `obtenerIncidencia()` instead.
   *
   * This method doesn't expect any request body.
   */
  obtenerIncidencia$Response(params: {
    idIncidencia: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, IncidenciaControllerService.ObtenerIncidenciaPath, 'get');
    if (params) {
      rb.path('idIncidencia', params.idIncidencia, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        }>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `obtenerIncidencia$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  obtenerIncidencia(params: {
    idIncidencia: number;
    context?: HttpContext
  }
): Observable<{
}> {

    return this.obtenerIncidencia$Response(params).pipe(
      map((r: StrictHttpResponse<{
}>) => r.body as {
})
    );
  }

  /**
   * Path part for operation listarHistorial
   */
  static readonly ListarHistorialPath = '/incidencias/{idIncidencia}/historial';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listarHistorial()` instead.
   *
   * This method doesn't expect any request body.
   */
  listarHistorial$Response(params: {
    idIncidencia: number;
    page?: number;
    size?: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<CustomPageIncidenciaHistorialResponse>> {

    const rb = new RequestBuilder(this.rootUrl, IncidenciaControllerService.ListarHistorialPath, 'get');
    if (params) {
      rb.path('idIncidencia', params.idIncidencia, {});
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CustomPageIncidenciaHistorialResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `listarHistorial$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listarHistorial(params: {
    idIncidencia: number;
    page?: number;
    size?: number;
    context?: HttpContext
  }
): Observable<CustomPageIncidenciaHistorialResponse> {

    return this.listarHistorial$Response(params).pipe(
      map((r: StrictHttpResponse<CustomPageIncidenciaHistorialResponse>) => r.body as CustomPageIncidenciaHistorialResponse)
    );
  }

  /**
   * Path part for operation listarEvidencias
   */
  static readonly ListarEvidenciasPath = '/incidencias/{idIncidencia}/evidencias';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listarEvidencias()` instead.
   *
   * This method doesn't expect any request body.
   */
  listarEvidencias$Response(params: {
    idIncidencia: number;
    page?: number;
    size?: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<CustomPageIncidenciaEvidenciaResponse>> {

    const rb = new RequestBuilder(this.rootUrl, IncidenciaControllerService.ListarEvidenciasPath, 'get');
    if (params) {
      rb.path('idIncidencia', params.idIncidencia, {});
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CustomPageIncidenciaEvidenciaResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `listarEvidencias$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listarEvidencias(params: {
    idIncidencia: number;
    page?: number;
    size?: number;
    context?: HttpContext
  }
): Observable<CustomPageIncidenciaEvidenciaResponse> {

    return this.listarEvidencias$Response(params).pipe(
      map((r: StrictHttpResponse<CustomPageIncidenciaEvidenciaResponse>) => r.body as CustomPageIncidenciaEvidenciaResponse)
    );
  }

  /**
   * Path part for operation listarComentarios
   */
  static readonly ListarComentariosPath = '/incidencias/{idIncidencia}/comentarios';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listarComentarios()` instead.
   *
   * This method doesn't expect any request body.
   */
  listarComentarios$Response(params: {
    idIncidencia: number;
    page?: number;
    size?: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<CustomPageIncidenciaComentarioResponse>> {

    const rb = new RequestBuilder(this.rootUrl, IncidenciaControllerService.ListarComentariosPath, 'get');
    if (params) {
      rb.path('idIncidencia', params.idIncidencia, {});
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CustomPageIncidenciaComentarioResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `listarComentarios$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listarComentarios(params: {
    idIncidencia: number;
    page?: number;
    size?: number;
    context?: HttpContext
  }
): Observable<CustomPageIncidenciaComentarioResponse> {

    return this.listarComentarios$Response(params).pipe(
      map((r: StrictHttpResponse<CustomPageIncidenciaComentarioResponse>) => r.body as CustomPageIncidenciaComentarioResponse)
    );
  }

  /**
   * Path part for operation listarAccionesCorrectivas
   */
  static readonly ListarAccionesCorrectivasPath = '/incidencias/{idIncidencia}/acciones-correctivas';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listarAccionesCorrectivas()` instead.
   *
   * This method doesn't expect any request body.
   */
  listarAccionesCorrectivas$Response(params: {
    idIncidencia: number;
    page?: number;
    size?: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<CustomPageIncidenciaAccionCorrectivaResponse>> {

    const rb = new RequestBuilder(this.rootUrl, IncidenciaControllerService.ListarAccionesCorrectivasPath, 'get');
    if (params) {
      rb.path('idIncidencia', params.idIncidencia, {});
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CustomPageIncidenciaAccionCorrectivaResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `listarAccionesCorrectivas$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listarAccionesCorrectivas(params: {
    idIncidencia: number;
    page?: number;
    size?: number;
    context?: HttpContext
  }
): Observable<CustomPageIncidenciaAccionCorrectivaResponse> {

    return this.listarAccionesCorrectivas$Response(params).pipe(
      map((r: StrictHttpResponse<CustomPageIncidenciaAccionCorrectivaResponse>) => r.body as CustomPageIncidenciaAccionCorrectivaResponse)
    );
  }

  /**
   * Path part for operation listarIncidenciasVencidas
   */
  static readonly ListarIncidenciasVencidasPath = '/incidencias/vencidas';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listarIncidenciasVencidas()` instead.
   *
   * This method doesn't expect any request body.
   */
  listarIncidenciasVencidas$Response(params?: {
    page?: number;
    size?: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<CustomPageIncidenciaResponse>> {

    const rb = new RequestBuilder(this.rootUrl, IncidenciaControllerService.ListarIncidenciasVencidasPath, 'get');
    if (params) {
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CustomPageIncidenciaResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `listarIncidenciasVencidas$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listarIncidenciasVencidas(params?: {
    page?: number;
    size?: number;
    context?: HttpContext
  }
): Observable<CustomPageIncidenciaResponse> {

    return this.listarIncidenciasVencidas$Response(params).pipe(
      map((r: StrictHttpResponse<CustomPageIncidenciaResponse>) => r.body as CustomPageIncidenciaResponse)
    );
  }

  /**
   * Path part for operation listarIncidencias
   */
  static readonly ListarIncidenciasPath = '/incidencias/listar';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listarIncidencias()` instead.
   *
   * This method doesn't expect any request body.
   */
  listarIncidencias$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<IncidenciaResponse>>> {

    const rb = new RequestBuilder(this.rootUrl, IncidenciaControllerService.ListarIncidenciasPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<IncidenciaResponse>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `listarIncidencias$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listarIncidencias(params?: {
    context?: HttpContext
  }
): Observable<Array<IncidenciaResponse>> {

    return this.listarIncidencias$Response(params).pipe(
      map((r: StrictHttpResponse<Array<IncidenciaResponse>>) => r.body as Array<IncidenciaResponse>)
    );
  }

  /**
   * Path part for operation obtenerIndicadores
   */
  static readonly ObtenerIndicadoresPath = '/incidencias/indicadores';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `obtenerIndicadores()` instead.
   *
   * This method doesn't expect any request body.
   */
  obtenerIndicadores$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<IndicadoresIncidenciaResponse>> {

    const rb = new RequestBuilder(this.rootUrl, IncidenciaControllerService.ObtenerIndicadoresPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<IndicadoresIncidenciaResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `obtenerIndicadores$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  obtenerIndicadores(params?: {
    context?: HttpContext
  }
): Observable<IndicadoresIncidenciaResponse> {

    return this.obtenerIndicadores$Response(params).pipe(
      map((r: StrictHttpResponse<IndicadoresIncidenciaResponse>) => r.body as IndicadoresIncidenciaResponse)
    );
  }

  /**
   * Path part for operation buscarIncidenciasPorTitulo
   */
  static readonly BuscarIncidenciasPorTituloPath = '/incidencias/buscar';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `buscarIncidenciasPorTitulo()` instead.
   *
   * This method doesn't expect any request body.
   */
  buscarIncidenciasPorTitulo$Response(params: {
    texto: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<IncidenciaBusquedaResponse>>> {

    const rb = new RequestBuilder(this.rootUrl, IncidenciaControllerService.BuscarIncidenciasPorTituloPath, 'get');
    if (params) {
      rb.query('texto', params.texto, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<IncidenciaBusquedaResponse>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `buscarIncidenciasPorTitulo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  buscarIncidenciasPorTitulo(params: {
    texto: string;
    context?: HttpContext
  }
): Observable<Array<IncidenciaBusquedaResponse>> {

    return this.buscarIncidenciasPorTitulo$Response(params).pipe(
      map((r: StrictHttpResponse<Array<IncidenciaBusquedaResponse>>) => r.body as Array<IncidenciaBusquedaResponse>)
    );
  }

  /**
   * Path part for operation buscarIncidenciasPorFechas
   */
  static readonly BuscarIncidenciasPorFechasPath = '/incidencias/buscar-por-fechas';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `buscarIncidenciasPorFechas()` instead.
   *
   * This method doesn't expect any request body.
   */
  buscarIncidenciasPorFechas$Response(params: {
    inicio: string;
    fin: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<IncidenciaBusquedaResponse>>> {

    const rb = new RequestBuilder(this.rootUrl, IncidenciaControllerService.BuscarIncidenciasPorFechasPath, 'get');
    if (params) {
      rb.query('inicio', params.inicio, {});
      rb.query('fin', params.fin, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<IncidenciaBusquedaResponse>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `buscarIncidenciasPorFechas$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  buscarIncidenciasPorFechas(params: {
    inicio: string;
    fin: string;
    context?: HttpContext
  }
): Observable<Array<IncidenciaBusquedaResponse>> {

    return this.buscarIncidenciasPorFechas$Response(params).pipe(
      map((r: StrictHttpResponse<Array<IncidenciaBusquedaResponse>>) => r.body as Array<IncidenciaBusquedaResponse>)
    );
  }

  /**
   * Path part for operation eliminarIncidencia
   */
  static readonly EliminarIncidenciaPath = '/incidencias/eliminar/{idIncidencia}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `eliminarIncidencia()` instead.
   *
   * This method doesn't expect any request body.
   */
  eliminarIncidencia$Response(params: {
    idIncidencia: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, IncidenciaControllerService.EliminarIncidenciaPath, 'delete');
    if (params) {
      rb.path('idIncidencia', params.idIncidencia, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        }>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `eliminarIncidencia$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  eliminarIncidencia(params: {
    idIncidencia: number;
    context?: HttpContext
  }
): Observable<{
}> {

    return this.eliminarIncidencia$Response(params).pipe(
      map((r: StrictHttpResponse<{
}>) => r.body as {
})
    );
  }

}
