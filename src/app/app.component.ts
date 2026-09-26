import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { VisitSessionService } from './services/visit-session.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet></router-outlet>',
  changeDetection: ChangeDetectionStrategy.Eager,
  styles: []
})
export class AppComponent {
  constructor(themeService: ThemeService, visitSession: VisitSessionService) {
    themeService.init();
    // Registra la visita y deja listo el token antes de que ninguna página lo necesite
    visitSession.ensureSession().subscribe();
  }
}
