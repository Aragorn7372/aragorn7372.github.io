import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../environments/enviroment';
import { TRACK_PATH, VisitSessionService } from './visit-session.service';

describe('VisitSessionService', () => {
  const trackUrl = `${environment.apiUrl}${TRACK_PATH}`;
  let session: VisitSessionService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    session = TestBed.inject(VisitSessionService);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => controller.verify());

  it('reintenta el track si la API no responde y acaba mostrando el contador', fakeAsync(() => {
    session.ensureSession().subscribe();

    controller.expectOne(trackUrl).flush(null, { status: 503, statusText: 'Service Unavailable' });
    tick(2000);
    controller.expectOne(trackUrl).flush(null, { status: 0, statusText: 'Unknown Error' });
    tick(4000);
    controller.expectOne(trackUrl).flush({ counted: true, visits: 7, token: 't' });

    expect(session.visits()).toBe(7);
    expect(session.token).toBe('t');
  }));

  it('no reintenta un 429 y deja el contador sin mostrar', fakeAsync(() => {
    session.ensureSession().subscribe();

    controller.expectOne(trackUrl).flush({ error: 'rate_limited' }, { status: 429, statusText: 'Too Many Requests' });
    tick(10000);

    controller.expectNone(trackUrl);
    expect(session.visits()).toBeNull();
  }));

  it('tras agotar los reintentos vuelve a intentarlo en la siguiente petición', fakeAsync(() => {
    session.ensureSession().subscribe();
    for (const wait of [2000, 4000]) {
      controller.expectOne(trackUrl).flush(null, { status: 503, statusText: 'Service Unavailable' });
      tick(wait);
    }
    controller.expectOne(trackUrl).flush(null, { status: 503, statusText: 'Service Unavailable' });
    expect(session.visits()).toBeNull();

    session.ensureSession().subscribe();
    controller.expectOne(trackUrl).flush({ counted: false, visits: 3 });
    expect(session.visits()).toBe(3);
  }));
});
