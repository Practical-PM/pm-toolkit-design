import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/design/',
  resolve: {
    preserveSymlinks: true,
    dedupe: ['react', 'react-dom'],
  },
  build: {
    outDir: '../dist/design',
    emptyOutDir: true,
    rollupOptions: {
      external: [],
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react/jsx-runtime'],
    exclude: ['@toolkit-pm/design-system'],
    esbuildOptions: {
      jsx: 'automatic',
    },
  },
  server: {
    watch: {
      ignored: ['!**/packages/toolkit-pm-design-system/**'],
    },
  },
})
