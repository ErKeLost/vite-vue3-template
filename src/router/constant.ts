import { RouteConstant } from '@/enums/routeEnum'
export const PAGE_NOT_FOUND_NAME = RouteConstant.PAGE_NOT_FOUND
export const PAGE_NOT_PERMISSION_NAME = RouteConstant.PAGE_NOT_PERMISSION
export const PAGE_NOT_FOUND_PAGE_NAME = RouteConstant.PAGE_NOT_FOUND_PAGE
export const PAGE_NOT_SERVICE_NAME = RouteConstant.PAGE_NOT_SERVICE
export const PAGE_ROOT_NAME = RouteConstant.PAGE_ROOT
export const PAGE_LOGIN_NAME = RouteConstant.PAGE_LOGIN
export const PAGE_REDIRECT_NAME = RouteConstant.PAGE_REDIRECT_NAME
export const NotPermission = () => import('@/views/exception/403.vue')
export const NotFound = () => import('@/views/exception/404.vue')
export const NotService = () => import('@/views/exception/500.vue')
export const Login = () => import('@/views/login/index.vue')
export const BlankLayout = () => import('@/layout/BlankLayout/index.vue')
export const BasicLayout = () => import('@/layout/BasicLayout/index.vue')
