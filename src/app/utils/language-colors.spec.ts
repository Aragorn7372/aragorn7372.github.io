import { languageColor } from './language-colors';

describe('languageColor', () => {
  it('devuelve el color de GitHub de los lenguajes conocidos', () => {
    expect(languageColor('Kotlin')).toBe('#A97BFF');
    expect(languageColor('TypeScript')).toBe('#3178c6');
  });

  it('genera un color estable para los lenguajes desconocidos', () => {
    const color = languageColor('LenguajeInventado');
    expect(color).toMatch(/^hsl\(/);
    expect(languageColor('LenguajeInventado')).toBe(color);
  });
});
