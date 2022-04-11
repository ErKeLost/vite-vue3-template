import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteEslint from 'vite-plugin-eslint'
import VueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import Unocss from 'unocss/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Inspect from 'vite-plugin-inspect'
import Pages from 'vite-plugin-pages'
import svgLoader from 'vite-svg-loader'
import OptimizationPersist from 'vite-plugin-optimize-persist'
import PkgConfig from 'vite-plugin-package-config'
// import { ConfigEnv } from 'vite'
// import viteImagemin from 'vite-plugin-imagemin'
// "vite-plugin-imagemin": "^0.6.1",
import { VueUseComponentsResolver } from 'unplugin-vue-components/resolvers'
function pathResolve(dir: string) {
  return path.resolve(process.cwd(), '.', dir)
}
// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    // alias: {
    //   '~/': `${path.resolve(__dirname, 'src')}/`
    // }
    alias: [
      {
        find: '~',
        replacement: pathResolve('src') + '/'
      }
    ]
  },
  css: {
    preprocessorOptions: {
      // 全局引入了 scss 的文件
      scss: {
        // charset: false,
        additionalData: `
      @import "~/styles/variables.scss";
    `,
        javascriptEnabled: true
      }
    }
  },
  build: {
    minify: 'terser',
    brotliSize: false,
    // assets 样式 内联打包问题
    // assetsInlineLimit: 8 * 1024
    // 消除打包大小超过500kb警告
    chunkSizeWarningLimit: 2000,
    // 在生产环境移除console.log
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    assetsDir: 'static/assets',
    // 静态资源打包到dist下的不同目录
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
      }
    }
  },
  server: {
    host: true, // host设置为true才可以使用network的形式，以ip访问项目
    port: 8080, // 端口号
    // open: true, // 自动打开浏览器
    cors: true, // 跨域设置允许
    strictPort: true, // 如果端口已占用直接退出
    // 接口代理
    proxy: {
      '/api': {
        // 本地 8000 前端代码的接口 代理到 8888 的服务端口
        target: 'http://localhost:8888/',
        changeOrigin: true, // 允许跨域
        rewrite: (path) => path.replace('/api/', '/')
      }
    }
  },
  optimizeDeps: {
    // 按需加载的依赖都可以声明到这个数组里
    // 配置为一个字符串数组，将 `lodash-es` 和 `vue`两个包强制进行预构建
    include: ['@vueuse/core', 'vue']
  },
  plugins: [
    vue(),

    VueJsx(),
    // https://github.com/hannoeru/vite-plugin-pages
    Pages(),
    Inspect(), // 仅适用于开发模式
    viteEslint(),
    PkgConfig(),
    // vite need esm browser ? i dont test this plugin  // 2022 . 3 . 12
    legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    }),
    Unocss(),
    svgLoader(),
    AutoImport({
      dts: './src/auto-imports.d.ts',
      // imports: ['vue', '@vueuse/core'],
      // Generate corresponding .eslintrc-auto-import.json file.
      // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
      imports: ['vue', 'vue/macros', 'vue-router', 'pinia', '@vueuse/core'],
      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
      // resolvers: [ElementPlusResolver()]
      // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      resolvers: [
        // Auto import icon components
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon'
        })
      ]
    }),
    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: './src/components.d.ts',
      extensions: ['vue', 'tsx'],
      deep: true,
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/, /\.tsx$/],
      // imports 指定组件所在位置，默认为 src/components
      dirs: ['src/components/', 'src/layout/', 'src/views'],
      resolvers: [
        // IconsResolver({
        //   enabledCollections: ['a']
        // }),
        IconsResolver(),
        VueUseComponentsResolver()
      ]
    }),
    Icons({
      compiler: 'vue3',
      autoInstall: true
    }),
    // viteImagemin({
    //   // 无损压缩配置，无损压缩下图片质量不会变差
    //   optipng: {
    //     optimizationLevel: 7
    //   },
    //   // 有损压缩配置，有损压缩下图片质量可能会变差
    //   pngquant: {
    //     quality: [0.8, 0.9]
    //   },
    //   // svg 优化
    //   svgo: {
    //     plugins: [
    //       {
    //         name: 'removeViewBox'
    //       },
    //       {
    //         name: 'removeEmptyAttrs',
    //         active: false
    //       }
    //     ]
    //   }
    // }),
    OptimizationPersist()
  ]
})
