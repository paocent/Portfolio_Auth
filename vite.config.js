import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const {PORT = 3000} = process.env;

// https://vite.dev/config/
export default defineConfig({
  root: './client', 
  plugins: [react()],
  base:process.env.VITE_BASE_PATH || '/Portfolio_Auth', 
  server: {
    // 💡 ALL proxy rules must be inside this object
    proxy: {
      // 1. Corrected /api rule (using the object structure for options)
      '/api': {
        target: `http://localhost:${PORT}`,
        changeOrigin: true,
        // Optional: rewrite the path if needed (e.g., to remove '/api')
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
      // 2. Corrected /auth rule
      '/auth': {
        target: `http://localhost:${PORT}`,
        changeOrigin: true,
      },
    },
    
    // 3. Move 'build' outside of 'server' and define it at the top level
    //    The build configuration should be outside of the server object.
  },
  
  // 4. Build config should be defined here, as a sibling to 'server' and 'plugins'
  build: {
    manifest: true,
    rollupOptions: {
      input: './client/main.jsx',
    },
  },
});