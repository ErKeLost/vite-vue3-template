import type { ProxyOptions } from 'vite'
// import { getEnvConfig } from '../../../.env-config'
/**
 * Used to parse the .env.development proxy configuration
 */
type ProxyItem = [string, string]

type ProxyList = ProxyItem[]

type ProxyTargetList = Record<
  string,
  // eslint-disable-next-line no-unused-vars
  ProxyOptions & { rewrite: (path: string) => string }
>

const httpsRE = /^https:\/\//
/**
 * 设置网络代理
 * @param viteEnv - vite环境描述
 */
// export function createProxy(viteEnv: ImportMetaEnv) {
//   const isOpenProxy = viteEnv.VITE_HTTP_PROXY === 'true'
//   if (!isOpenProxy) return undefined

//   const { http } = getEnvConfig(viteEnv)

//   const proxy: Record<string, string | ProxyOptions> = {
//     [http.proxy]: {
//       target: http.url,
//       changeOrigin: true,
//       rewrite: (path) => path.replace(new RegExp(`^${http.proxy}`), '')
//     }
//   }

//   return proxy
// }

/**
 * Generate proxy
 * @param list
 */
export function createViteProxy(list: ProxyList = []) {
  const ret: ProxyTargetList = {}
  console.log(list)

  for (const [prefix, target] of list) {
    const isHttps = httpsRE.test(target)

    // https://github.com/http-party/node-http-proxy#options
    ret[prefix] = {
      target: target,
      changeOrigin: true,
      ws: true,
      rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ''),
      // https is require secure=false
      ...(isHttps ? { secure: false } : {})
    }
  }
  return ret
}
