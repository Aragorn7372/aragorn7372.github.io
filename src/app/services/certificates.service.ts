import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, shareReplay } from 'rxjs/operators';

export interface Certificate {
  titulo: string;
  url: string;
  fecha: string;
}

@Injectable({
  providedIn: 'root'
})
export class CertificatesService {
  private apiUrl = 'https://script.google.com/macros/s/AKfycbyFOLWuRO-DALwI0-chwcHYnqBioRTGDErFUhhUEV5XvpZ8oTuvoM9GV1Bn4bHqs7Qj/exec';
  private certificatesCache$?: Observable<Certificate[]>;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todos los certificados desde Google Apps Script
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
      .replace(/\b\w/g, char => char.toUpperCase()); // Capitalizar cada palabra
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
