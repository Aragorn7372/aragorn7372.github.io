import { Component, OnInit, ChangeDetectionStrategy, CUSTOM_ELEMENTS_SCHEMA, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { marked } from 'marked';
import '@aejkatappaja/phantom-ui';
import { ExperienceDetails, ExperienceImage, ExperienceService } from '../../services/experience.service';
import { ThemeService } from '../../services/theme.service';

const LOGO_FILENAME = 'logo.png';

@Component({
  selector: 'app-experience-detail',
  standalone: true,
  imports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './experience-detail.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./experience-detail.component.css']
})
export class ExperienceDetailComponent implements OnInit {
  experience: ExperienceDetails | null = null;
  logoUrl: string | null = null;
  html: SafeHtml = '';
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private experienceService: ExperienceService,
    private themeService: ThemeService,
    private sanitizer: DomSanitizer
  ) {}

  get bannerSrc(): string {
    return this.themeService.bannerSrc;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.experienceService.getExperience(id).subscribe({
      next: (experience) => {
        this.experience = experience;
        this.logoUrl = experience.images.find(img => img.filename === LOGO_FILENAME)?.url ?? null;
        const sanitize = (html: string) => this.sanitizer.sanitize(SecurityContext.HTML, html) ?? '';
        // Ya saneado por Angular: solo se le añaden clases y tamaños numéricos
        this.html = this.sanitizer.bypassSecurityTrustHtml(
          renderMarkdown(experience.markdown, experience.images, sanitize)
        );
        this.loading = false;
      },
      error: (error) => {
        console.error('Error cargando experiencia:', error);
        this.loading = false;
      }
    });
  }
}

/**
 * Convierte el markdown a HTML, lo sanea y después lo ajusta para mostrarlo:
 * - Las rutas relativas de las imágenes (tal como vienen en el zip de la experiencia) se
 *   sustituyen por su URL de Cloudinary, buscando por nombre de fichero.
 * - Los atributos `width`/`height` pasan a estilo inline: el preflight de Tailwind
 *   (`img { height: auto }`) los anularía y los SVG sin tamaño propio saldrían gigantes.
 * - Las tablas se envuelven para poder hacer scroll horizontal en móvil.
 */
export function renderMarkdown(
  markdown: string,
  images: ExperienceImage[],
  sanitize: (html: string) => string
): string {
  const urlByFilename = new Map(images.map(img => [img.filename, img.url]));
  const html = sanitize(marked.parse(markdown ?? '', { async: false }) as string);

  const doc = new DOMParser().parseFromString(html, 'text/html');
  doc.querySelectorAll('img').forEach(img => {
    img.setAttribute('loading', 'lazy');
    const src = img.getAttribute('src') ?? '';
    const external = /^(https?:|data:)/i.test(src);
    if (!external) {
      const filename = decodeURIComponent(src.split(/[?#]/)[0].split('/').pop() ?? '');
      const url = urlByFilename.get(filename);
      if (url) img.setAttribute('src', url);
    }

    const width = pixels(img.getAttribute('width'));
    const height = pixels(img.getAttribute('height'));
    if (width) img.style.width = `${width}px`;
    if (height) img.style.height = `${height}px`;

    // Con tamaño fijado, externas o varias seguidas (fila de tecnologías) van en línea;
    // el resto (capturas del zip) a ancho completo
    const siblings = img.parentElement?.querySelectorAll('img').length ?? 0;
    const inline = width || height || external || siblings > 1;
    img.classList.add(inline ? 'md-icon' : 'md-photo');
  });
  doc.querySelectorAll('a[href^="http"]').forEach(a => {
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener');
  });
  doc.querySelectorAll('table').forEach(table => {
    const wrapper = doc.createElement('div');
    wrapper.className = 'md-table';
    table.replaceWith(wrapper);
    wrapper.appendChild(table);
  });
  return doc.body.innerHTML;
}

/** Valor de `width`/`height` solo si es un número de píxeles razonable. */
function pixels(value: string | null): number | null {
  if (!value || !/^\d{1,4}$/.test(value.trim())) return null;
  return Number(value);
}
