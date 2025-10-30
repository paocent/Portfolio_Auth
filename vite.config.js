// D:\1. Centennial\3. Fall - 2025\COMP229 -- Web Application Development (SEC. 005)\0. Assignments\3. BackEnd\vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // **ADD THIS LINE**
  root: './client', 
  plugins: [react()],
})