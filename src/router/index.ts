import { App } from 'vue'
import {
  createRouter,
  createWebHashHistory
  // createWebHistory,
  // RouteRecordRaw
} from 'vue-router'
import { constantRoutes } from './router-constant'
// import { RedirectRoute } from '@/router/base'
// // import { PageEnum } from '@/enums/pageEnum'
import { createRouterGuards } from './router-guards'
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
// export const constantRouter: any[] = [constantRoutes]

const router = createRouter({
  history: createWebHashHistory(''),
  // history: VITE_HASH_ROUTE === 'true' ? createWebHashHistory(VITE_BASE_URL) : createWebHistory(VITE_BASE_URL),
  routes: constantRoutes,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export function setupRouter(app: App) {
  app.use(router)
  // 创建路由守卫
  createRouterGuards(router)
}

export default router
// export * from './modules'
