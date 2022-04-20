// import type { RouteRecordRaw } from 'vue-router'
import { useTitle } from '@vueuse/core'
// import { isNavigationFailure, Router } from 'vue-router'
import { Router } from 'vue-router'
import { routes } from './modules'
const whitePathList: string[] = [] // no redirect whitelist

export function createRouterGuards(router: Router) {
  routes.forEach((route) => {
    router.addRoute(route)
  })
  router.beforeEach(async (to, from, next) => {
    next()
    if (whitePathList.includes(to.path)) {
      next()
      return
    }
  })
  router.afterEach(async (to: any, _, failure) => {
    useTitle(to.meta.title)
    console.log(failure)
    console.log(router.getRoutes())
  })
}
