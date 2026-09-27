import { TestBed } from '@angular/core/testing';
import { Project } from '../../../services/projects.service';
import { buildLanguageSlices, ProjectCardComponent } from './project-card.component';

const baseProject: Project = {
  name: 'repo',
  displayName: 'repo',
  description: null,
  url: 'https://github.com/o/repo',
  pagesUrl: null,
  owner: 'o',
  avatarUrl: '',
  stars: 0,
  forks: 0,
  commits: 0,
  languages: {},
  topics: [],
  technologies: []
};

function render(project: Project): HTMLElement {
  const fixture = TestBed.createComponent(ProjectCardComponent);
  fixture.componentRef.setInput('project', project);
  fixture.detectChanges();
  return fixture.nativeElement as HTMLElement;
}

describe('ProjectCardComponent', () => {
  it('con los campos vacíos solo muestra la cabecera y un botón', () => {
    const el = render(baseProject);
    const text = el.textContent ?? '';

    expect(text).not.toContain('Lenguajes');
    expect(text).not.toContain('Tecnologías');
    expect(text).not.toContain('Topics');
    expect(text).not.toContain('commits');
    expect(el.querySelectorAll('footer a').length).toBe(1);
    expect(text).not.toContain('Pages');
  });

  it('muestra todos los bloques y el botón de Pages cuando hay datos', () => {
    const el = render({
      ...baseProject,
      description: 'Descripción',
      pagesUrl: 'https://o.github.io/repo',
      stars: 3,
      commits: 12,
      languages: { Kotlin: 80, Java: 20 },
      topics: ['api'],
      technologies: ['docker']
    });
    const text = el.textContent ?? '';

    expect(text).toContain('Descripción');
    expect(text).toContain('Lenguajes');
    expect(text).toContain('Kotlin');
    expect(text).toContain('12 commits');
    expect(text).not.toContain('Forks');
    expect(el.querySelectorAll('footer a').length).toBe(2);
    expect(el.querySelector('.donut')).not.toBeNull();
  });
});

describe('ProjectCardComponent: botones', () => {
  it('"Ver repositorio" siempre es el botón relleno y "Pages" el transparente', () => {
    const [repo, pages] = Array.from(render({ ...baseProject, pagesUrl: 'https://o.github.io/repo' })
      .querySelectorAll('footer a'));

    expect(repo.classList).toContain('btn-primary');
    expect(pages.classList).toContain('btn-outline');
    expect(pages.classList).not.toContain('btn-primary');
  });

  it('no hay enlace a GitHub en la cabecera: solo los botones del pie', () => {
    const el = render(baseProject);
    expect(el.querySelectorAll('header a').length).toBe(0);
    expect(el.querySelector('footer a')?.classList).toContain('btn-primary');
  });
});

describe('ProjectCardComponent: nombre para mostrar', () => {
  it('usa el displayName como título y muestra owner/repo debajo', () => {
    const el = render({ ...baseProject, displayName: 'Repo bonito' });

    expect(el.querySelector('h3')?.textContent?.trim()).toBe('Repo bonito');
    expect(el.querySelector('h3 + p')?.textContent?.trim()).toBe('o/repo');
  });

  it('si el título es el nombre del repo, debajo solo aparece el propietario', () => {
    const el = render(baseProject);

    expect(el.querySelector('h3')?.textContent?.trim()).toBe('repo');
    expect(el.querySelector('h3 + p')?.textContent?.trim()).toBe('o');
  });
});

describe('buildLanguageSlices', () => {
  it('ordena de mayor a menor', () => {
    expect(buildLanguageSlices({ CSS: 10, Kotlin: 90 }).map(s => s.name)).toEqual(['Kotlin', 'CSS']);
  });

  it('agrupa en "Otros" cuando hay más de 6 lenguajes', () => {
    const slices = buildLanguageSlices({ A: 40, B: 20, C: 15, D: 10, E: 6, F: 5, G: 4 });
    expect(slices.length).toBe(6);
    expect(slices[5].name).toBe('Otros');
    expect(slices[5].percent).toBe(9);
  });
});
