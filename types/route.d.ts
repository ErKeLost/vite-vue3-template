
/** 权限路由相关类型 */
declare namespace AppRouteRecordRaw {
  /** 多级路由分割符号 */
  type RouteSplitMark = '_'
  export type Component<T extends any = any> =
    | ReturnType<typeof defineComponent>
    | (() => Promise<typeof import('*.vue')>)
    | (() => Promise<T>)
  /** 路由的key */
  type RouteKey =
    // 固定的路由
    | 'root' // 根路由
    | 'login'
    | 'not-found'
    | 'not-permission'
    | 'not-service'
  // 自定义路由
  /** 路由的path */
  type RoutePath =
    | '/'
    | Exclude<KeyToPath<RouteKey>, '/root' | 'not-found'>
    | SingleRouteParentPath
    | '/:pathMatch(.*)*'

  /**
   * 路由的组件
   * - basic - 基础布局，具有公共部分的布局
   * - blank - 空白布局
   * - multi - 多级路由布局(三级路由或三级以上时，除第一级路由和最后一级路由，其余的采用该布局)
   * - self - 作为子路由，使用自身的布局(作为最后一级路由，没有子路由)
   */
  // type RouteComponent = 'basic' | 'blank' | 'multi' | 'self'

  /** 路由描述 */
  type RouteMeta = {
    /** 路由标题(可用来作document.title或者菜单的名称) */
    title: string
    /** 路由的动态路径 */
    dynamicPath?: PathToDynamicPath<'/login'>
    /** 作为单级路由的父级路由布局组件 */
    singleLayout?: Extract<RouteComponent, 'basic' | 'blank'>
    /** 需要登录权限 */
    requiresAuth?: boolean
    /**
     * 哪些类型的用户有权限才能访问的路由(空的话则表示不需要权限)
     * @description 后端动态路由数据不需要该属性，直接由后端根据用户角色返回对应权限的路由数据
     */
    permissions?: Auth.RoleType[]
    /** 缓存页面 */
    keepAlive?: boolean
    /** 菜单和面包屑对应的图标 */
    icon?: string
    /** 是否在菜单中隐藏 */
    hide?: boolean
    /** 外链链接 */
    href?: string
    /** 路由顺序，可用于菜单的排序 */
    order?: number
    /** 表示是否是多级路由的中间级路由(用于转换路由数据时筛选多级路由的标识，定义路由时不用填写) */
    multi?: boolean
  }
  interface Meta {
    // 名称
    title: string
    // 是否忽略权限
    ignoreAuth?: boolean
    permissions?: string[]
    // 是否不缓存
    noKeepAlive?: boolean
    // 是否固定在tab上
    affix?: boolean
    // tab上的图标
    icon?: string
    // 跳转地址
    frameSrc?: string
    // 外链跳转地址
    externalLink?: string
    //隐藏
    hidden?: boolean
  }

  interface Menu {
    title: string
    label: string
    key: string
    meta: RouteMeta
    name: string
    component?: Component | string
    components?: Component
    children?: AppRouteRecordRaw[]
    props?: Recordable
    fullPath?: string
    icon?: any
    path: string
    permissions?: string[]
    redirect?: string
    sort?: number
  }

  /** 单个路由的类型结构(动态路由模式：后端返回此类型结构的路由) */
  interface Route {
    /** 路由名称(路由唯一标识) */
    name: RouteKey
    /** 路由路径 */
    path: RoutePath
    /** 路由重定向 */
    redirect?: RoutePath
    /**
     * 路由组件
     * - basic: 基础布局，具有公共部分的布局
     * - blank: 空白布局
     * - multi: 多级路由布局(三级路由或三级以上时，除第一级路由和最后一级路由，其余的采用该布局)
     * - self: 作为子路由，使用自身的布局(作为最后一级路由，没有子路由)
     */
    component?: RawRouteComponent
    /** 子路由 */
    children?: Route[]
    /** 路由描述 */
    meta: RouteMeta
    /** 路由属性 */
    props?: boolean | Record<string, any> | ((to: any) => Record<string, any>)
  }

  /** 前端导入的路由模块 */
  type RouteModule = Record<string, { default: AuthRoute.Route }>

  /** 单独一级路由的key (单独路由需要添加一个父级路由用于应用布局组件) */
  type SingleRouteKey = Exclude<
    GetSingleRouteKey<RouteKey>,
    GetRouteFirstParentKey<RouteKey> | 'root' | 'not-found-page'
  >
  /** 单独路由父级路由key */
  type SingleRouteParentKey = `${SingleRouteKey}-parent`

  /** 单独路由父级路由path */
  type SingleRouteParentPath = KeyToPath<SingleRouteParentKey>

  /** 路由key转换路由path */
  type KeyToPath<Key extends string> =
    Key extends `${infer Left}_${infer Right}`
      ? KeyToPath<`${Left}/${Right}`>
      : `/${Key}`

  /** 路由path转换动态路径 */
  type PathToDynamicPath<Path extends RoutePath> =
    | `${Path}/:module`
    | `${Path}/:module(${string})`
    | `${Path}/:module(${string})?`

  /** 获取一级路由(包括有子路由的一级路由) */
  type GetSingleRouteKey<Key extends RouteKey> =
    Key extends `${infer _Left}${RouteSplitMark}${infer _Right}` ? never : Key

  /** 获取子路由的一级父路由 */
  type GetRouteFirstParentKey<Key extends RouteKey> =
    Key extends `${infer Left}${RouteSplitMark}${infer _Right}` ? Left : never
}
