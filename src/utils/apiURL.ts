export const API_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3333'
    : 'https://ammo.yandsb.dev';
