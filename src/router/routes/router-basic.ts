import { RouteRecordRaw } from 'vue-router'
import {
  PAGE_NOT_FOUND_NAME,
  PAGE_NOT_FOUND_PAGE_NAME,
  PAGE_NOT_PERMISSION_NAME,
  PAGE_NOT_SERVICE_NAME,
  PAGE_LOGIN_NAME,
  PAGE_ROOT_NAME,
  NotPermission,
  NotFound,
  NotService,
  Login
} from '../constant'
// import type { AppRouteRecordRaw } from '@/router/types'
export const RedirectName = 'Redirect'

// export const ErrorPageRoute: AppRouteRecordRaw = {
// export const constantRoutes: AppRouteRecordRaw.Route[] = [
// export const constantRoutes: AppRouteRecordRaw.Route[] = [
export const notFound: RouteRecordRaw[] = [
  // 匹配无效路径的路由
  {
    path: '/:pathMatch(.*)*',
    name: PAGE_NOT_FOUND_PAGE_NAME,
    component: NotFound
  }
]
export const otherErrorRoutes: Array<RouteRecordRaw> = [
  {
    path: '/not-permission',
    name: PAGE_NOT_PERMISSION_NAME,
    meta: {
      title: '没有查看当前页面权限'
    },
    component: NotPermission
  },
  {
    path: '/not-found',
    name: PAGE_NOT_FOUND_NAME,
    meta: {
      title: '页面未找到'
    },
    component: NotFound
  },
  {
    path: '/not-service',
    name: PAGE_NOT_SERVICE_NAME,
    meta: {
      title: '服务器错误'
    },
    component: NotService
  }
]

export const baseRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: PAGE_LOGIN_NAME,
    component: Login
  },
  {
    path: '/',
    name: PAGE_ROOT_NAME,
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
export default [...otherErrorRoutes, ...baseRoutes, ...notFound]
