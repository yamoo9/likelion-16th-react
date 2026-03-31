import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  /* 플러그인 설정 */
  plugins: [
    react(),
    visualizer({
      open: true,
      filename: 'stats.html',
      gzipSize: true,
      brotliSize: true,
    }),
  ],

  /* CSS 디버깅 설정 */
  css: {
    devSourcemap: true,
  },

  /* 개발 서버 설정 */
  server: {
    port: 3000,
    open: false,
  },

  /* 절대 경로 별칭(Alias) 설정 */
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  /* 빌드 설정 */
  build: {
    cssMinify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // React 관련 라이브러리
          if (
            id.includes('node_modules/react') ||
            id.includes('node_modules/react-dom')
          ) {
            return 'react-vendor'
          }

          // 라우터 관련 라이브러리
          if (id.includes('node_modules/react-router-dom')) {
            return 'router'
          }

          // 데이터 관리 라이브러리
          if (
            id.includes('node_modules/@tanstack/react-query') ||
            id.includes('node_modules/zustand')
          ) {
            return 'data-management'
          }

          // 유틸리티 파일
          if (
            id.includes('/src/utils/debounce') ||
            id.includes('/src/utils/fetchApi') ||
            id.includes('/src/utils/wait')
          ) {
            return 'utils'
          }

          return null
        },
      },
    },
  },
})
