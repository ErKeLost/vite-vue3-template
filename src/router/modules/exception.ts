import { RouteRecordRaw } from 'vue-router'
/**
 * @param name 路由名称, 必须设置,且不能重名
 * @param meta 路由元信息（路由附带扩展信息）
 * @param redirect 重定向地址, 访问这个路由时,自定进行重定向
 * @param meta.disabled 禁用整个菜单
 * @param meta.title 菜单名称
 * @param meta.icon 菜单图标
 * @param meta.keepAlive 缓存该路由
 * @param meta.sort 排序越小越排前
 *
 * */
const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/exception',
    name: 'Exception',
    redirect: '/exception/403',
    component: () => import('@/layout/BlankLayout/index.vue'),
    meta: {
      title: '异常页面',
      sort: 3
    },
    children: [
      {
        path: '403',
        name: 'exception-403',
        meta: {
          title: '没有查看当前页面权限'
        },
        component: () => import('@/views/exception/403.vue')
      },
      {
        path: '404',
        name: 'exception-404',
        meta: {
          title: '页面未找到'
        },
        component: () => import('@/views/exception/404.vue')
      },
      {
        path: '500',
        name: 'exception-500',
        meta: {
          title: '服务器错误'
        },
        component: () => import('@/views/exception/500.vue')
      }
    ]
  }
]

export default constantRoutes
