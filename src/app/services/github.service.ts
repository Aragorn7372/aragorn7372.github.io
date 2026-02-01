import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, switchMap, catchError, delay, shareReplay } from 'rxjs/operators';

export interface GitHubRepo {
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  homepage: string;
  topics: string[];
  language: string;
  stargazers_count: number;
  forks_count: number;
  has_pages: boolean;
  created_at: string;
  updated_at: string;
  default_branch: string;
}

export interface GitHubPagesProject {
  name: string;
  description: string;
  repoUrl: string;
  pagesUrl: string;
  language: string;
  topics: string[];
  stars: number;
  forks: number;
}

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private apiUrl = 'https://api.github.com';
  private projectsCache$?: Observable<GitHubPagesProject[]>;
  private reposCache$?: Observable<GitHubRepo[]>;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todos los repositorios de un usuario (CON CACHÉ)
   */
  getUserRepos(username: string): Observable<GitHubRepo[]> {
    // Si ya tenemos la petición en caché, reutilizarla
    if (!this.reposCache$) {
      const headers = new HttpHeaders({
        'Accept': 'application/vnd.github.v3+json'
      });

      this.reposCache$ = this.http.get<GitHubRepo[]>(
        `${this.apiUrl}/users/${username}/repos?per_page=100&sort=updated`,
        { headers }
      ).pipe(
        shareReplay(1), // Compartir el resultado entre múltiples suscriptores
        catchError(error => {
          console.error('Error fetching repos:', error);
          // Si hay error, limpiar caché para reintentar después
          this.reposCache$ = undefined;
          return of([]);
        })
      );
    }

    return this.reposCache$;
  }

  /**
   * Verifica si existe un archivo index.html o README en la rama gh-pages o docs
   */
  checkForPagesFiles(owner: string, repo: string, branch: string = 'gh-pages'): Observable<boolean> {
    return this.http.get(
      `${this.apiUrl}/repos/${owner}/${repo}/contents?ref=${branch}`,
      { observe: 'response' }
    ).pipe(
      map(response => response.status === 200),
      catchError(() => of(false))
    );
  }

  /**
   * Verifica múltiples indicadores de GitHub Pages
   */
  private checkIfHasPages(owner: string, repo: GitHubRepo): Observable<boolean> {
    // Si el nombre contiene .github.io, asumir que tiene pages
    if (repo.name.includes('.github.io')) {
      return of(true);
    }

    // Si homepage apunta a github.io
    if (repo.homepage && repo.homepage.includes('.github.io')) {
      return of(true);
    }

    // Si GitHub marca has_pages como true
    if (repo.has_pages === true) {
      return of(true);
    }

    // Si no, retornar false para evitar más peticiones
    return of(false);
  }

  /**
   * Obtiene todos los proyectos con GitHub Pages activo (CON CACHÉ)
   */
  getGitHubPagesProjects(username: string): Observable<GitHubPagesProject[]> {
    // Si ya tenemos proyectos en caché, devolverlos
    if (this.projectsCache$) {
      console.log('Usando proyectos desde caché');
      return this.projectsCache$;
    }

    console.log('Buscando proyectos con GitHub Pages...');

    this.projectsCache$ = this.getUserRepos(username).pipe(
      switchMap(repos => {
        if (repos.length === 0) {
          return of([]);
        }

        console.log(`Verificando ${repos.length} repositorios...`);

        // Verificar cada repo (con delay para evitar rate limit)
        const checks = repos.map((repo, index) =>
          of(repo).pipe(
            delay(index * 50), // Delay más corto
            switchMap(r =>
              this.checkIfHasPages(username, r).pipe(
                map(hasPages => ({
                  repo: r,
                  hasPages
                }))
              )
            ),
            catchError(err => {
              console.warn(`Error checking ${repo.name}:`, err);
              return of({ repo, hasPages: false });
            })
          )
        );

        return forkJoin(checks).pipe(
          map(results => {
            const projectsWithPages = results
              .filter(r => r.hasPages)
              .map(r => this.mapToGitHubPagesProject(username, r.repo));

            console.log(`Encontrados ${projectsWithPages.length} proyectos con GitHub Pages:`,
              projectsWithPages.map(p => p.name));
            return projectsWithPages;
          })
        );
      }),
      shareReplay(1), // Cachear el resultado
      catchError(error => {
        console.error('Error getting GitHub Pages projects:', error);
        // Limpiar caché en caso de error
        this.projectsCache$ = undefined;
        return of([]);
      })
    );

    return this.projectsCache$;
  }

  /**
   * Limpia la caché (útil para refrescar datos)
   */
  clearCache(): void {
    this.projectsCache$ = undefined;
    this.reposCache$ = undefined;
    console.log('Caché limpiada');
  }

  /**
   * Mapea un repo a GitHubPagesProject
   */
  private mapToGitHubPagesProject(username: string, repo: GitHubRepo): GitHubPagesProject {
    let pagesUrl: string;

    // 1. Si el repo tiene homepage configurado con github.io, usarlo
    if (repo.homepage && repo.homepage.includes('.github.io')) {
      pagesUrl = repo.homepage;
    }
    // 2. Si el repo es username.github.io
    else if (repo.name === `${username}.github.io`) {
      pagesUrl = `https://${username}.github.io`;
    }
    // 3. Para otros repos con Pages
    else {
      pagesUrl = `https://${username}.github.io/${repo.name}`;
    }

    // Asegurar que la URL tenga protocolo
    if (pagesUrl && !pagesUrl.startsWith('http')) {
      pagesUrl = 'https://' + pagesUrl;
    }

    return {
      name: repo.name,
      description: repo.description || 'Sin descripción',
      repoUrl: repo.html_url,
      pagesUrl: pagesUrl,
      language: repo.language || 'N/A',
      topics: repo.topics || [],
      stars: repo.stargazers_count,
      forks: repo.forks_count
    };
  }
}
