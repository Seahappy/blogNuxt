/*
 * @Author: Cxy
 * @Date: 2021-06-07 17:56:04
 * @LastEditors: Cxy
 * @LastEditTime: 2021-12-11 13:59:35
 * @FilePath: \blog\blogweb\src\http\model\role.js
 */

import { get, post } from '../base.js'

export const get_Power_Tree_Data = () => get({ url: '/api/getPowerTreeData' })

export const edit_Power_Tree = (body) => post({ url: '/api/editPowerTree', body })

export const delete_Power_Tree = (body) => post({ url: '/api/deletePowerTree', body })

export const get_Role_Data = (query) => get({ url: '/api/getRoleData', query: { params: query }})

export const edit_Role_Data = (body) => post({ url: '/api/editRoleData', body })

export const delete_Role_Data = (body) => post({ url: '/api/deleteRoleData', body })

export const user_Edit_Role = (body) => post({ url: '/api/userEditRole', body })
