/*
 * @Author: Cxy
 * @Date: 2021-03-06 21:50:10
 * @LastEditors: Cxy
 * @LastEditTime: 2021-07-23 12:04:06
 * @FilePath: \learnBookd:\blog\blogweb\src\components\subgroups\messageBox\messageBox.js
 */
import vue from 'vue'
import messageBoxVue from './messageBox.vue'
const MessageBox = vue.extend(messageBoxVue)

/**
 * @Author: Cxy
 * @description: 全局弹框
 * @param {*} msg  提示信息
 * @param {*} dia_Type info -- 信息提示  success -- 成功提示  wran -- 警告提示  faild -- 错误提示
 * @return {*}
 */
async function messageBox_Constructor(msg, dia_Type = 'info') {
  const dia_Dom = new MessageBox({
    data() {
      return {
        msg,
        dia_Type,
        diaLog_SH: true
      }
    }
  })
  const dia_Ele = dia_Dom.$mount().$el
  document.body.appendChild(dia_Ele)
  // 异步等待值返回后执行以下销毁动作
  return await dia_Dom.diaLog_return().then(res => {
    return Promise.resolve(res)
  }).catch(rej => {
    return Promise.reject(rej)
  })
}

messageBox_Constructor.install = (Vue) => {
  Vue.prototype.$MsgBox = messageBox_Constructor
}

export default messageBox_Constructor
