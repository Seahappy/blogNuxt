/*
 * @Author: Cxy
 * @Date: 2021-02-27 23:02:14
 * @LastEditors: Cxy
 * @LastEditTime: 2022-01-12 17:55:50
 * @FilePath: \blog\blogNuxt\store\index.js
 */

import { Views_Totle } from '@/http/model/other.js'

export const state = () => ({
  app_Background_Url: 'background-image: url(/home/backGroundImage' + new Date().getDay() + '.jpg);'
})

export const mutations = {
  /**
   * @description: 全局跳转详情页
   */
  jump_info_Blog(_, routeData) {
    const { id_Article, currentPageJump } = routeData
    $nuxt.$router.push({ name: 'infoBlog', query: id_Article ? { id_Article } : { id_Article: routeData }, params: { currentPageJump }})
  },
  /**
   * @description: 全局跨端口跳转记录
   */
  jump_port_Record(_, { routeUrl }) {
    $nuxt.$MsgBox('是否跳转到登录页', 'wran').then(_ => {
      window.location.href = 'https://www.seahappy.xyz:8080/Login?path=' + routeUrl
    }).catch(_ => {
      $nuxt.$Msg('操作已取消', 'success')
    })
  }
}

export const actions = {
  async nuxtServerInit({ commit, dispatch }) {
    const Views_Totle_Res = await Views_Totle()
    commit('mixed/set_Home_Poetry', Views_Totle_Res.data.data.data)
    await dispatch('article/Article_Tag_Find')
  }
}
