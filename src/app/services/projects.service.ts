import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { environment } from '../../environments/enviroment';

/** Proyecto tal como lo devuelve Portfolio-api (`ProjectResponseDto`). */
export interface Project {
  name: string;
  description: string | null;
  url: string;
  pagesUrl: string | null;
  owner: string;
  avatarUrl: string;
  stars: number;
  forks: number;
  commits: number;
  languages: Record<string, number>;
  topics: string[];
  technologies: string[];
}

/** Tamaño en px del avatar pedido a GitHub: en la tarjeta se ve a ~40 px (x1.5 para pantallas HiDPI). */
const AVATAR_SIZE = 64;

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private projectsCache$?: Observable<Project[]>;

  constructor(private http: HttpClient) {}

  /** Proyectos del portafolio (con caché mientras dure la sesión de la página). */
  getProjects(): Observable<Project[]> {
    if (!this.projectsCache$) {
      this.projectsCache$ = this.http.get<Partial<Project>[]>(`${environment.apiUrl}/projects`).pipe(
        map(projects => normalizeProjects(projects ?? [])),
        shareReplay(1),
        catchError(error => {
          console.error('Error obteniendo proyectos:', error);
          this.projectsCache$ = undefined;
          return of([]);
        })
      );
    }
    return this.projectsCache$;
  }
}

/**
 * Rellena los campos que falten y unifica el avatar por propietario: todos los proyectos de un
 * mismo owner comparten exactamente la misma URL, así el navegador descarga cada foto una sola vez.
 */
export function normalizeProjects(projects: Partial<Project>[]): Project[] {
  const avatarByOwner = new Map<string, string>();

  return projects.map(p => {
    const owner = p.owner ?? '';
    if (!avatarByOwner.has(owner)) {
      avatarByOwner.set(owner, sizedAvatar(p.avatarUrl ?? ''));
    }
    const description = p.description?.trim();

    return {
      name: p.name ?? '',
      description: description ? description : null,
      url: p.url ?? '',
      pagesUrl: p.pagesUrl?.trim() ? p.pagesUrl : null,
      owner,
      avatarUrl: avatarByOwner.get(owner)!,
      stars: p.stars ?? 0,
      forks: p.forks ?? 0,
      commits: p.commits ?? 0,
      languages: p.languages ?? {},
      topics: p.topics ?? [],
      technologies: p.technologies ?? []
    };
  });
}

/** Pide a GitHub la versión pequeña del avatar (parámetro `s`). */
function sizedAvatar(url: string): string {
  if (!url) return '';
  try {
    const parsed = new URL(url);
    parsed.searchParams.set('s', String(AVATAR_SIZE));
    return parsed.toString();
  } catch {
    return url;
  }
}
