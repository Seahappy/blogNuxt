/*
 * @Descripttion:
 * @Author: Cxy
 * @Date: 2021-11-29 14:56:23
 * @LastEditors: Cxy
 * @LastEditTime: 2021-11-29 15:04:21
 * @FilePath: \blog\blogweb\src\components\subgroups\paging\index.js
 */
import paging from './paging.vue'

paging.install = function(Vue) {
  Vue.component(paging.name, paging)
}

export { paging }
