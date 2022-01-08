/*
 * @Author: Cxy
 * @Date: 2021-03-02 16:54:18
 * @LastEditors: Cxy
 * @LastEditTime: 2021-08-30 16:46:48
 * @FilePath: \learnBookd:\blog\blogweb\src\components\subgroups\massage\massage.js
 */
import vue from 'vue'
import massageVue from './massage.vue'
//  创建一个子类 extend Vue构造器
const Massage = vue.extend(massageVue)
const msg_Height_Arr = []

/**
 * @Author: Cxy
 * @description: 全局提示信息
 * @param {*} msg  提示内容
 * @param {*} msg_Type  info -- 信息提示  success -- 成功提示  wran -- 警告提示  faild -- 错误提示
 * @param {*} duration  动画时间
 * @return {*}
 */
async function msg_Constructor(msg, msg_Type = 'info', duration = 2500) {
  //  俗称见缝插针逻辑
  let msg_Height_Index = 0
  if (msg_Height_Arr.length === 0) {
    msg_Height_Arr.push(1)
    msg_Height_Index = 0
  } else {
    msg_Height_Index = msg_Height_Arr.getArrIndexOf(0)
    if (msg_Height_Index === -1) {
      msg_Height_Arr.push(1)
      msg_Height_Index = msg_Height_Arr.length - 1
    } else {
      msg_Height_Arr[msg_Height_Index] = 1
    }
  }
  //  创建Msg提示信息类实例,data必需以函数形式返回
  const msg_Dom = new Massage({
    data() {
      return {
        msg,
        msg_Type,
        msg_Anima_Hide: true,
        msg_Height_Index
      }
    }
  })
  //  手动Msg挂载获取$el(Vue 实例使用的根 DOM 元素)
  const msg_Ele = msg_Dom.$mount()
  //  将Msg提示信息DOM挂在到body上
  document.body.appendChild(msg_Ele.$el)
  //  异步改同步等待动画完成
  await anima_Move(msg_Dom, duration)
  setTimeout(() => {
    //  当此位置动画完成时恢复默认值等待替换
    msg_Height_Arr[msg_Height_Index] = 0
    //  当提示信息退出动画完成时立即销毁DOM
    document.body.removeChild(msg_Ele.$el)
    //  彻底销毁组件
    msg_Ele.destroy_Dom()
    //  时间小于动画完成时间.5s消除异步操作DOM回到动画第一帧
  }, 480)
}
//  异步改同步等待动画完成
function anima_Move(msg_Dom, duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      msg_Dom.msg_Anima_Hide = false
      resolve()
    }, duration)
  })
}
//  查找数组元素下标
// eslint-disable-next-line no-extend-native
Array.prototype.getArrIndexOf = function getArrIndexOf(data) {
  for (let i = 0; i < this.length; i++) {
    if (this[i] === data) {
      return i
    }
  }
  return -1
}
//  向Vue实例上添加Msg的方法  https://cn.vuejs.org/v2/guide/plugins.html#%E5%BC%80%E5%8F%91%E6%8F%92%E4%BB%B6
msg_Constructor.install = (Vue) => {
  Vue.prototype.$Msg = msg_Constructor
}

export default msg_Constructor
