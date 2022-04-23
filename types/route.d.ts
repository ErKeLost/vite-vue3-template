import type { RouteRecordRaw, RouteMeta } from 'vue-router';
import type { MenuOption } from 'naive-ui';
import { RoleEnum } from '/@/enums/roleEnum';

export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>);

export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  path: string
  name: string
  meta?: RouteMeta
  component?: Component | string
  components?: Component
  children?: AppRouteRecordRaw[]
  props?: Recordable
  fullPath?: string
}
