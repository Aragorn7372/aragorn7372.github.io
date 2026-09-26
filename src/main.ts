import {enableProdMode, provideZoneChangeDetection} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { environment } from './environments/enviroment';
import {provideRouter} from '@angular/router';
import {routes} from './app/app.routes';
import {provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';
import { apiInterceptor } from './app/services/api.interceptor';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([apiInterceptor]))
  ]
}).catch((err) => console.error(err));
