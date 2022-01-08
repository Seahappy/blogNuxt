/*
 * @Descripttion:
 * @Author: Cxy
 * @Date: 2021-12-27 20:48:43
 * @LastEditors: Cxy
 * @LastEditTime: 2022-01-04 17:34:42
 * @FilePath: \blog\blogNuxt\plugins\subgroups.js
 */

import Vue from 'vue'
import massage from '~/assets/subgroups/massage'
import messageBox from '~/assets/subgroups/messageBox'
import { tabs, tabPane } from '~/assets/subgroups/tabs'
import toolTip from '~/assets/subgroups/toolTip'
import { table, loading } from '~/assets/subgroups/table'
import { image } from '~/assets/subgroups/image'
import { paging } from '~/assets/subgroups/paging'
import {
  button,
  checkBox,
  form,
  input
} from '~/assets/subgroups/from'

const components = [
  massage,
  messageBox,
  tabs,
  tabPane,
  toolTip,
  button,
  checkBox,
  form,
  input,
  table,
  loading,
  image,
  paging
]

const install = (Vue) => {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
  /* $MsgBox 弹窗全局注册 */
  Vue.prototype.$MsgBox = messageBox
  /* $Msg 提示信息全局注册 */
  Vue.prototype.$Msg = massage
  /* $Msg Vue实例上添加 */
  Vue.msg_Constructor = massage
}

Vue.use(install)
