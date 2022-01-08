/*
 * @Descripttion:
 * @Author: Cxy
 * @Date: 2021-09-11 19:37:12
 * @LastEditors: Cxy
 * @LastEditTime: 2022-01-04 16:39:36
 * @FilePath: \blog\blogNuxt\assets\subgroups\tabs\index.js
 */
import tabs from './tab.vue'
import tabPane from './tabPane.vue'

tabs.install = function(Vue) {
  Vue.component(tabs.name, tabs)
}

tabPane.install = function(Vue) {
  Vue.component(tabPane.name, tabPane)
}

export { tabs, tabPane }
