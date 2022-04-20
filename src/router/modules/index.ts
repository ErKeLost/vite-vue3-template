import { handleModuleRoutes } from '@/utils/router/modules'
const modules = import.meta.globEager('./**/*.ts')
const routes = handleModuleRoutes(modules)

export { modules, routes }
