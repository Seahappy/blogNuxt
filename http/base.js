/*
 * @Author: Cxy
 * @Date: 2021-03-04 15:39:46
 * @LastEditors: Cxy
 * @LastEditTime: 2022-01-04 17:37:37
 * @FilePath: \blog\blogNuxt\http\base.js
 */
import Vue from 'vue'

// @post
export const post = (params, config = {}) => {
  return new Promise((resolve, reject) => {
    Vue.Axios.post(params.url, params.body, config).then(res => {
      if (res.status === 200) {
        resolve(res)
      } else {
        reject('请求失败')
      }
    }).catch(err => {
      throw err
    })
  })
}
// @get
export const get = (params) => {
  return new Promise((resolve, reject) => {
    Vue.Axios.get(params.url, params.query).then(res => {
      if (res.status === 200) {
        resolve(res)
      } else {
        reject('请求失败')
      }
    }).catch(err => {
      throw err
    })
  })
}
