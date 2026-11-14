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

import { ActualizarUsuarioRequest } from '../models/actualizar-usuario-request';
import { CustomPageUsuarioListadoResponse } from '../models/custom-page-usuario-listado-response';
import { RegistrarUsuarioRequest } from '../models/registrar-usuario-request';

@Injectable({
  providedIn: 'root',
})
export class UsuarioControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation actualizarUsuario
   */
  static readonly ActualizarUsuarioPath = '/usuario/actualizar';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `actualizarUsuario()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  actualizarUsuario$Response(params: {
    context?: HttpContext
    body: ActualizarUsuarioRequest
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, UsuarioControllerService.ActualizarUsuarioPath, 'put');
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
   * To access the full response (for headers, for example), `actualizarUsuario$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  actualizarUsuario(params: {
    context?: HttpContext
    body: ActualizarUsuarioRequest
  }
): Observable<{
}> {

    return this.actualizarUsuario$Response(params).pipe(
      map((r: StrictHttpResponse<{
}>) => r.body as {
})
    );
  }

  /**
   * Path part for operation activarUsuario
   */
  static readonly ActivarUsuarioPath = '/usuario/activar/{idUsuario}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `activarUsuario()` instead.
   *
   * This method doesn't expect any request body.
   */
  activarUsuario$Response(params: {
    idUsuario: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, UsuarioControllerService.ActivarUsuarioPath, 'put');
    if (params) {
      rb.path('idUsuario', params.idUsuario, {});
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
   * To access the full response (for headers, for example), `activarUsuario$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  activarUsuario(params: {
    idUsuario: number;
    context?: HttpContext
  }
): Observable<{
}> {

    return this.activarUsuario$Response(params).pipe(
      map((r: StrictHttpResponse<{
}>) => r.body as {
})
    );
  }

  /**
   * Path part for operation registrarUsuario
   */
  static readonly RegistrarUsuarioPath = '/usuario/registrar';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registrarUsuario()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registrarUsuario$Response(params: {
    context?: HttpContext
    body: RegistrarUsuarioRequest
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, UsuarioControllerService.RegistrarUsuarioPath, 'post');
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
   * To access the full response (for headers, for example), `registrarUsuario$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registrarUsuario(params: {
    context?: HttpContext
    body: RegistrarUsuarioRequest
  }
): Observable<{
}> {

    return this.registrarUsuario$Response(params).pipe(
      map((r: StrictHttpResponse<{
}>) => r.body as {
})
    );
  }

  /**
   * Path part for operation obtenerUsuario
   */
  static readonly ObtenerUsuarioPath = '/usuario/{idUsuario}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `obtenerUsuario()` instead.
   *
   * This method doesn't expect any request body.
   */
  obtenerUsuario$Response(params: {
    idUsuario: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, UsuarioControllerService.ObtenerUsuarioPath, 'get');
    if (params) {
      rb.path('idUsuario', params.idUsuario, {});
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
   * To access the full response (for headers, for example), `obtenerUsuario$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  obtenerUsuario(params: {
    idUsuario: number;
    context?: HttpContext
  }
): Observable<{
}> {

    return this.obtenerUsuario$Response(params).pipe(
      map((r: StrictHttpResponse<{
}>) => r.body as {
})
    );
  }

  /**
   * Path part for operation listarUsuario
   */
  static readonly ListarUsuarioPath = '/usuario/listar';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listarUsuario()` instead.
   *
   * This method doesn't expect any request body.
   */
  listarUsuario$Response(params?: {
    usuario?: string;
    nombres?: string;
    apellidos?: string;
    correo?: string;
    estado?: number;
    page?: number;
    size?: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<CustomPageUsuarioListadoResponse>> {

    const rb = new RequestBuilder(this.rootUrl, UsuarioControllerService.ListarUsuarioPath, 'get');
    if (params) {
      rb.query('usuario', params.usuario, {});
      rb.query('nombres', params.nombres, {});
      rb.query('apellidos', params.apellidos, {});
      rb.query('correo', params.correo, {});
      rb.query('estado', params.estado, {});
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
        return r as StrictHttpResponse<CustomPageUsuarioListadoResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `listarUsuario$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listarUsuario(params?: {
    usuario?: string;
    nombres?: string;
    apellidos?: string;
    correo?: string;
    estado?: number;
    page?: number;
    size?: number;
    context?: HttpContext
  }
): Observable<CustomPageUsuarioListadoResponse> {

    return this.listarUsuario$Response(params).pipe(
      map((r: StrictHttpResponse<CustomPageUsuarioListadoResponse>) => r.body as CustomPageUsuarioListadoResponse)
    );
  }

  /**
   * Path part for operation eliminarUsuario
   */
  static readonly EliminarUsuarioPath = '/usuario/eliminar/{idUsuario}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `eliminarUsuario()` instead.
   *
   * This method doesn't expect any request body.
   */
  eliminarUsuario$Response(params: {
    idUsuario: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, UsuarioControllerService.EliminarUsuarioPath, 'delete');
    if (params) {
      rb.path('idUsuario', params.idUsuario, {});
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
   * To access the full response (for headers, for example), `eliminarUsuario$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  eliminarUsuario(params: {
    idUsuario: number;
    context?: HttpContext
  }
): Observable<{
}> {

    return this.eliminarUsuario$Response(params).pipe(
      map((r: StrictHttpResponse<{
}>) => r.body as {
})
    );
  }

}
