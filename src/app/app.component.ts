import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  githubUser = 'Aragorn7372';
  fullName = 'Víctor Marín Escribano';
  year = new Date().getFullYear();

  // Banner image (pon aquí tu ruta o URL)
  bannerUrl = 'assets/banner.jpg';

  // Preloader & UI state
  isLoading = true;
  dark = true;

  // Scroll-to-top button
  showScrollTop = false;

  constructor() {}

  ngOnInit(): void {
    const stored = localStorage.getItem('vm_theme');
    this.dark = stored ? stored === 'dark' : true;
    this.applyTheme();

    // Cargar la imagen del banner antes de quitar el preloader
    const img = new Image();
    img.src = this.bannerUrl;
    img.onload = () => {
      // pequeña espera para suavizar la transición
      setTimeout(() => (this.isLoading = false), 350);
    };
    img.onerror = () => {
      // Si falla la carga, igual quitamos el preloader tras un timeout
      setTimeout(() => (this.isLoading = false), 600);
    };
  }

  printPDF() {
    window.print();
  }

  toggleTheme() {
    this.dark = !this.dark;
    localStorage.setItem('vm_theme', this.dark ? 'dark' : 'light');
    this.applyTheme();
  }

  private applyTheme() {
    const root = document.documentElement;
    if (this.dark) root.classList.remove('light-theme');
    else root.classList.add('light-theme');
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.showScrollTop = window.scrollY > 220;
  }

  scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
