import { normalizeProjects } from './projects.service';

describe('normalizeProjects', () => {
  it('usa la misma URL de avatar para todos los proyectos de un propietario', () => {
    const projects = normalizeProjects([
      { name: 'a', owner: 'Aragorn7372', avatarUrl: 'https://avatars.githubusercontent.com/u/1?v=4' },
      { name: 'b', owner: 'Aragorn7372', avatarUrl: 'https://avatars.githubusercontent.com/u/1?v=4&s=460' },
      { name: 'c', owner: 'G-Corp-YA', avatarUrl: 'https://avatars.githubusercontent.com/u/2?v=4' }
    ]);

    expect(projects[0].avatarUrl).toBe(projects[1].avatarUrl);
    expect(projects[0].avatarUrl).not.toBe(projects[2].avatarUrl);
    expect(new URL(projects[0].avatarUrl).searchParams.get('s')).toBe('64');
  });

  it('rellena los campos que faltan y trata las cadenas vacías como nulas', () => {
    const [project] = normalizeProjects([{ name: 'x', owner: 'o', description: '   ', pagesUrl: '' }]);

    expect(project.description).toBeNull();
    expect(project.pagesUrl).toBeNull();
    expect(project.languages).toEqual({});
    expect(project.topics).toEqual([]);
    expect(project.technologies).toEqual([]);
    expect(project.stars).toBe(0);
  });
});
