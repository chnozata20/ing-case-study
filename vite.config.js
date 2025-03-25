import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'esnext',
    outDir: 'dist',
    assetsDir: 'assets'
  },
  resolve: {
    dedupe: ['lit']
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: ``
      }
    }
  },
  optimizeDeps: {
    include: ['@fortawesome/fontawesome-free']
  },
  server: {
    fs: {
      // Fontawesome dosyalarının web sunucusu tarafından sunulmasına izin ver
      allow: ['..']
    }
  }
}); 