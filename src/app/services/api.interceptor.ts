import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/enviroment';
import { TRACK_PATH, VisitSessionService } from './visit-session.service';

/**
 * Añade el token de visita de forma transparente a las peticiones a Portfolio-api.
 *
 * - Envía la cookie `visit_jwt` (`withCredentials`) y, si se tiene, el mismo token en
 *   `Authorization: Bearer` (necesario desde los espejos, donde la cookie no viaja).
 * - Antes de cada petición protegida se asegura de que haya sesión.
 * - Si la API responde `401 visit_token_required` (token caducado o cookie borrada), obtiene uno
 *   nuevo y reintenta una sola vez. El resto de errores (429, 5xx...) se propagan sin reintento.
 */
export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith(environment.apiUrl)) {
    return next(req);
  }

  const withCookie = req.clone({ withCredentials: true });
  if (req.url.endsWith(TRACK_PATH)) {
    return next(withCookie);
  }

  const session = inject(VisitSessionService);
  // El token se lee al enviar (no al interceptar) para usar siempre el más reciente
  const send = () => next(withToken(withCookie, session.token));

  return session.ensureSession().pipe(
    switchMap(send),
    catchError((error: unknown) => {
      if (isTokenRequired(error)) {
        return session.renew().pipe(switchMap(send));
      }
      return throwError(() => error);
    })
  );
};

function withToken(req: HttpRequest<unknown>, token: string | null): HttpRequest<unknown> {
  return token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;
}

function isTokenRequired(error: unknown): boolean {
  return error instanceof HttpErrorResponse
    && error.status === 401
    && (error.error?.error ?? 'visit_token_required') === 'visit_token_required';
}
