import { lingui } from '@lingui/vite-plugin'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import rollupNodePolyFill from 'rollup-plugin-polyfill-node'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vanillaExtractPlugin(),
    react({
      babel: {
        plugins: ['babel-plugin-macros'],
      },
    }),
    lingui(),
    svgr({
      include: ['**/*.svg', '**/*.svg?component'],
      exclude: ['**/*.svg?url', '**/*.svg?raw'],
    }),
  ],
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    alias: {
      process: 'process/browser',
      path: 'path-browserify',
      stream: 'stream-browserify',
      // 添加 src 目录别名
      '@src': resolve(__dirname, './src'),
      polyfills: resolve(__dirname, './src/polyfills'),
      tracing: resolve(__dirname, './src/tracing'),
      connection: resolve(__dirname, './src/connection'),
      featureFlags: resolve(__dirname, './src/featureFlags'),
      lib: resolve(__dirname, './src/lib'),
      theme: resolve(__dirname, './src/theme'),
      nft: resolve(__dirname, './src/nft'),
      constants: resolve(__dirname, './src/constants'),
      hooks: resolve(__dirname, './src/hooks'),
      analytics: resolve(__dirname, './src/analytics'),
      components: resolve(__dirname, './src/components'),
      utils: resolve(__dirname, './src/utils'),
      state: resolve(__dirname, './src/state'),
      assets: resolve(__dirname, './src/assets'),
      pages: resolve(__dirname, './src/pages'),
      abis: resolve(__dirname, './src/abis'),
      rpc: resolve(__dirname, './src/rpc'),
      types: resolve(__dirname, './src/types'),
      locales: resolve(__dirname, './src/locales'),
      dev: resolve(__dirname, './src/dev'),
    },
  },
  build: {
    rollupOptions: {
      plugins: [
        // Enable rollup polyfills plugin used during production bundling
        rollupNodePolyFill(),
      ],
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
    include: ['big.js'],
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
  // worker: {
  //   format: 'es',
  // },
  assetsInclude: ['**/*.woff', '**/*.woff2'],
  server: {
    port: 3000,
  },
  publicDir: 'public',
  envPrefix: 'REACT_APP_',
})
