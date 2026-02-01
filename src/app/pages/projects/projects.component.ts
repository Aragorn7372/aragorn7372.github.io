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
  githubUser = 'Aragorn7372';
  githubPagesProjects: GitHubPagesProject[] = [];
  loadingProjects = true;

  constructor(private githubService: GithubService) {}

  ngOnInit(): void {
    this.loadGitHubPagesProjects();
  }

  loadGitHubPagesProjects(): void {
    this.githubService.getGitHubPagesProjects(this.githubUser).subscribe({
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
}
