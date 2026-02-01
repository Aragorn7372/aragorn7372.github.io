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
  bannerUrl = 'https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=2,12,18,20&height=200&section=header&text=&fontSize=0';
  dark = true;
  showScrollTop = false;
  githubStatsUrl = 'https://github-readme-stats.vercel.app/api?username=Aragorn7372&show_icons=true&theme=tokyonight&hide_border=true&bg_color=0D1117&title_color=58A6FF&icon_color=58A6FF&text_color=C9D1D9';

  topLangsUrl = 'https://github-readme-stats.vercel.app/api/top-langs/?username=Aragorn7372&layout=compact&theme=tokyonight&hide_border=true&bg_color=0D1117&title_color=58A6FF&text_color=C9D1D9';

  streakUrl = 'https://github-readme-streak-stats.herokuapp.com/?user=Aragorn7372&theme=tokyonight&hide_border=true&background=0D1117&stroke=58A6FF&ring=58A6FF&fire=FF6B6B&currStreakLabel=58A6FF';

  profileData = {
    about: 'Soy un estudiante de desarrollo de aplicaciones web en el IES Luis Vives, apasionado por crear soluciones tecnológicas y aprender constantemente. Me encanta explorar diferentes tecnologías y aplicarlas en proyectos reales.',
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
        { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' }
      ],
      backend: [
        { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
        { name: 'Kotlin', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg' },
        { name: 'C#', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg' },
        { name: 'Spring Boot', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
        { name: '.NET', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg' },
        { name: 'Gradle', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gradle/gradle-original.svg' }
      ],
      databases: [
        { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
        { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
        { name: 'MariaDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mariadb/mariadb-original.svg' },
        { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' }
      ],
      tools: [
        { name: 'IntelliJ IDEA', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg' },
        { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
        { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
        { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
        { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' }
      ]
    }
  };

  ngOnInit(): void {
    const stored = localStorage.getItem('vm_theme');
    this.dark = stored ? stored === 'dark' : true;
    this.applyTheme();
  }

  printPDF() {
    window.print();
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
