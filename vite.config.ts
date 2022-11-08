import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 如果编辑器提示 path 模块找不到，则可以安装一下 @types/node -> npm i @types/node -D
import { resolve } from 'path'
import { viteMockServe } from 'vite-plugin-mock'
import viteCompression from 'vite-plugin-compression'
import styleImport, { VantResolve } from 'vite-plugin-style-import'

export default defineConfig({
  plugins: [
    vue(),
    styleImport({
      resolves: [VantResolve()]
    }),
    viteMockServe({
      // default
      mockPath: 'mock'
    }),
    viteCompression()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src') // 设置 `@` 指向 `src` 目录
    }
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        // 生产环境时移除console
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: '[ext]/[name]-[hash].[ext]'
      }
    }
  }
})
