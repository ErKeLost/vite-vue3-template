import { RouteRecordRaw } from 'vue-router'

// import type { AppRouteRecordRaw } from '@/router/types'
export const RedirectName = 'Redirect'

export const NotPremission = () => import('@/views/exception/403.vue')
export const NotFound = () => import('@/views/exception/404.vue')
export const NotService = () => import('@/views/exception/500.vue')
// export const ErrorPageRoute: AppRouteRecordRaw = {
// export const constantRoutes: AppRouteRecordRaw.Route[] = [
// export const constantRoutes: AppRouteRecordRaw.Route[] = [
export const errorRoutes: Array<RouteRecordRaw> = [
  {
    path: '/not-permission',
    name: 'not-permission',
    meta: {
      title: '没有查看当前页面权限'
    },
    component: () => import('@/views/exception/403.vue')
  },
  {
    path: '/not-found',
    name: 'not-found',
    meta: {
      title: '页面未找到'
    },
    component: () => import('@/views/exception/404.vue')
  },
  {
    path: '/not-service',
    name: 'not-service',
    meta: {
      title: '服务器错误'
    },
    component: () => import('@/views/exception/500.vue')
  },
  // 匹配无效路径的路由
  {
    name: 'not-found-page',
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/exception/404.vue')
  }
]

export const baseRoutes: RouteRecordRaw[] = [
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login/index.vue')
  },
  {
    name: 'root',
    path: '/',
    redirect: '/login'
  }
]
// export const RedirectRoute: AppRouteRecordRaw = {
// export const RedirectRoute: any = {
//   path: '/redirect',
//   name: RedirectName,
//   component: Layout,
//   meta: {
//     title: RedirectName,
//     hideBreadcrumb: true
//   },
//   children: [
//     {
//       path: '/redirect/:path(.*)',
//       name: RedirectName,
//       component: () => import('@/views/redirect/index.vue'),
//       meta: {
//         title: RedirectName,
//         hideBreadcrumb: true
//       }
//     }
//   ]
// }
export default [...errorRoutes, ...baseRoutes]
