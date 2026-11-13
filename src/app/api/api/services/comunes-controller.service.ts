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

import { MaestroResponse } from '../models/maestro-response';
import { MantenerMaestroRequest } from '../models/mantener-maestro-request';

@Injectable({
  providedIn: 'root',
})
export class ComunesControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation actualizarMaestro
   */
  static readonly ActualizarMaestroPath = '/comunes/{maestro}/actualizar';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `actualizarMaestro()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  actualizarMaestro$Response(params: {
    maestro: string;
    context?: HttpContext
    body: MantenerMaestroRequest
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, ComunesControllerService.ActualizarMaestroPath, 'put');
    if (params) {
      rb.path('maestro', params.maestro, {});
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
   * To access the full response (for headers, for example), `actualizarMaestro$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  actualizarMaestro(params: {
    maestro: string;
    context?: HttpContext
    body: MantenerMaestroRequest
  }
): Observable<{
}> {

    return this.actualizarMaestro$Response(params).pipe(
      map((r: StrictHttpResponse<{
}>) => r.body as {
})
    );
  }

  /**
   * Path part for operation registrarMaestro
   */
  static readonly RegistrarMaestroPath = '/comunes/{maestro}/registrar';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registrarMaestro()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registrarMaestro$Response(params: {
    maestro: string;
    context?: HttpContext
    body: MantenerMaestroRequest
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, ComunesControllerService.RegistrarMaestroPath, 'post');
    if (params) {
      rb.path('maestro', params.maestro, {});
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
   * To access the full response (for headers, for example), `registrarMaestro$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registrarMaestro(params: {
    maestro: string;
    context?: HttpContext
    body: MantenerMaestroRequest
  }
): Observable<{
}> {

    return this.registrarMaestro$Response(params).pipe(
      map((r: StrictHttpResponse<{
}>) => r.body as {
})
    );
  }

  /**
   * Path part for operation listarUbicaciones
   */
  static readonly ListarUbicacionesPath = '/comunes/ubicaciones';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listarUbicaciones()` instead.
   *
   * This method doesn't expect any request body.
   */
  listarUbicaciones$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<MaestroResponse>>> {

    const rb = new RequestBuilder(this.rootUrl, ComunesControllerService.ListarUbicacionesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<MaestroResponse>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `listarUbicaciones$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listarUbicaciones(params?: {
    context?: HttpContext
  }
): Observable<Array<MaestroResponse>> {

    return this.listarUbicaciones$Response(params).pipe(
      map((r: StrictHttpResponse<Array<MaestroResponse>>) => r.body as Array<MaestroResponse>)
    );
  }

  /**
   * Path part for operation listarSla
   */
  static readonly ListarSlaPath = '/comunes/sla';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listarSla()` instead.
   *
   * This method doesn't expect any request body.
   */
  listarSla$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<MaestroResponse>>> {

    const rb = new RequestBuilder(this.rootUrl, ComunesControllerService.ListarSlaPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<MaestroResponse>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `listarSla$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listarSla(params?: {
    context?: HttpContext
  }
): Observable<Array<MaestroResponse>> {

    return this.listarSla$Response(params).pipe(
      map((r: StrictHttpResponse<Array<MaestroResponse>>) => r.body as Array<MaestroResponse>)
    );
  }

  /**
   * Path part for operation listarSeveridades
   */
  static readonly ListarSeveridadesPath = '/comunes/severidades';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listarSeveridades()` instead.
   *
   * This method doesn't expect any request body.
   */
  listarSeveridades$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<MaestroResponse>>> {

    const rb = new RequestBuilder(this.rootUrl, ComunesControllerService.ListarSeveridadesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<MaestroResponse>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `listarSeveridades$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listarSeveridades(params?: {
    context?: HttpContext
  }
): Observable<Array<MaestroResponse>> {

    return this.listarSeveridades$Response(params).pipe(
      map((r: StrictHttpResponse<Array<MaestroResponse>>) => r.body as Array<MaestroResponse>)
    );
  }

  /**
   * Path part for operation listarRoles
   */
  static readonly ListarRolesPath = '/comunes/roles';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listarRoles()` instead.
   *
   * This method doesn't expect any request body.
   */
  listarRoles$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<MaestroResponse>>> {

    const rb = new RequestBuilder(this.rootUrl, ComunesControllerService.ListarRolesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<MaestroResponse>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `listarRoles$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listarRoles(params?: {
    context?: HttpContext
  }
): Observable<Array<MaestroResponse>> {

    return this.listarRoles$Response(params).pipe(
      map((r: StrictHttpResponse<Array<MaestroResponse>>) => r.body as Array<MaestroResponse>)
    );
  }

  /**
   * Path part for operation listarPrioridades
   */
  static readonly ListarPrioridadesPath = '/comunes/prioridades';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listarPrioridades()` instead.
   *
   * This method doesn't expect any request body.
   */
  listarPrioridades$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<MaestroResponse>>> {

    const rb = new RequestBuilder(this.rootUrl, ComunesControllerService.ListarPrioridadesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<MaestroResponse>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `listarPrioridades$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listarPrioridades(params?: {
    context?: HttpContext
  }
): Observable<Array<MaestroResponse>> {

    return this.listarPrioridades$Response(params).pipe(
      map((r: StrictHttpResponse<Array<MaestroResponse>>) => r.body as Array<MaestroResponse>)
    );
  }

  /**
   * Path part for operation listarEstadosIncidencia
   */
  static readonly ListarEstadosIncidenciaPath = '/comunes/estados-incidencia';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listarEstadosIncidencia()` instead.
   *
   * This method doesn't expect any request body.
   */
  listarEstadosIncidencia$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<MaestroResponse>>> {

    const rb = new RequestBuilder(this.rootUrl, ComunesControllerService.ListarEstadosIncidenciaPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<MaestroResponse>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `listarEstadosIncidencia$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listarEstadosIncidencia(params?: {
    context?: HttpContext
  }
): Observable<Array<MaestroResponse>> {

    return this.listarEstadosIncidencia$Response(params).pipe(
      map((r: StrictHttpResponse<Array<MaestroResponse>>) => r.body as Array<MaestroResponse>)
    );
  }

  /**
   * Path part for operation listarCategorias
   */
  static readonly ListarCategoriasPath = '/comunes/categorias';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listarCategorias()` instead.
   *
   * This method doesn't expect any request body.
   */
  listarCategorias$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<MaestroResponse>>> {

    const rb = new RequestBuilder(this.rootUrl, ComunesControllerService.ListarCategoriasPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<MaestroResponse>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `listarCategorias$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listarCategorias(params?: {
    context?: HttpContext
  }
): Observable<Array<MaestroResponse>> {

    return this.listarCategorias$Response(params).pipe(
      map((r: StrictHttpResponse<Array<MaestroResponse>>) => r.body as Array<MaestroResponse>)
    );
  }

  /**
   * Path part for operation eliminarMaestro
   */
  static readonly EliminarMaestroPath = '/comunes/{maestro}/eliminar/{idMaestro}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `eliminarMaestro()` instead.
   *
   * This method doesn't expect any request body.
   */
  eliminarMaestro$Response(params: {
    maestro: string;
    idMaestro: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, ComunesControllerService.EliminarMaestroPath, 'delete');
    if (params) {
      rb.path('maestro', params.maestro, {});
      rb.path('idMaestro', params.idMaestro, {});
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
   * To access the full response (for headers, for example), `eliminarMaestro$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  eliminarMaestro(params: {
    maestro: string;
    idMaestro: number;
    context?: HttpContext
  }
): Observable<{
}> {

    return this.eliminarMaestro$Response(params).pipe(
      map((r: StrictHttpResponse<{
}>) => r.body as {
})
    );
  }

}
