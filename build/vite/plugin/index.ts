import type { Plugin } from 'vite'
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
import GlobPlugin from 'vite-plugin-glob'
import svgLoader from 'vite-svg-loader'
import OptimizationPersist from 'vite-plugin-optimize-persist'
import PkgConfig from 'vite-plugin-package-config'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import { VueUseComponentsResolver } from 'unplugin-vue-components/resolvers'
import { visualizer } from 'rollup-plugin-visualizer'
import { resolvePath } from '../../utils'
const vitePath = resolvePath('../../../', import.meta.url)
console.log(vitePath)

// import viteImagemin from 'vite-plugin-imagemin'
// "vite-plugin-imagemin": "^0.6.1",
export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  console.log(viteEnv, isBuild)
  const vitePlugins: (Plugin | Plugin[])[] = [
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
    GlobPlugin(),
    AutoImport({
      dts: './types/auto-imports.d.ts',
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
      dts: './types/components.d.ts',
      extensions: ['vue', 'tsx'],
      deep: true,
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/, /\.tsx$/],
      // imports 指定组件所在位置，默认为 src/components
      dirs: ['src/components/', 'src/layout/', 'src/views', 'src/assets'],
      resolvers: [
        // IconsResolver({
        //   enabledCollections: ['a']
        // }),
        IconsResolver({
          customCollections: ['custom'],
          componentPrefix: 'icon'
        }),
        VueUseComponentsResolver()
      ]
    }),
    Icons({
      compiler: 'vue3',
      customCollections: {
        custom: FileSystemIconLoader(`${vitePath.src}/assets/svg`)
      },
      scale: 1,
      defaultClass: 'inline-block',
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
    OptimizationPersist(),
    visualizer({
      // 打包完成后自动打开浏览器，显示产物体积报告
      open: true
    })
  ]
  return vitePlugins
}
