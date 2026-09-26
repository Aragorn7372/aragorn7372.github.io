import { Component, OnInit, ChangeDetectionStrategy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { RouterModule } from '@angular/router';
import '@aejkatappaja/phantom-ui';
import { Project, ProjectsService } from '../../services/projects.service';
import { ThemeService } from '../../services/theme.service';
import { ProjectCardComponent } from './project-card/project-card.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [RouterModule, ProjectCardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './projects.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  loadingProjects = true;

  constructor(private projectsService: ProjectsService, private themeService: ThemeService) {}

  get bannerSrc(): string {
    return this.themeService.bannerSrc;
  }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectsService.getProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
        this.loadingProjects = false;
      },
      error: (error) => {
        console.error('Error cargando proyectos:', error);
        this.loadingProjects = false;
      }
    });
  }
}
