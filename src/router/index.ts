import { App } from 'vue'
import {
  createRouter,
  createWebHashHistory,
  createWebHistory
  // RouteRecordRaw
} from 'vue-router'
// import { routes } from './modules'
const { VITE_HASH_ROUTE = 'false', VITE_BASE_URL } = import.meta.env
import constantRoutes from './base/router-constant'
// import { RedirectRoute } from '@/router/base'
// // import { PageEnum } from '@/enums/pageEnum'
import { createRouterGuards } from './guard/router-guards'
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
  history:
    VITE_HASH_ROUTE === 'false'
      ? createWebHashHistory(VITE_BASE_URL)
      : createWebHistory(VITE_BASE_URL),
  // routes: [...routes, ...constantRoutes],
  routes: [...constantRoutes],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export async function setupRouter(app: App) {
  app.use(router)
  // 创建路由守卫
  createRouterGuards(router)
  await router.isReady()
}

export default router
// export * from './modules'
