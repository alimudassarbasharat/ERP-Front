import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag === 'emoji-picker'
        }
      }
    })
  ],
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()]
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    dedupe: ['vue', 'dayjs']
  },
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      'pinia',
      'element-plus',
      '@element-plus/icons-vue',
      'vue-datepicker-next',
      'chart.js',
      'dayjs'
    ],
    exclude: ['@vuepic/vue-datepicker'],
    esbuildOptions: {
      target: 'esnext'
    }
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/, /dayjs/],
      transformMixedEsModules: true
    },
    chunkSizeWarningLimit: 600,
    // Minify OFF: prevents "Cannot access 'j4' before initialization" in production
    minify: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) return 'vendor'
        }
      }
    }
  },
  server: {
    port: 5173,
    host: true,
    hmr: {
      host: 'localhost',
      port: 5173
    },
    fs: {
      strict: false
    }
  },
  preview: {
    port: 4173,
    host: true
  }
})
