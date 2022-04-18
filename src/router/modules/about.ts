import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/about',
    name: 'about',
    component: () => import('@/layout/index.vue'),
    meta: {
      sort: 10,
      isRoot: true,
      activeMenu: 'about_index'
    },
    children: [
      {
        path: 'index',
        name: `about_index`,
        meta: {
          title: '关于',
          activeMenu: 'about_index'
        },
        component: () => import('@/views/about/index.vue')
      }
    ]
  }
]

export default routes
