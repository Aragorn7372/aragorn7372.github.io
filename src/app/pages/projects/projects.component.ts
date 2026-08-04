import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GithubService, GitHubPagesProject } from '../../services/github.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  githubUsers = ['Aragorn7372', 'G-Corp-YA'];
  githubPagesProjects: GitHubPagesProject[] = [];
  loadingProjects = true;

  constructor(private githubService: GithubService) {}

  ngOnInit(): void {
    this.loadGitHubPagesProjects();
  }

  loadGitHubPagesProjects(): void {
    this.githubService.getGitHubPagesProjects(this.githubUsers).subscribe({
      next: (projects) => {
        this.githubPagesProjects = projects;
        this.loadingProjects = false;
      },
      error: (error) => {
        console.error('Error loading GitHub Pages projects:', error);
        this.loadingProjects = false;
      }
    });
  }

  onImageError(event: Event, project: GitHubPagesProject): void {
    const img = event.target as HTMLImageElement;
    img.onerror = null;
    img.src = `https://via.placeholder.com/600x300/0D1117/58A6FF?text=${encodeURIComponent(project.name)}`;
  }
}
