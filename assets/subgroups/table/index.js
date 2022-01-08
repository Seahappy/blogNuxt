/*
 * @Descripttion:
 * @Author: Cxy
 * @Date: 2021-09-11 21:32:13
 * @LastEditors: Cxy
 * @LastEditTime: 2021-11-13 16:25:34
 * @FilePath: \blog\blogweb\src\components\subgroups\table\index.js
 */
import table from './table.vue'
import loading from './loading.vue'

table.install = function(Vue) {
  Vue.component(table.name, table)
}

loading.install = function(Vue) {
  Vue.component(loading.name, loading)
}

export { loading, table }
