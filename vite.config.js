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
    include: ['vue', 'vue-router', 'pinia', 'vue-datepicker-next', 'chart.js', 'dayjs'],
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
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('vue') || id.includes('pinia') || id.includes('@vue')) return 'vue-vendor'
            if (id.includes('element-plus') || id.includes('@element-plus')) return 'element-plus'
            if (id.includes('chart.js') || id.includes('echarts') || id.includes('apexcharts')) return 'charts'
            if (id.includes('lodash')) return 'lodash'
            if (id.includes('axios')) return 'axios'
            if (id.includes('dayjs') || id.includes('date-fns')) return 'date-utils'
            return 'vendor'
          }
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
  }
})
