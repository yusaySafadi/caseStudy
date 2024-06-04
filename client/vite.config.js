import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    svgr({
      svgrOptions: {
        // svgr options
      },
    })],
  server:{
    '/api': 'http://localhost:3000', // This redirects all calls starting with /api to the backend
  },
  define: {
    'process.env': process.env,
  },
})
