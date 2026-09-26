export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000',
  // El token de visita dura 15 min; se renueva un poco antes para no llegar a usarlo caducado
  tokenTtlMs: 14 * 60_000
};
