import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production'
  ? '/chd104/g4/front/'
  : '/',
  build: {
    outDir: 'front'
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // server:{
  //   host:'10.1.14.214' //輸入自己ip位址
  // }
})
