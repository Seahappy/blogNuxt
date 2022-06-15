/*
 * @Descripttion:
 * @Author: Cxy
 * @Date: 2022-06-14 15:33:24
 * @LastEditors: Cxy
 * @LastEditTime: 2022-06-14 15:33:25
 * @FilePath: \ehomes-admind:\gitHubBlog\blogNuxt\plugins\socketIo.js
 */
import Vue from 'vue'
import io from 'socket.io-client'

class SocketIO {
  serviceIP = '/'
  socket = null
  init() {
    this.socket = io(this.serviceIP, {
      path: '/SeaHappy-Blog', // 路径与后端协商一致即可通信
      transports: ['websocket'],
      autoConnect: false, // 是否自动连接
      auth: {
        token: ''
      }
    })
    // 报错重连
    this.socket.on('connect_error', err => {
      this.connect()
      throw err
    })
  }
  // 发送广播
  emit(path, ...data) {
    this.socket.emit(path, ...data)
  }
  // 手动连接
  connect() {
    this.socket.connect() // 同open()
  }
  // 手动关闭
  disconnect() {
    this.socket.disconnect() // 同close()
    this.socket = null // 重置socket防止重复推送消息
  }
}

const socket = new SocketIO()
Vue.prototype.SK = Vue.SK = socket
