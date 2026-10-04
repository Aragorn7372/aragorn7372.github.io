import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';
import { environment } from '../../environments/enviroment';

/** Experiencia tal como la devuelve Portfolio-api en el listado (`ExperienceResponseDto`). */
export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  companyLogo: string | null;
}

export interface ExperienceImage {
  filename: string;
  url: string;
}

/** Detalle de una experiencia (`ExperienceDetailsResponseDto`). */
export interface ExperienceDetails {
  id: string;
  title: string;
  company: string;
  location: string;
  markdown: string;
  images: ExperienceImage[];
}

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  private apiUrl = `${environment.apiUrl}/experiences`;
  private experiencesCache$?: Observable<Experience[]>;

  constructor(private http: HttpClient) {}

  /** Experiencias del portafolio (con caché mientras dure la sesión de la página). */
  getExperiences(): Observable<Experience[]> {
    if (!this.experiencesCache$) {
      this.experiencesCache$ = this.http.get<Experience[]>(this.apiUrl).pipe(
        shareReplay(1),
        catchError(error => {
          console.error('Error obteniendo experiencias:', error);
          this.experiencesCache$ = undefined;
          return of([]);
        })
      );
    }
    return this.experiencesCache$;
  }

  /** Detalle de una experiencia; los errores (404, red...) se propagan al componente. */
  getExperience(id: string): Observable<ExperienceDetails> {
    return this.http.get<ExperienceDetails>(`${this.apiUrl}/${encodeURIComponent(id)}`);
  }
}
