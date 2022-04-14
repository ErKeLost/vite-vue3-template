import pkg from '../../../package.json'
import dayjs from 'dayjs'

/** 项目构建时间 */
const { dependencies, devDependencies, name, version } = pkg
const PROJECT_BUILD_TIME = JSON.stringify(dayjs().format('YYYY-MM-DD HH:mm:ss'))
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: PROJECT_BUILD_TIME
}
export const viteDefine = {
  PROJECT_BUILD_TIME,
  __APP_INFO__
}
