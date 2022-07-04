import { defineConfig } from 'vite'
import copy from 'rollup-plugin-copy'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), 
    copy({
    targets: [
      { src: 'node_modules/tinymce/*', dest: 'public/tinymce' }
    ]
  }),]
})
