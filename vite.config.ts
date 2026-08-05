import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: process.env.VITE_BASE || '/latest/',
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
  },
})
