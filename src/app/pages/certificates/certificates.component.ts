import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CertificatesService, Certificate } from '../../services/certificates.service';

@Component({
  selector: 'app-certificates',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.css']
})
export class CertificatesComponent implements OnInit {
  certificates: Certificate[] = [];
  filteredCertificates: Certificate[] = [];
  loading = true;
  searchTerm = '';
  sortBy: 'titulo' | 'fecha' = 'fecha';
  sortDirection: 'asc' | 'desc' = 'desc';

  constructor(public certificatesService: CertificatesService) {}

  ngOnInit(): void {
    this.loadCertificates();
  }

  loadCertificates(): void {
    this.certificatesService.getCertificates().subscribe({
      next: (data) => {
        this.certificates = data;
        this.filteredCertificates = data;
        this.loading = false;
        console.log(`✅ ${data.length} certificados cargados`);
      },
      error: (error) => {
        console.error('Error cargando certificados:', error);
        this.loading = false;
      }
    });
  }

  /**
   * Filtra certificados por término de búsqueda
   */
  filterCertificates(): void {
    const term = this.searchTerm.toLowerCase().trim();

    if (!term) {
      this.filteredCertificates = this.certificates;
    } else {
      this.filteredCertificates = this.certificates.filter(cert =>
        this.certificatesService.formatTitle(cert.titulo).toLowerCase().includes(term)
      );
    }

    this.sortCertificates();
  }

  /**
   * Ordena certificados
   */
  sortCertificates(): void {
    this.filteredCertificates.sort((a, b) => {
      let comparison = 0;

      if (this.sortBy === 'titulo') {
        const titleA = this.certificatesService.formatTitle(a.titulo);
        const titleB = this.certificatesService.formatTitle(b.titulo);
        comparison = titleA.localeCompare(titleB);
      } else {
        const dateA = new Date(a.fecha).getTime();
        const dateB = new Date(b.fecha).getTime();
        comparison = dateA - dateB;
      }

      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
  }

  /**
   * Cambia el criterio de ordenamiento
   */
  changeSortBy(field: 'titulo' | 'fecha'): void {
    if (this.sortBy === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = field;
      this.sortDirection = 'desc';
    }
    this.sortCertificates();
  }

  /**
   * Abre el certificado en Google Drive
   */
  openCertificate(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  /**
   * Descarga el certificado directamente
   */
  downloadCertificate(certificate: Certificate): void {
    const downloadUrl = this.certificatesService.getDirectDownloadLink(certificate.url);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `${certificate.titulo}.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  /**
   * Formatea la fecha para mostrar
   */
  formatDate(fecha: string): string {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
