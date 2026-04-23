import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/users': 'http://localhost:3000',
      '/captains': 'http://localhost:3000',
      '/maps': 'http://localhost:3000',
      '/rides': 'http://localhost:3000',
    },
  },
})
