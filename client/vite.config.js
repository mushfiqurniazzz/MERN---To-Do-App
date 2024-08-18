import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy:{
      '*':'https://mern-to-do-app-api.vercel.app'
    }
  },
  plugins: [react()],
})
