import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, shareReplay } from 'rxjs/operators';
import { environment } from '../../environments/enviroment';

export interface Certificate {
  titulo: string;
  url: string;
  fecha: string;
}

@Injectable({
  providedIn: 'root'
})
export class CertificatesService {
  private apiUrl = `${environment.apiUrl}/certificates`;
  private certificatesCache$?: Observable<Certificate[]>;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todos los certificados desde Portfolio-api
   */
  getCertificates(): Observable<Certificate[]> {
    if (this.certificatesCache$) {
      console.log('📦 Usando certificados desde caché');
      return this.certificatesCache$;
    }

    console.log('🔍 Obteniendo certificados desde API...');

    this.certificatesCache$ = this.http.get<Certificate[]>(this.apiUrl).pipe(
      map(certificates => {
        // Ordenar por fecha descendente (más recientes primero)
        return certificates.sort((a, b) =>
          new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
        );
      }),
      shareReplay(1),
      catchError(error => {
        console.error('Error obteniendo certificados:', error);
        this.certificatesCache$ = undefined;
        return of([]);
      })
    );

    return this.certificatesCache$;
  }

  /**
   * Formatea el título para mostrarlo más legible
   */
  formatTitle(titulo: string): string {
    // Eliminar "certificado_" y reemplazar guiones bajos por espacios
    return titulo
      .replace(/^certificado_/i, '')
      .replace(/_/g, ' ')
      // Mayúscula al inicio de cada palabra. \p{L} (con la bandera u) reconoce cualquier letra;
      // con \b\w las letras con tilde o la ñ contaban como separador y salía "DiseñO".
      .replace(/(^|\s)(\p{L})/gu, (_, space: string, letter: string) => space + letter.toUpperCase());
  }

  /**
   * Obtiene el enlace directo de descarga desde Google Drive
   */
  getDirectDownloadLink(driveUrl: string): string {
    // Extraer el ID del archivo de la URL de Google Drive
    const match = driveUrl.match(/\/d\/(.+?)\//);
    if (match && match[1]) {
      return `https://drive.google.com/uc?export=download&id=${match[1]}`;
    }
    return driveUrl;
  }

  /**
   * Limpia la caché
   */
  clearCache(): void {
    this.certificatesCache$ = undefined;
    console.log('🗑️ Caché de certificados limpiada');
  }
}
