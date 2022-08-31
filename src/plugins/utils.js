import { exportExcel } from './xlsx'
import { exportExcel as exportExcel3 } from './exceljs'
import { genData } from './genData'
export default {
  install(app) {
    // install(app, router) {
    // app.config.globalProperties.$move = (url, params = null, type) => {
    //   const { push, replace } = router
    //   const moveFn = type === 'replace' ? replace : push
    //   const urlType = url.includes('/') ? 'path' : 'name'
    //   moveFn({ [urlType]: url }, params)
    // }
    app.config.globalProperties.$downXlsx = exportExcel
    app.config.globalProperties.$downExcel = exportExcel3
    app.config.globalProperties.$genData = genData
  },
}
