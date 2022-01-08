/*
 * @Descripttion:
 * @Author: Cxy
 * @Date: 2021-12-27 18:08:03
 * @LastEditors: Cxy
 * @LastEditTime: 2022-01-04 17:34:05
 * @FilePath: \blog\blogNuxt\plugins\filters.js
 */
import Vue from 'vue'

const dataFilterMathods = (UTCDateString, APM) => {
  function formatFunc(str) {
    return String(str).padStart(2, '0')
  }
  const dt = new Date(UTCDateString)
  const y = dt.getFullYear()
  const m = formatFunc(dt.getMonth() + 1)
  const d = formatFunc(dt.getDate())
  let hh = dt.getHours()
  const mm = formatFunc(dt.getMinutes())
  const ss = formatFunc(dt.getSeconds())
  if (APM !== 'APM') {
    hh = formatFunc(hh)
    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
  } else {
    const noon = hh >= 12 ? '下午' : '上午' // 判断是上午还是下午
    hh = hh >= 12 ? hh - 12 : hh // 12小时制
    return `${noon} ${hh}:${mm}`
  }
}

// 注册全局日期方法
Vue.filter('dateFilter', dataFilterMathods)

export default dataFilterMathods
