import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

// https://vitejs.dev/config/
// server: {
//   proxy: {
//     '/api':'http://159.223.74.41:8069',
//   },
// },
export default defineConfig({
  server: {
    proxy: {
      '^/v2/api/.*': {
        target: 'https://odoo.ycfitness.xyz',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
        
      },
      '^/api/.*': {
        target: 'https://odoo.ycfitness.xyz',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
        
      },
    },
  },
  plugins: [react()],
})