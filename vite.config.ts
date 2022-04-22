import { resolve } from 'path'
import type { UserConfig, ConfigEnv } from 'vite'
import { loadEnv } from 'vite'
import { createVitePlugins } from './build/vite/plugin'
import { OUTPUT_DIR } from './build/constant'
import { createViteProxy } from './build/vite/config/proxy'
import { wrapperEnv } from './build/utils'
import { viteDefine } from './build/vite/config/define'
function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}
// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  const viteEnv = wrapperEnv(env)
  // const { VITE_PUBLIC_PATH } = viteEnv
  const { VITE_PUBLIC_PATH, VITE_PROXY } = viteEnv
  console.log(VITE_PUBLIC_PATH)

  const isBuild = command === 'build'
  return {
    base: '/',
    resolve: {
      alias: [
        {
          find: /\/#\//,
          replacement: pathResolve('types') + '/'
        },
        {
          find: '@',
          replacement: pathResolve('src') + '/'
        }
      ]
    },
    css: {
      preprocessorOptions: {
        // 全局引入了 scss 的文件
        scss: {
          additionalData: `
        @import "@/styles/variables.scss";
      `,
          javascriptEnabled: true
        }
      }
    },
    build: {
      // 类型: boolean | 'esbuild' | 'terser'
      // 默认为 `esbuild`
      // minify: 'esbuild',
      // 产物目标环境
      // 为了线上的稳定性，最好还是将 target 参数设置为ECMA语法的最低版本es2015/es6。
      // target: 'modules',
      // 如果 minify 为 terser，可以通过下面的参数配置具体行为
      // https://terser.org/docs/api-reference#minify-options
      // terserOptions: {}
      minify: 'terser',
      outDir: OUTPUT_DIR,
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
      },
      // 设置 CSS 的目标环境  需要兼容安卓端微信的 webview 时， 需要将 build.cssTarget 设置为 chrome61
      cssTarget: ''
    },
    server: {
      host: true, // host设置为true才可以使用network的形式，以ip访问项目
      port: 8081, // 端口号
      // open: true, // 自动打开浏览器
      cors: true, // 跨域设置允许
      strictPort: true, // 如果端口已占用直接退出
      // 接口代理
      proxy: createViteProxy(VITE_PROXY)
      // proxy: {
      //   '/api': {
      //     // 本地 8000 前端代码的接口 代理到 8888 的服务端口
      //     target: 'http://localhost:8888/',
      //     changeOrigin: true, // 允许跨域
      //     rewrite: (path) => path.replace('/api/', '/')
      //   }
      // }
    },
    define: viteDefine,
    optimizeDeps: {
      // 按需加载的依赖都可以声明到这个数组里
      // 配置为一个字符串数组，将 `lodash-es` 和 `vue`两个包强制进行预构建
      include: ['@vueuse/core', 'vue']
    },
    plugins: createVitePlugins(viteEnv, isBuild)
  }
}
