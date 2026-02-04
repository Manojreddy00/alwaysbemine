import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Refer to this main Documentation - https://vitejs.dev/config/
export default defineConfig({
  base: '/alwaysbemine/',
  plugins: [react()],
})
