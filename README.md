# Aragorn7372 - Portafolio Personal

[![Deploy to GitHub Pages](https://github.com/Aragorn7372/aragorn7372.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/Aragorn7372/aragorn7372.github.io/actions/workflows/deploy.yml)
[![Angular](https://img.shields.io/badge/Angular-DD0031?style=flat&logo=angular&logoColor=white)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Portafolio personal desarrollado con Angular y TypeScript, desplegado automáticamente en GitHub Pages.

**[Ver sitio en vivo](https://aragorn7372.github.io)**

---

##  Características

-  **Diseño moderno y responsivo** - Se adapta a cualquier dispositivo
-  **Tema claro/oscuro** - Cambia entre temas con un click
-  **SPA con Angular** - Navegación rápida y fluida
-  **Estadísticas de GitHub** - Integración con GitHub API
-  **Detección automática de proyectos** - Lista todos los proyectos con GitHub Pages
-  **PWA Ready** - Optimizado para rendimiento
-  **SEO Optimizado** - Meta tags y Open Graph
-  **CI/CD Automático** - Deployment automático con GitHub Actions

---

## ️ Tecnologías

### Frontend
- **Angular 19** - Framework principal
- **TypeScript** - Lenguaje de programación
- **RxJS** - Programación reactiva
- **CSS3** - Estilos personalizados

### Herramientas
- **GitHub API** - Obtención de repositorios y proyectos
- **GitHub Actions** - CI/CD y deployment automático
- **GitHub Pages** - Hosting estático
- **Font Awesome** - Iconos

### Características técnicas
- ✅ Standalone Components
- ✅ Lazy Loading
- ✅ Route Guards
- ✅ HTTP Interceptors
- ✅ Service Workers
- ✅ Optimización de bundle

---

## Instalación y uso local

### Prerrequisitos

- Node.js 20.x o superior
- npm 10.x o superior
- Angular CLI 19.x

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Aragorn7372/aragorn7372.github.io.git

# Navegar al directorio
cd aragorn7372.github.io

# Instalar dependencias
npm install
```

### Desarrollo

```bash
# Servidor de desarrollo
npm start
# o
ng serve

# La aplicación estará disponible en http://localhost:4200
```

### Build de producción

```bash
# Generar build optimizado
npm run build

# Los archivos compilados estarán en dist/Aragorn7372/browser/
```

### Testing

```bash
# Ejecutar tests unitarios
npm test

# Ejecutar tests con cobertura
npm run test:coverage
```

---

## Estructura del proyecto

```
aragorn7372.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── src/
│   ├── app/
│   │   ├── pages/
│   │   │   ├── home/           # Página principal
│   │   │   └── projects/       # Página de proyectos
│   │   ├── services/
│   │   │   └── github.service.ts  # Servicio para GitHub API
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   └── app.routes.ts       # Rutas de la aplicación
│   ├── assets/                 # Recursos estáticos
│   ├── environments/           # Variables de entorno
│   ├── index.html
│   ├── main.ts                 # Entry point
│   └── styles.css              # Estilos globales
├── angular.json                # Configuración de Angular
├── package.json
├── tsconfig.json
└── README.md
```

---

## CI/CD y Deployment

El proyecto utiliza **GitHub Actions** para deployment automático:

### Workflow

1. **Push a main** → Activa el workflow
2. **Build** → Compila la aplicación Angular
3. **Deploy** → Publica en la rama `gh-pages`
4. **GitHub Pages** → Sirve el sitio automáticamente

### Configuración manual

Si quieres deployar manualmente:

```bash
# Build de producción
npm run build

# Los archivos en dist/Aragorn7372/browser/ están listos para deployment
```

---

## Personalización

### Cambiar tema

El tema se guarda automáticamente en `localStorage`. Para cambiar el tema por defecto:

```typescript
// src/app/pages/home/home.component.ts
dark = true; // Cambia a false para tema claro por defecto
```

### Modificar colores

Los colores se definen en CSS variables:

```css
/* src/styles.css */
:root {
  --bg: linear-gradient(180deg,#05060a 0%, #071026 60%);
  --card: #0b1220;
  --accent: #58A6FF;
  --text: #e6eef6;
  /* ... más variables */
}
```

### Añadir nuevas secciones

1. Crea un nuevo componente:
```bash
ng generate component pages/nueva-seccion
```

2. Añade la ruta en `app.routes.ts`:
```typescript
{ path: 'nueva-seccion', component: NuevaSeccionComponent }
```

---

## GitHub API

El proyecto utiliza la API pública de GitHub para:

- Listar repositorios del usuario
- Detectar proyectos con GitHub Pages
- Mostrar estadísticas y métricas

### Límites de rate

- **Sin autenticación**: 60 peticiones/hora por IP
- **Con token**: 5000 peticiones/hora

### Configurar token (opcional)

Para aumentar el límite de rate:

1. Crea un token en [GitHub Settings](https://github.com/settings/tokens)
2. Añade el token en `github.service.ts`

⚠️ **Nota**: No subas el token al repositorio público. Usa variables de entorno.

---

##  Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

##  Roadmap

- [ ] Añadir sección de blog
- [ ] Integrar sistema de comentarios
- [ ] Añadir animaciones más complejas
- [ ] Implementar i18n (internacionalización)
- [ ] Añadir sección de experiencia laboral
- [ ] Integrar con más APIs (LinkedIn, Twitter, etc.)
- [ ] PWA completo con Service Workers
- [ ] Modo offline

---

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---

## Autor

**Aragorn7372**

- GitHub: [@Aragorn7372](https://github.com/Aragorn7372)
- Portafolio: [aragorn7372.github.io](https://aragorn7372.github.io)

---

## Agradecimientos

- [Angular](https://angular.io/) - Framework increíble
- [GitHub Pages](https://pages.github.com/) - Hosting gratuito
- [Font Awesome](https://fontawesome.com/) - Iconos
- [DevIcons](https://devicon.dev/) - Iconos de tecnologías
- [GitHub Readme Stats](https://github.com/anuraghazra/github-readme-stats) - Estadísticas
- Comunidad de desarrolladores ❤️

---

<div align="center">

**⭐ Si te gustó este proyecto, dale una estrella en GitHub ⭐**

Hecho con ❤️ y ☕ por Aragorn7372

</div>
