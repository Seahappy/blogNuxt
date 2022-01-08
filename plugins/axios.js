/*
 * @Author: Cxy
 * @Date: 2021-03-04 15:12:05
 * @LastEditors: Cxy
 * @LastEditTime: 2022-01-04 17:34:00
 * @FilePath: \blog\blogNuxt\plugins\axios.js
 */

import Vue from 'vue'

export default ({ $axios, app: { router }}) => {
  // 添加请求拦截器
  $axios.interceptors.request.use(config => {
    // config.headers['x-real-ip'] = 'jjjjjjjjj'
    // 在发送请求之前做些什么
    return config
  }, error => {
    // 对请求错误做些什么
    return Promise.reject(error)
  })

  // 添加响应拦截器
  $axios.interceptors.response.use(response => {
    const { remainingTime, massage } = response.data
    if (remainingTime) {
      router.push({ name: 'error', query: { remainingTime, massage }})
    }
    // 对响应数据做点什么
    return response
  }, error => {
    // 对响应错误做点什么
    return Promise.reject(error)
  })
  Vue.prototype.Axios = Vue.Axios = $axios
}
