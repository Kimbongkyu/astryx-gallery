import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

// base './' : GitHub Pages(/astryx-gallery/)와 로컬 어디서든 같은 빌드가 동작한다.
export default defineConfig({
  base: './',
  plugins: [react()],
});
