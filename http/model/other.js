/*
 * @Author: Cxy
 * @Date: 2021-07-08 10:58:35
 * @LastEditors: Cxy
 * @LastEditTime: 2021-12-10 16:17:20
 * @FilePath: \blog\blogweb\src\http\model\other.js
 */

import { get, post } from '../base.js'

export const Views_Totle = () => get({ url: '/api/ViewsTotle' })

export const Website_Message = (body) => post({ url: '/api/WebsiteMessage', body })

export const Get_Website_Message = () => get({ url: '/api/GetWebsiteMessage' })

export const delete_Website_Message = (body) => post({ url: '/api/deleteWebsiteMessage', body })

export const Time_Line_Data = (query) => get({ url: '/api/TimeLineData', query: { params: query }})

export const get_System_Data = (body) => post({ url: '/api/getSystemData', body })

export const get_Network_Data = (query) => get({ url: '/api/getNetworkData', query: { params: query }})

export const set_Network_Data = (body) => post({ url: '/api/setNetworkData', body })

export const get_Network_Flow_Data = (body) => post({ url: '/api/getNetworkFlowData', body })

export const get_Network_Point_Data = () => get({ url: '/api/getNetworkPointData' })

export const get_Network_Online_Data = () => get({ url: '/api/getNetworkOnlineData' })

export const set_Real_IP_Location = (body) => post({ url: '/api/setRealIPLocation', body })

export const get_Map_Josn_Data = (body) => post({ url: '/api/getMapJosnData', body })
