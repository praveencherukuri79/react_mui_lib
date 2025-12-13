import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@themes': '/src/themes',
      '@hooks': '/src/hooks',
      '@state': '/src/state',
      '@utils': '/src/utils',
      '@pages': '/src/pages',
    },
  },
  server: {
    port: 3000,
    open: true,
  },
})

