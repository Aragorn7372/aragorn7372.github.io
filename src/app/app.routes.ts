import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'projects',
    loadComponent: () => import('./pages/projects/projects.component').then(m => m.ProjectsComponent)
  },
  {
    path: 'certificates',
    loadComponent: () => import('./pages/certificates/certificates.component').then(m => m.CertificatesComponent)
  },
  { path: '**', redirectTo: '' }
];
