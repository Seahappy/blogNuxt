/*
 * @Descripttion:
 * @Author: Cxy
 * @Date: 2022-06-14 10:52:46
 * @LastEditors: Cxy
 * @LastEditTime: 2022-06-14 10:55:10
 * @FilePath: \ehomes-admind:\gitHubBlog\blogNuxt\http\model\live.js
 */
import { get, post } from '../base.js'

export const get_Live_Broadcast = (query) => get({ url: '/api/getLiveBroadcast', query: { params: query }})

export const set_Live_Heat = (body) => post({ url: '/api/setLiveHeat', body })
