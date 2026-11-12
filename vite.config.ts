import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    build: {
      rollupOptions: {
        output: {
          // Long-lived vendor chunks: they change rarely, so browsers keep them cached
          // across deploys of our own code.
          manualChunks(id) {
            if (!id.includes('node_modules')) return undefined;
            // Firestore is loaded on demand (src/lib/firestore.ts); keep it out of the startup chunk.
            if (/node_modules\/(@firebase\/firestore|firebase\/firestore)\//.test(id)) return 'firestore';
            if (/node_modules\/(@firebase|firebase)\//.test(id)) return 'firebase';
            if (/node_modules\/(react|react-dom|react-router|scheduler|@tanstack)\//.test(id)) return 'react';
            return undefined;
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
