import { Injectable } from '@angular/core';

const STORAGE_KEY = 'vm_theme';
const DARK_THEME = 'night';
const LIGHT_THEME = 'nord';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  dark = true;
  // Interruptor temporal para comparar el banner original con el de la paleta nueva
  bannerStyle: 'classic' | 'palette' = 'palette';

  private readonly media = window.matchMedia('(prefers-color-scheme: dark)');

  /**
   * Tema inicial: la elección guardada del usuario o, si no hay, la del sistema.
   * Mientras no haya elección guardada, sigue los cambios del sistema en vivo.
   */
  init(): void {
    const stored = localStorage.getItem(STORAGE_KEY);
    this.dark = stored ? stored === 'dark' : this.media.matches;
    this.apply();

    this.media.addEventListener('change', (event) => {
      if (localStorage.getItem(STORAGE_KEY)) return;
      this.dark = event.matches;
      this.apply();
    });
  }

  get bannerSrc(): string {
    const suffix = this.bannerStyle === 'palette' ? '-palette' : '';
    return `banner-${this.dark ? 'dark' : 'light'}${suffix}.svg`;
  }

  toggle(): void {
    this.dark = !this.dark;
    localStorage.setItem(STORAGE_KEY, this.dark ? 'dark' : 'light');
    this.apply();
  }

  private apply(): void {
    const root = document.documentElement;
    root.setAttribute('data-theme', this.dark ? DARK_THEME : LIGHT_THEME);
    root.classList.toggle('light-theme', !this.dark);
  }
}
