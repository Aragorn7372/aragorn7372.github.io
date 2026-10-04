import { Component, OnInit, ChangeDetectionStrategy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
  html = '';
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private experienceService: ExperienceService,
    private themeService: ThemeService
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
        this.html = renderMarkdown(experience.markdown, experience.images);
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
 * Convierte el markdown a HTML y sustituye las rutas relativas de las imágenes (tal como vienen
 * en el zip de la experiencia) por su URL de Cloudinary, buscando por nombre de fichero.
 * El HTML resultante lo sanea Angular al asignarlo con `[innerHTML]`.
 */
export function renderMarkdown(markdown: string, images: ExperienceImage[]): string {
  const urlByFilename = new Map(images.map(img => [img.filename, img.url]));
  const html = marked.parse(markdown ?? '', { async: false }) as string;

  const doc = new DOMParser().parseFromString(html, 'text/html');
  doc.querySelectorAll('img').forEach(img => {
    const src = img.getAttribute('src') ?? '';
    if (/^(https?:|data:)/i.test(src)) return;
    const filename = decodeURIComponent(src.split(/[?#]/)[0].split('/').pop() ?? '');
    const url = urlByFilename.get(filename);
    if (url) img.setAttribute('src', url);
    img.setAttribute('loading', 'lazy');
  });
  doc.querySelectorAll('a[href^="http"]').forEach(a => {
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener');
  });
  return doc.body.innerHTML;
}
