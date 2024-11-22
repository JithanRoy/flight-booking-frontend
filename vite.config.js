import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://flight-booking-system-backend-9jvl.onrender.com',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});
