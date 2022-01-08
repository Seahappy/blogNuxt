/*
 * @Author: Cxy
 * @Date: 2021-03-04 15:11:54
 * @LastEditors: Cxy
 * @LastEditTime: 2021-12-02 16:51:18
 * @FilePath: \blog\blogweb\src\http\model\user.js
 */

import { get, post } from '../base.js'

export const get_Token = (query) => get({ url: '/api/getToken', query: { params: query }})

export const check_Token = (query) => get({ url: '/api/checkToken', query })

export const reg_Admin = (body) => post({ url: '/api/reg', body })

export const router_Data = (body) => post({ url: '/api/routerData', body })

export const get_All_Registered_Users = (query) => get({ url: '/api/getAllRegisteredUsers', query: { params: query }})

export const unfreezing_Person = (body) => post({ url: '/api/unfreezingPerson', body })

export const save_Basic_Settings = (body) => post({ url: '/api/saveBasicSettings', body })
