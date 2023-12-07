import { fileURLToPath, URL } from 'node:url'
import topLevelAwait from 'vite-plugin-top-level-await'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import nodeStdlibBrowser from 'node-stdlib-browser'
import inject from '@rollup/plugin-inject'
import tailwindcss from 'tailwindcss'
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
  define: {
    'process.env': process.env
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      ...nodeStdlibBrowser
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      cors: false
    },
    host: '0.0.0.0'
  },
  build: {
    target: 'esnext', // Enable Big integer literals
    commonjsOptions: {
      transformMixedEsModules: true // Enable @walletconnect/web3-provider which has some code in CommonJS
    },
    rollupOptions: {
      plugins: [
        inject({
          global: [require.resolve('node-stdlib-browser/helpers/esbuild/shim'), 'global'],
          process: [require.resolve('node-stdlib-browser/helpers/esbuild/shim'), 'process'],
          Buffer: [require.resolve('node-stdlib-browser/helpers/esbuild/shim'), 'Buffer']
        })
      ]
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext', // to enable nable Big integer literals
      inject: [require.resolve('node-stdlib-browser/helpers/esbuild/shim')]
    }
  }
})
