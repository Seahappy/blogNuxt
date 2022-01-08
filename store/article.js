/*
 * @Descripttion:
 * @Author: Cxy
 * @Date: 2021-12-27 17:42:34
 * @LastEditors: Cxy
 * @LastEditTime: 2022-01-04 17:31:41
 * @FilePath: \blog\blogNuxt\store\article.js
 */

import { articleTag_Find } from '@/http/model/article.js'

export const state = () => ({
  Article_Tag_Total: [], // 存放标签数据
  Article_Default_BG: '/logo/blogBackGround.jpg'
})

export const mutations = {
  /**
   * @description: 标签数据整理赋值
   */
  handle_Article_Tag(state, payload) {
    state.Article_Tag_Total = payload.filter(r => {
      r.tag_Color = r.tag_Color.replace(/hsla\((.*),(.*),(.*),1\)/g, 'hsla($1,40%,40%,1)')
      return r.sort_ArticelTag > 0
    })
  }
}

export const actions = {
  /**
   * @description: 获取标签数据
   */
  Article_Tag_Find({ commit }, payload) {
    return new Promise((resolve, reject) => {
      articleTag_Find(payload).then((res) => {
        const { code, massage, data } = res.data
        if (code === 200) {
          commit('handle_Article_Tag', data.data || [])
          resolve(data.data)
        } else {
          $nuxt.msg_Constructor(massage, 'wran')
        }
      }).then(err => {
        reject(err)
      })
    })
  }
}
