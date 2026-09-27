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

  it('usa el displayName de la API y, si falta o está vacío, el nombre del repo', () => {
    const [withName, withoutName, blankName] = normalizeProjects([
      { name: 'pi-hole', displayName: 'Pi-hole casero', owner: 'o' },
      { name: 'dejovenes', owner: 'o' },
      { name: 'repo', displayName: '  ', owner: 'o' }
    ]);

    expect(withName.displayName).toBe('Pi-hole casero');
    expect(withoutName.displayName).toBe('dejovenes');
    expect(blankName.displayName).toBe('repo');
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
