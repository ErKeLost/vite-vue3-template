import { App } from 'vue'
import AdnyLayout from '@erkelost/layout'
/**
 * 全局注册自定义组件 待完善
 * @param app
 */
const registerComponents = [AdnyLayout]
export function setupCustomComponents(app: App) {
  registerComponents.forEach((component) => {
    app.component(component.name, component)
  })
}
