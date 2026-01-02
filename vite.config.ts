import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        manifest: {
          name: 'Reflecting Light (回光)',
          short_name: '回光',
          description: '“神像背坐，叹众生不肯回头。” - 哲学冥想体验',
          theme_color: '#1a1a1a',
          background_color: '#1a1a1a',
          display: 'standalone',
          orientation: 'portrait',
          icons: [
            {
              src: 'https://pic.wildsalt.me/storage/img/logo/refl-png-1767321905754-8158.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'https://pic.wildsalt.me/storage/img/logo/refl-png-1767321905754-8158.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        },
        workbox: {
          // Increase limit for caching remote images if necessary
          maximumFileSizeToCacheInBytes: 3000000 
        }
      })
    ],
    define: {
      // This is critical: it replaces 'process.env.API_KEY' in your code
      // with the actual value from the build environment.
      'process.env.API_KEY': JSON.stringify(env.API_KEY || process.env.API_KEY),
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
    }
  };
});