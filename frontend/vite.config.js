import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig({
  plugins: [react(), svgr()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: [path.resolve(__dirname, 'src/styles')],
      },
    },
  },

  server: {
    port: 5173,
    proxy: {
      // All /api/* requests are forwarded to the Django backend.
      // The browser sees them as same-origin (localhost:5173) so CORS is irrelevant.
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        // Surface a clear message when the backend is unreachable
        configure: (proxy) => {
          proxy.on('error', (err) => {
            console.error(
              '\n[Vite proxy] ❌ Cannot reach Django backend at http://localhost:8000\n' +
              '   Start it with:\n' +
              '   cd backend && python manage.py runserver --settings=accetraa.settings.development\n',
              err.message
            );
          });
        },
      },
    },
  },
});
