interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // 自定义的环境变量
  readonly VITE_IMG_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
interface ViteEnv {
  VITE_PORT: number
  VITE_PUBLIC_PATH: string
  VITE_GLOB_APP_TITLE: string
  VITE_GLOB_APP_SHORT_NAME: string
  VITE_DROP_CONSOLE: boolean
  VITE_GLOB_IMG_URL: string
  VITE_PROXY: [string, string][]
}
