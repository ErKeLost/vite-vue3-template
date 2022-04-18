import { App } from 'vue'
import {
  createRouter,
  createWebHashHistory,
  // createWebHistory,
  RouteRecordRaw
} from 'vue-router'
// import { RedirectRoute } from '@/router/base'
// // import { PageEnum } from '@/enums/pageEnum'
// import { createRouterGuards } from './router-guards'
// import { handleModuleRoutes } from "@/utils/router/modules";
const modules = import.meta.globEager('./modules/**/*.ts')
// const routes = handleModuleRoutes(modules);
console.log(modules)

const routeModuleList: RouteRecordRaw[] = []

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  routeModuleList.push(...modList)
})

function sortRoute(a: any, b: any) {
  return (a.meta?.sort || 0) - (b.meta?.sort || 0)
}

routeModuleList.sort(sortRoute)

// export const RootRoute: RouteRecordRaw = {
//   path: '/',
//   name: 'Root',
//   // redirect: PageEnum.BASE_HOME,
//   redirect: '',
//   meta: {
//     title: 'Root'
//   }
// }

// export const LoginRoute: RouteRecordRaw = {
//   path: '/login',
//   name: 'Login',
//   component: () => import('@/views/login/index.vue'),
//   meta: {
//     title: '登录'
//   }
// }

// //需要验证权限
// export const asyncRoutes = [...routeModuleList]

// //普通路由 无需验证权限
// export const constantRouter: any[] = [LoginRoute, RootRoute, RedirectRoute]

const router = createRouter({
  history: createWebHashHistory(''),
  routes: routeModuleList,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export function setupRouter(app: App) {
  app.use(router)
  // 创建路由守卫
  // createRouterGuards(router)
}

export default router
// export * from './modules'
