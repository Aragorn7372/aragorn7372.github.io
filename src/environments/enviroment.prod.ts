export const environment = {
  production: true,
  apiUrl: 'https://port-api.victor-service.dev',
  // El token de visita dura 15 min; se renueva un poco antes para no llegar a usarlo caducado
  tokenTtlMs: 14 * 60_000
};
