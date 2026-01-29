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
    // Set to true to debug "Cannot access before initialization" (unminified build)
    // minify: false,
    rollupOptions: {
      output: {
        // Single vendor chunk so Vue + Element Plus load in one order (avoids circular ref in prod)
        manualChunks(id) {
          if (id.includes('node_modules')) return 'vendor'
        },
        format: 'es',
        generatedCode: { constBindings: true }
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
