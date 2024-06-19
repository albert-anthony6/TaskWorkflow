import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: '../API/wwwroot'
  },
  server: {
    port: 3000
  },
  plugins: [react(), svgr()],
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use 'sass:math';
          @use 'sass:color';
          @use 'sass:map';
          @import './src/assets/scss/_variables.scss';
          @import './src/assets/scss/_mixins.scss';
          @import './src/assets/scss/_functions.scss';
          @import './src/assets/scss/_animations.scss';
        `
      }
    }
  }
});
