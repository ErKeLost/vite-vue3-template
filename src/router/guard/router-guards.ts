// import type { RouteRecordRaw } from 'vue-router'
import { useTitle } from '@vueuse/core'
// import { isNavigationFailure, Router } from 'vue-router'
import { Router } from 'vue-router'
import { RouteConstant } from '@/enums/routeEnum'
// import { routes } from './modules'
// import constantRoutes from '../base/router-constant'
const whitePathList: string[] = [] // no redirect whitelist
export const routeName = (key: any) => key

export function createRouterGuards(router: Router) {
  router.beforeEach(async (to, from, next) => {
    // constantRoutes.forEach((route) => {
    //   router.addRoute(route)
    // })
    // 权限路由已经加载，仍然未找到，重定向到not-found
    if (to.name === routeName(RouteConstant)) {
      console.log(to.name)

      next({ name: routeName(RouteConstant), replace: true })
      return false
    }
    console.log(router.getRoutes())
    next()
    if (whitePathList.includes(to.path)) {
      next()
      return
    }
  })
  router.afterEach(async (to: any, _, failure) => {
    useTitle(to.meta.title)
    console.log(failure)
  })
}
