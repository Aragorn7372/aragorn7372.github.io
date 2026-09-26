import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../environments/enviroment';
import { apiInterceptor } from './api.interceptor';
import { TRACK_PATH, VisitSessionService } from './visit-session.service';

describe('apiInterceptor', () => {
  const projectsUrl = `${environment.apiUrl}/projects`;
  const trackUrl = `${environment.apiUrl}${TRACK_PATH}`;
  let http: HttpClient;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([apiInterceptor])),
        provideHttpClientTesting()
      ]
    });
    http = TestBed.inject(HttpClient);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => controller.verify());

  function flushTrack(visits = 10, token = 'tok-1'): void {
    const track = controller.expectOne(trackUrl);
    expect(track.request.method).toBe('POST');
    expect(track.request.withCredentials).toBeTrue();
    track.flush({ counted: true, visits, token });
  }

  it('obtiene el token una sola vez para peticiones simultáneas y envía la cookie', () => {
    const results: unknown[] = [];
    http.get(projectsUrl).subscribe(r => results.push(r));
    http.get(`${environment.apiUrl}/certificates`).subscribe(r => results.push(r));

    flushTrack(42);

    const projects = controller.expectOne(projectsUrl);
    const certificates = controller.expectOne(`${environment.apiUrl}/certificates`);
    expect(projects.request.withCredentials).toBeTrue();
    expect(certificates.request.withCredentials).toBeTrue();
    projects.flush([]);
    certificates.flush([]);

    expect(results.length).toBe(2);
    expect(TestBed.inject(VisitSessionService).visits()).toBe(42);
  });

  it('envía el token del cuerpo en Authorization: Bearer (para los espejos sin cookie)', () => {
    http.get(projectsUrl).subscribe();
    flushTrack(10, 'tok-abc');

    const req = controller.expectOne(projectsUrl);
    expect(req.request.headers.get('Authorization')).toBe('Bearer tok-abc');
    req.flush([]);
  });

  it('sin token en el cuerpo sigue funcionando solo con la cookie', () => {
    http.get(projectsUrl).subscribe();
    controller.expectOne(trackUrl).flush({ counted: true, visits: 1 });

    const req = controller.expectOne(projectsUrl);
    expect(req.request.headers.has('Authorization')).toBeFalse();
    expect(req.request.withCredentials).toBeTrue();
    req.flush([]);
  });

  it('no vuelve a pedir el token mientras siga vigente', () => {
    http.get(projectsUrl).subscribe();
    flushTrack();
    controller.expectOne(projectsUrl).flush([]);

    http.get(projectsUrl).subscribe();
    controller.expectNone(trackUrl);
    controller.expectOne(projectsUrl).flush([]);
  });

  it('ante un 401 visit_token_required renueva el token y reintenta una vez con el nuevo', () => {
    let result: unknown;
    http.get(projectsUrl).subscribe(r => (result = r));
    flushTrack();

    controller.expectOne(projectsUrl).flush(
      { error: 'visit_token_required' },
      { status: 401, statusText: 'Unauthorized' }
    );

    flushTrack(10, 'tok-2');
    const retry = controller.expectOne(projectsUrl);
    expect(retry.request.headers.get('Authorization')).toBe('Bearer tok-2');
    retry.flush(['ok']);
    expect(result).toEqual(['ok']);
  });

  it('solo reintenta una vez: un segundo 401 se propaga', () => {
    let status = 0;
    http.get(projectsUrl).subscribe({ error: e => (status = e.status) });
    flushTrack();

    const unauthorized = { status: 401, statusText: 'Unauthorized' };
    controller.expectOne(projectsUrl).flush({ error: 'visit_token_required' }, unauthorized);
    flushTrack();
    controller.expectOne(projectsUrl).flush({ error: 'visit_token_required' }, unauthorized);

    controller.expectNone(trackUrl);
    expect(status).toBe(401);
  });

  it('no reintenta ante un 429', () => {
    let status = 0;
    http.get(projectsUrl).subscribe({ error: e => (status = e.status) });
    flushTrack();

    controller.expectOne(projectsUrl).flush(
      { error: 'rate_limited' },
      { status: 429, statusText: 'Too Many Requests' }
    );

    controller.expectNone(trackUrl);
    controller.expectNone(projectsUrl);
    expect(status).toBe(429);
  });

  it('no toca las peticiones a otros dominios', () => {
    http.get('https://example.com/data').subscribe();
    controller.expectNone(trackUrl);
    const req = controller.expectOne('https://example.com/data');
    expect(req.request.withCredentials).toBeFalse();
    req.flush({});
  });
});
