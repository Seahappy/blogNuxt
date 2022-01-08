/*
 * @Descripttion:
 * @Author: Cxy
 * @Date: 2021-12-27 20:58:12
 * @LastEditors: Cxy
 * @LastEditTime: 2021-12-27 20:58:12
 * @FilePath: \blog\blogNuxt\until\index.js
 */

/**
 * @description: 计算字符串字符长度
 * @param {*} str
 * @return {*} length
 */
export const getBLen = (str) => {
  if (str == null) return 0
  if (typeof str !== 'string') {
    str += ''
  }
  return str.replace(/[^\x00-\xff]/g, '00').length
}
