import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  /* 플러그인 설정 */
  plugins: [react()],

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
})
