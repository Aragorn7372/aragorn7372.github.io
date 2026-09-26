/**
 * Colores de lenguajes de GitHub Linguist (los mismos que usa GitHub en sus barras de lenguajes).
 * https://github.com/github-linguist/linguist/blob/main/lib/linguist/languages.yml
 */
const LANGUAGE_COLORS: Record<string, string> = {
  'Assembly': '#6E4C13',
  'Batchfile': '#C1F12E',
  'Blade': '#f7523f',
  'C': '#555555',
  'C#': '#178600',
  'C++': '#f34b7d',
  'Clojure': '#db5855',
  'CMake': '#DA3434',
  'CSS': '#663399',
  'Dart': '#00B4AB',
  'Dockerfile': '#384d54',
  'Elixir': '#6e4a7e',
  'Go': '#00ADD8',
  'Groovy': '#4298b8',
  'Handlebars': '#f7931e',
  'Haskell': '#5e5086',
  'HCL': '#844FBA',
  'HTML': '#e34c26',
  'Java': '#b07219',
  'JavaScript': '#f1e05a',
  'Jupyter Notebook': '#DA5B0B',
  'Kotlin': '#A97BFF',
  'Less': '#1d365d',
  'Lua': '#000080',
  'Makefile': '#427819',
  'Markdown': '#083fa1',
  'Objective-C': '#438eff',
  'Perl': '#0298c3',
  'PHP': '#4F5D95',
  'PLpgSQL': '#336790',
  'PowerShell': '#012456',
  'Python': '#3572A5',
  'R': '#198CE7',
  'Ruby': '#701516',
  'Rust': '#dea584',
  'Scala': '#c22d40',
  'SCSS': '#c6538c',
  'Shell': '#89e051',
  'Svelte': '#ff3e00',
  'Swift': '#F05138',
  'TSQL': '#e38c00',
  'TypeScript': '#3178c6',
  'Vue': '#41b883',
  'XSLT': '#EB8CEB'
};

/**
 * Color representativo de un lenguaje. Si no está en la tabla, genera uno estable a partir del
 * nombre, de modo que el mismo lenguaje siempre tenga el mismo color.
 */
export function languageColor(name: string): string {
  const known = LANGUAGE_COLORS[name];
  if (known) return known;

  let hash = 0;
  for (const char of name) {
    hash = (hash * 31 + char.charCodeAt(0)) | 0;
  }
  return `hsl(${Math.abs(hash) % 360} 55% 55%)`;
}
