/*
 * @Author: Cxy
 * @Date: 2021-07-22 20:47:37
 * @LastEditors: Cxy
 * @LastEditTime: 2021-11-13 15:57:09
 * @FilePath: \blog\blogweb\src\http\model\music.js
 */
import { get } from '../base.js'

export const recommend_Songs = () => get({ url: '/music/recommend/songs?timerstamp=' + Date.now() })

export const login_Status = () => get({ url: '/music/login/status?timerstamp=' + Date.now() })

export const login_Qr_Key = () => get({ url: '/music/login/qr/key?timerstamp=' + Date.now() })

export const login_Qr_Create = (query) => get({ url: '/music/login/qr/create?timerstamp=' + Date.now(), query: { params: query }})

export const captcha_Sent = (query) => get({ url: '/music/captcha/sent?timerstamp=' + Date.now(), query: { params: query }})

export const captcha_verify = (query) => get({ url: '/music/captcha/verify?timerstamp=' + Date.now(), query: { params: query }})

export const register_Cellphone = (query) => get({ url: '/music/register/cellphone?timerstamp=' + Date.now(), query: { params: query }})

export const login_Cellphone = (query) => get({ url: '/music/login/cellphone?timerstamp=' + Date.now(), query: { params: query }})

export const logout = (query) => get({ url: '/music/logout?timerstamp=' + Date.now(), query: { params: query }})

export const login_Qr_Check = (query) => get({ url: '/music/login/qr/check?timerstamp=' + Date.now(), query: { params: query }})

export const song_Url = (query) => get({ url: '/music/song/url', query: { params: query }})

export const top_Song = (query) => get({ url: '/music/top/song?type=7', query: { params: query }})

export const personal_Fm = (query) => get({ url: '/music/personal_fm?timerstamp=' + Date.now(), query: { params: query }})

export const fm_Trash = (query) => get({ url: '/music/fm_trash', query: { params: query }})

export const like = (query) => get({ url: '/music/like?timerstamp=' + Date.now(), query: { params: query }})

export const likelist = (query) => get({ url: '/music/likelist?timerstamp=' + Date.now(), query: { params: query }})
