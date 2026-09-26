import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, finalize, map, shareReplay, tap } from 'rxjs/operators';
import { environment } from '../../environments/enviroment';

/** Señales del navegador con las que la API calcula la huella de la visita. */
export interface TrackSignals {
  userAgent: string;
  language: string;
  timezone: string;
  screen: string;
  plugins: string[];
}

interface TrackResponse {
  counted: boolean;
  visits: number;
  token?: string;
}

export const TRACK_PATH = '/visits/track';

/**
 * Sesión de visita contra Portfolio-api.
 *
 * `POST /visits/track` registra la visita, deja la cookie HttpOnly `visit_jwt` y devuelve el mismo
 * token en el cuerpo. La cookie basta en `cv.victor-service.dev` (mismo sitio que la API); el token
 * del cuerpo se guarda solo en memoria y se envía como `Authorization: Bearer` para que también
 * funcione desde los espejos (GitHub Pages, Netlify), donde la cookie `SameSite=Lax` no viaja.
 * Se renueva antes de que caduque y las peticiones simultáneas comparten un único `track`.
 */
@Injectable({
  providedIn: 'root'
})
export class VisitSessionService {
  /** Total de visitas devuelto por la API; `null` mientras no se conozca o si la API falla. */
  readonly visits = signal<number | null>(null);

  /** Token de visita en memoria (nunca en localStorage); `null` si la API no lo ha enviado. */
  token: string | null = null;

  private issuedAt = 0;
  private inFlight$?: Observable<void>;

  constructor(private http: HttpClient) {}

  /** Garantiza un token vigente: solo llama a la API si no hay sesión o está a punto de caducar. */
  ensureSession(): Observable<void> {
    const fresh = this.issuedAt > 0 && Date.now() - this.issuedAt < environment.tokenTtlMs;
    return fresh ? of(undefined) : this.renew();
  }

  /** Pide un token nuevo aunque el actual parezca vigente (p. ej. tras un 401). */
  renew(): Observable<void> {
    if (!this.inFlight$) {
      this.inFlight$ = this.http
        .post<TrackResponse>(`${environment.apiUrl}${TRACK_PATH}`, this.signals(), { withCredentials: true })
        .pipe(
          tap(res => {
            this.issuedAt = Date.now();
            this.token = res.token ?? null;
            this.visits.set(res.visits);
          }),
          map(() => undefined),
          catchError(error => {
            console.error('No se pudo obtener el token de visita:', error);
            return of(undefined);
          }),
          finalize(() => (this.inFlight$ = undefined)),
          shareReplay(1)
        );
    }
    return this.inFlight$;
  }

  /** Señales estables del navegador: mismos valores en cada llamada para que la huella no cambie. */
  signals(): TrackSignals {
    const plugins = Array.from(navigator.plugins ?? [], plugin => plugin.name).slice(0, 50);
    return {
      userAgent: navigator.userAgent.slice(0, 512),
      language: (navigator.language ?? '').slice(0, 32),
      timezone: (Intl.DateTimeFormat().resolvedOptions().timeZone ?? '').slice(0, 64),
      screen: `${screen.width}x${screen.height}`,
      plugins
    };
  }
}
