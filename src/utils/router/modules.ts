// import { consoleError } from '../common'
import { RouteRecordRaw } from 'vue-router'
/**
 * 权限路由排序
 * @param routes - 权限路由
 */
function sortRoutes(routes: RouteRecordRaw[]) {
  return routes.sort(
    (next, pre) => Number(next.meta?.sort) - Number(pre.meta?.sort)
  )
}
// type RouteModule = Record<string, { default: Route }>
/**
 * 处理全部导入的路由模块
 * @param modules - 路由模块
 */
export function handleModuleRoutes(modules: any) {
  const routeModuleList: RouteRecordRaw[] = []
  Object.keys(modules).forEach((key) => {
    const mod = modules[key].default || {}
    const modList = Array.isArray(mod) ? [...mod] : [mod]
    if (modList) {
      routeModuleList.push(...modList)
    } else {
      // consoleError(`路由模块解析出错: key = ${key}`);
    }
  })
  return sortRoutes(routeModuleList)
}
