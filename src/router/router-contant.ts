// import type { AppRouteRecordRaw } from '@/router/types'
export const RedirectName = 'Redirect'

export const NotPremission = () => import('@/views/exception/403.vue')
export const NotFound = () => import('@/views/exception/404.vue')
export const NotService = () => import('@/views/exception/500.vue')

export const Layout = () => import('@/layout/index.vue')

export const ParentLayout = () => import('@/layout/parentLayout.vue')

// 404 on a page
// export const ErrorPageRoute: AppRouteRecordRaw = {
export const constantRoutes: AppRouteRecordRaw.Route[] = [
  {
    name: 'not-permission',
    path: '/not-permission',
    component: NotPremission,
    meta: {
      title: '没有查看当前页面权限',
      singleLayout: 'blank'
    }
  },
  {
    name: 'not-found',
    path: '/not-found',
    component: NotFound,
    meta: {
      title: '页面未找到',
      singleLayout: 'blank'
    }
  },
  {
    name: 'not-service',
    path: '/not-service',
    component: NotService,
    meta: {
      title: '服务器错误',
      singleLayout: 'blank'
    }
  },
  // 匹配无效路径的路由
  {
    name: 'not-found',
    path: '/:pathMatch(.*)*',
    component: NotFound,
    meta: {
      title: '页面未找到'
    }
  }
]

// export const RedirectRoute: AppRouteRecordRaw = {
export const RedirectRoute: any = {
  path: '/redirect',
  name: RedirectName,
  component: Layout,
  meta: {
    title: RedirectName,
    hideBreadcrumb: true
  },
  children: [
    {
      path: '/redirect/:path(.*)',
      name: RedirectName,
      component: () => import('@/views/redirect/index.vue'),
      meta: {
        title: RedirectName,
        hideBreadcrumb: true
      }
    }
  ]
}
