import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  githubUser = 'Aragorn7372';
  fullName = 'Aragorn7372';
  year = new Date().getFullYear();
  bannerUrl = '';
  dark = true;
  showScrollTop = false;
  githubStatsUrl = 'https://raw.githubusercontent.com/Aragorn7372/Aragorn7372/master/stats-images/general-stats.svg';

  topLangsUrl = 'https://raw.githubusercontent.com/Aragorn7372/Aragorn7372/master/stats-images/top-langs.svg';

  streakUrl = 'https://raw.githubusercontent.com/Aragorn7372/Aragorn7372/master/stats-images/activity-graph.svg';

  profileData = {
    about: 'Soy un desarrollador full stack titulado en el IES Luis Vives, apasionado por crear soluciones tecnológicas y aprender constantemente. Me encanta explorar diferentes tecnologías y aplicarlas en proyectos reales.',
    learning: [
      'Desarrollo de backend con Kotlin, Java, C# y Spring Boot',
      'Desarrollo frontend con Angular y TypeScript',
      'Gestión avanzada de bases de datos con PostgreSQL y MongoDB',
      'Contenedorización con Docker y Docker Compose',
      'Testing automatizado con JUnit, NUnit y Playwright'
    ],
    technologies: {
      frontend: [
        { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
        { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
        { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
        { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
        { name: 'Angular', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg' },
        { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
        { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
        { name: 'daisyUI', icon: 'https://raw.githubusercontent.com/saadeghi/daisyui-images/master/images/daisyui-logo/favicon-192.png' }
      ],
      backend: [
        { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
        { name: 'Kotlin', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg' },
        { name: 'Spring Boot', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
        { name: 'Gradle', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gradle/gradle-original.svg' },
        { name: 'C#', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg' },
        { name: '.NET', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg' }
      ],
      databases: [
        { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
        { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
        { name: 'MariaDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mariadb/mariadb-original.svg' },
        { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
        { name: 'SQLite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg' },
        { name: 'H2', icon: 'https://www.h2database.com/html/images/h2-logo-2.png' }
      ],
      tools: [
        { name: 'IntelliJ IDEA', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg' },
        { name: 'Rider', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rider/rider-original.svg' },
        { name: 'WebStorm', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webstorm/webstorm-original.svg' },
        { name: 'DataGrip', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/datagrip/datagrip-original.svg' },
        { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
        { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
        { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
        { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' }
      ]
    }
  };

  ngOnInit(): void {
    const stored = localStorage.getItem('vm_theme');
    if (stored) {
      this.dark = stored === 'dark';
    } else {
      this.dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    this.applyTheme();
  }

  downloadCV() {
    const link = document.createElement('a');
    link.href = 'cv.pdf';
    link.download = 'CV_Aragorn7372.pdf'; // Nombre del archivo al descargar
    link.target = '_blank'; // Abrir en nueva pestaña si falla la descarga
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  toggleTheme() {
    this.dark = !this.dark;
    localStorage.setItem('vm_theme', this.dark ? 'dark' : 'light');
    this.applyTheme();
  }

  private applyTheme() {
    const root = document.documentElement;
    if (this.dark) root.classList.remove('light-theme');
    else root.classList.add('light-theme');
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.showScrollTop = window.scrollY > 220;
  }

  scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
