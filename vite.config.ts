/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'widget-entry.ts'),
      name: 'WeatherWidget',
      fileName: 'weather-widget',
      formats: ['es', 'umd']
    },
    rollupOptions: {
      // By NOT externalizing 'vue' or 'pinia', they will be bundled inside the widget.
      // This is ideal for distributing via a CDN as a truly standalone script.
      // If publishing to NPM for other Vue apps, you might want to add: external: ['vue']
      external: [],
      output: {
        globals: {}
      }
    }
  },
  test: {
    environment: 'jsdom',
  },
})
