import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // `env` ディレクトリを指定して `.env` をロード
  const envDir = 'env';
  const env = loadEnv(mode, envDir, 'VITE_');

  return {
    plugins: [react()],
    envDir, // 追加: 環境変数ディレクトリを Vite に明示的に指定
    define: {
      'process.env': env, // （オプション）必要に応じて `process.env` にもセット
    },
  };
});
