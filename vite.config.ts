// vite.config.ts
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const envDir = 'env';
  const env = loadEnv(mode, envDir, 'VITE_');

  return {
    plugins: [react()],
    envDir,
    define: {
      'process.env': env,
      'import.meta.env': env,
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: 'src/__tests__/setupTests.ts',
    },
  };
});
