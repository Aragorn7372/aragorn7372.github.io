import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { Project } from '../../../services/projects.service';
import { languageColor } from '../../../utils/language-colors';

export interface LanguageSlice {
  name: string;
  percent: number;
  color: string;
}

/** Topics visibles antes de resumir el resto en "+N" (evita tarjetas desproporcionadamente altas). */
const MAX_TOPICS = 8;

/** A partir de este número de lenguajes se agrupan los menores en "Otros". */
const MAX_LANGUAGES = 6;
const OTHERS_COLOR = '#8b949e';

@Component({
  selector: 'app-project-card',
  standalone: true,
  templateUrl: './project-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block h-full' }
})
export class ProjectCardComponent {
  readonly project = input.required<Project>();

  /** La foto no ha cargado: se muestra la inicial del propietario. */
  readonly avatarFailed = signal(false);

  readonly languages = computed(() => buildLanguageSlices(this.project().languages));

  /** Degradado cónico del donut, con los mismos colores y proporciones que la lista. */
  readonly donut = computed(() => {
    const slices = this.languages();
    const total = slices.reduce((sum, s) => sum + s.percent, 0) || 1;
    let start = 0;
    const stops = slices.map(s => {
      const end = start + (s.percent / total) * 100;
      const stop = `${s.color} ${start.toFixed(2)}% ${end.toFixed(2)}%`;
      start = end;
      return stop;
    });
    return `conic-gradient(${stops.join(', ')})`;
  });

  readonly hasStats = computed(() => {
    const p = this.project();
    return p.stars > 0 || p.forks > 0 || p.commits > 0;
  });

  readonly visibleTopics = computed(() => this.project().topics.slice(0, MAX_TOPICS));
  readonly hiddenTopics = computed(() => Math.max(0, this.project().topics.length - MAX_TOPICS));

  /** `owner/repo` cuando el título es un nombre para mostrar; si coincide con el repo, solo el owner. */
  readonly subtitle = computed(() => {
    const p = this.project();
    return p.displayName !== p.name && p.owner ? `${p.owner}/${p.name}` : p.owner;
  });

  readonly initial = computed(() => (this.project().owner || this.project().name).charAt(0).toUpperCase());
}

/** Lenguajes ordenados de mayor a menor; si hay demasiados, los menores se agrupan en "Otros". */
export function buildLanguageSlices(languages: Record<string, number>): LanguageSlice[] {
  const sorted = Object.entries(languages)
    .filter(([, percent]) => percent > 0)
    .sort(([, a], [, b]) => b - a)
    .map(([name, percent]) => ({ name, percent, color: languageColor(name) }));

  if (sorted.length <= MAX_LANGUAGES) return sorted;

  const top = sorted.slice(0, MAX_LANGUAGES - 1);
  const rest = sorted.slice(MAX_LANGUAGES - 1).reduce((sum, s) => sum + s.percent, 0);
  return [...top, { name: 'Otros', percent: rest, color: OTHERS_COLOR }];
}
