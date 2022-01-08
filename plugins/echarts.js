/*
 * @Descripttion:
 * @Author: Cxy
 * @Date: 2021-12-27 14:41:13
 * @LastEditors: Cxy
 * @LastEditTime: 2022-01-04 17:34:03
 * @FilePath: \blog\blogNuxt\plugins\echarts.js
 */
import Vue from 'vue'
import * as echarts from 'echarts/core'
import 'echarts-wordcloud'
import 'default-passive-events' // 阻止默认事件解决谷歌报警告
import { GraphChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { TooltipComponent } from 'echarts/components'
echarts.use([GraphChart, CanvasRenderer, TooltipComponent])
Vue.prototype.$echarts = echarts
