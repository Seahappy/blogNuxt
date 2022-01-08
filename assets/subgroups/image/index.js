/*
 * @Descripttion:
 * @Author: Cxy
 * @Date: 2021-10-19 16:35:12
 * @LastEditors: Cxy
 * @LastEditTime: 2021-11-13 16:46:33
 * @FilePath: \blog\blogweb\src\components\subgroups\image\index.js
 */
import image from './image.vue'

image.install = function(Vue) {
  Vue.component(image.name, image)
}

export { image }
