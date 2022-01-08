/*
 * @Descripttion:
 * @Author: Cxy
 * @Date: 2021-09-11 15:58:00
 * @LastEditors: Cxy
 * @LastEditTime: 2021-11-13 16:25:04
 * @FilePath: \blog\blogweb\src\components\subgroups\toolTip\index.js
 */
import toolTip from './toolTip.vue'
toolTip.install = function(Vue) {
  Vue.component(toolTip.name, toolTip)
}
export default toolTip
