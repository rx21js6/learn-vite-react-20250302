// vitest.config.ts
import { defineConfig } from 'vitest/config';
import viteConfig from './vite.config';

// viteConfig は関数としてエクスポートされているので、mode などが必要な場合は
// Vitest のデフォルトモード（'test'）で呼び出す
const mergedConfig = viteConfig({
  mode: 'test',
  command: 'build'
});

export default defineConfig({
  ...mergedConfig,
  // 必要に応じて vitest 専用の上書きをここに記述
  test: {
    ...mergedConfig.test,
    // ここに追加のオプションがあれば記述
  },
});
