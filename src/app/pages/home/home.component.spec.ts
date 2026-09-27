import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { HomeComponent } from './home.component';

describe('HomeComponent: estadísticas de GitHub según el tema', () => {
  let component: HomeComponent;
  let theme: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideRouter([])] });
    theme = TestBed.inject(ThemeService);
    component = TestBed.createComponent(HomeComponent).componentInstance;
  });

  it('usa las imágenes oscuras con el tema oscuro', () => {
    theme.dark = true;
    expect(component.githubStatsUrl).toMatch(/\/general-stats\.svg$/);
    expect(component.topLangsUrl).toMatch(/\/top-langs\.svg$/);
    expect(component.streakUrl).toMatch(/\/activity-graph\.svg$/);
  });

  it('usa las imágenes claras (-light) con el tema claro', () => {
    theme.dark = false;
    expect(component.githubStatsUrl).toMatch(/\/general-stats-light\.svg$/);
    expect(component.topLangsUrl).toMatch(/\/top-langs-light\.svg$/);
    expect(component.streakUrl).toMatch(/\/activity-graph-light\.svg$/);
  });
});
