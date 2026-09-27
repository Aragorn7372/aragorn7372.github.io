import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { CertificatesService } from './certificates.service';

describe('CertificatesService.formatTitle', () => {
  let service: CertificatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient()] });
    service = TestBed.inject(CertificatesService);
  });

  it('quita el prefijo, cambia los guiones bajos por espacios y capitaliza cada palabra', () => {
    expect(service.formatTitle('certificado_curso_de_kotlin')).toBe('Curso De Kotlin');
  });

  it('no pone mayúsculas detrás de tildes ni de la ñ', () => {
    expect(service.formatTitle('certificado_curso_de_solid_y_patrones_de_diseño')).toBe('Curso De Solid Y Patrones De Diseño');
    expect(service.formatTitle('documentación_del_código_con_javadoc')).toBe('Documentación Del Código Con Javadoc');
    expect(service.formatTitle('análisis_forense_básico')).toBe('Análisis Forense Básico');
  });

  it('capitaliza también palabras que empiezan por letra con tilde', () => {
    expect(service.formatTitle('introducción_a_árboles')).toBe('Introducción A Árboles');
  });
});
