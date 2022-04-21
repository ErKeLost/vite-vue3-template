/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, any>
  export default component
}
/**
 * env环境类型
 * - dev: 后台开发环境
 * - test: 后台测试环境
 * - prod: 后台生产环境
 */
type EnvType = 'dev' | 'test' | 'prod'

interface ImportMetaEnv {
  /** 项目基本地址 */
  readonly VITE_PUBLIC_PATH: string
  /** 全局title属性 */
  readonly VITE_GLOB_APP_TITLE: string
  /** App */
  readonly VITE_GLOB_APP_SHORT_NAME: string
  /** 打包问题console问题 */
  readonly VITE_DROP_CONSOLE: boolean
  /** 全局BASE IMG URL */
  readonly VITE_GLOB_IMG_URL: string
  /** 打包优化 */
  readonly VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none'
  /** 打包优化删除源文件 */
  readonly VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean
  //** 项目基本端口 */
  readonly VITE_PORT: number
  /** 项目名称 */
  readonly VITE_APP_NAME: string
  /** 项目标题 */
  readonly VITE_APP_TITLE: string
  /** 项目描述 */
  readonly VITE_APP_DESC: string
  /**
   * 权限路由模式:
   * - static - 前端声明的静态
   * - dynamic - 后端返回的动态 */
  readonly VITE_AUTH_ROUTE_MODE: 'static' | 'dynamic'
  /** vite环境类型 */
  readonly VITE_ENV_TYPE?: EnvType
  /** 开启请求代理 */
  readonly VITE_IS_PROXY?: 'true' | 'false'
  /** 代理请求地址 */
  readonly VITE_PROXY?: [string, string][]
  /** 是否开启打包文件大小结果分析 */
  readonly VITE_VISUALIZER?: 'true' | 'false'
  /** hash路由模式 */
  readonly VITE_HASH_ROUTE?: 'true' | 'false'
}
