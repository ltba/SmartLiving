import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    vue(),
  ],
  
  // 路径别名
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  
  // 开发服务器配置
  server: {
    port: 5173,
    // 代理后端 API
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      }
    }
  },
  
  // 构建配置 - 重点在这里！
  build: {
    // 输出目录：编译到 Spring Boot 的 static 目录
    outDir: '../src/main/resources/static',
    
    // 清空输出目录（每次构建前清空）
    emptyOutDir: true,
    
    // 静态资源目录
    assetsDir: 'assets',
    
    // 不生成 sourcemap（生产环境）
    sourcemap: false,
    
    // Rollup 打包配置
    rollupOptions: {
      output: {
        // 自定义文件名格式
        entryFileNames: 'assets/js/[name]-[hash].js',
        chunkFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    }
  }
})
