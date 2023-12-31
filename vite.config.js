import { fileURLToPath, URL } from 'node:url'
import topLevelAwait from 'vite-plugin-top-level-await'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import tailwindcss from 'tailwindcss'
import polyfillNode from 'rollup-plugin-polyfill-node'
import { spaLoading } from 'vite-plugin-spa-loading'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss]
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    topLevelAwait({
      // The export name of top-level await promise for each chunk module
      promiseExportName: '__tla',
      // The function to generate import names of top-level await promise in each chunk module
      promiseImportName: (i) => `__tla_${i}`
    }),
    spaLoading('img', {
      src: './src/assets/images/app_loading.gif'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0'
  },
  build: {
    rollupOptions: {
      plugins: [polyfillNode()]
    }
  },
  optimizeDeps: {
    exclude: ['events']
  }
})
