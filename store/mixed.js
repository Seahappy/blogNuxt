/*
 * @Descripttion:
 * @Author: Cxy
 * @Date: 2021-12-27 17:45:03
 * @LastEditors: Cxy
 * @LastEditTime: 2022-01-04 17:33:39
 * @FilePath: \blog\blogNuxt\store\mixed.js
 */

import { set_Real_IP_Location } from '@/http/model/other.js'

export const state = () => ({
  current_Position: '',
  current_R_Q: [],
  now_Weather: {},
  air_Weather: {},
  FiveDay_Weather: [],
  now_Weather_Day_Night: 'd',
  Hot_City: [],
  home_Poetry: '',
  public_IP: ''
})

export const mutations = {
  set_geographical_Position(state, payload) {
    const { addressComponent, position } = payload
    state.current_Position = (addressComponent.city || '') + (addressComponent.city === addressComponent.district ? '' : (addressComponent.district || ''))
    state.current_R_Q = [position.R, position.Q]
  },
  set_Now_Weather(state, payload) {
    state.now_Weather = Object.assign({}, state.now_Weather, payload.now)
  },
  set_Air_Weather(state, payload) {
    state.air_Weather = payload
  },
  set_FiveDay_Weather(state, payload) {
    const { FiveDay_Weather, now_Weather_Day_Night } = payload
    state.FiveDay_Weather = FiveDay_Weather
    state.now_Weather_Day_Night = now_Weather_Day_Night
  },
  set_Hot_City(state, payload) {
    state.Hot_City = payload
  },
  set_Home_Poetry(state, { home_Poetry, public_IP }) {
    state.home_Poetry = home_Poetry
    state.public_IP = public_IP
  }
}

export const actions = {
  get_geographical_Position({ dispatch }) {
    AMap.plugin('AMap.Geolocation', function() {
      var geolocation = new AMap.Geolocation({
        animateEnable: true,
        enableHighAccuracy: true, // 是否使用高精度定位，默认:true
        timeout: 10000, // 超过10秒后停止定位，默认：5s
        // buttonPosition: 'RB',    //定位按钮的停靠位置
        // buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        showButton: false
        // zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点
      })
      geolocation.getCurrentPosition(async function(status, result) {
        if (status === 'complete') {
          dispatch('location_integration', result)
        } else {
          if (localStorage.getItem('position_Information')) {
            dispatch('location_integration', JSON.parse(localStorage.getItem('position_Information')))
          } else {
            dispatch('get_City_Position')
          }
          throw result
        }
      })
    })
  },
  get_City_Position({ dispatch }) {
    AMap.plugin('AMap.CitySearch', function() {
      var geolocation = new AMap.CitySearch({
        animateEnable: true,
        enableHighAccuracy: true, // 是否使用高精度定位，默认:true
        timeout: 10000, // 超过10秒后停止定位，默认：5s
        // buttonPosition: 'RB',    //定位按钮的停靠位置
        // buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        showButton: false
        // zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点
      })
      geolocation.getLocalCity(async function(status, result) {
        if (status === 'complete') {
          const { rectangle, city } = result
          const position_Region = rectangle.split(';')
          const R = (Number(position_Region[0].split(',')[0]) + Number(position_Region[1].split(',')[0])) / 2
          const Q = (Number(position_Region[0].split(',')[1]) + Number(position_Region[1].split(',')[1])) / 2
          const res = { position: { R, Q }, addressComponent: { city }}
          dispatch('location_integration', res)
        } else {
          dispatch('location_integration', { position: { R: 116.41, Q: 39.91 }, addressComponent: { district: '北京' }})
          $nuxt.msg_Constructor('定位失败请手动选择', 'wran')
          dispatch('get_Hot_City')
          throw result
        }
      })
    })
  },
  location_integration({ dispatch, commit }, arrangementResult) {
    const { position: { R, Q }} = arrangementResult
    localStorage.setItem('position_Information', JSON.stringify(arrangementResult))
    commit('set_geographical_Position', arrangementResult)
    dispatch('get_Now_Weather', R.toFixed(2) + ',' + Q.toFixed(2))
    dispatch('get_Now_air', R.toFixed(2) + ',' + Q.toFixed(2))
    dispatch('get_5Day_Weather', R.toFixed(2) + ',' + Q.toFixed(2))
    const location_IP = (arrangementResult.addressComponent.city || '') + (arrangementResult.addressComponent.district || '') + (arrangementResult.addressComponent.street || arrangementResult.addressComponent.township || '')
    const county_IP = arrangementResult?.addressComponent?.district || ''
    const city_IP = arrangementResult?.addressComponent?.city || ''
    const province_IP = arrangementResult?.addressComponent?.province || ''
    if (province_IP) set_Real_IP_Location({ long_Lat: [R, Q], location_IP, county_IP, city_IP, province_IP }).then()
  },
  get_Now_Weather({ commit }, Latitude_Longitude) {
    fetch('https://devapi.qweather.com/v7/weather/now?key=d2ae781d61744d65a2ef2156eef2cb64&location=' + Latitude_Longitude).then(response =>
      response.json()
    ).then(res => {
      const { code, now } = res
      if (code === '200') {
        commit('set_Now_Weather', { now })
      }
    }).catch(err => { throw new Error(err) })
  },
  get_Now_air({ commit }, Latitude_Longitude) {
    fetch('https://devapi.qweather.com/v7/air/now?key=0e01a9db29f04f499e19e6f55bb1ba70&location=' + Latitude_Longitude).then(response =>
      response.json()
    ).then(res => {
      const { code, now } = res
      if (code === '200') {
        commit('set_Now_Weather', { now })
      }
    }).catch(err => { throw new Error(err) })
  },
  get_5Day_Weather({ commit }, Latitude_Longitude) {
    fetch('https://devapi.qweather.com/v7/weather/7d?key=d2ae781d61744d65a2ef2156eef2cb64&location=' + Latitude_Longitude).then(response =>
      response.json()
    ).then(res => {
      const { code, daily } = res
      if (code === '200') {
        const sunrise = Date.parse(new Date(daily[0].fxDate + ' ' + daily[0].sunrise))
        const sunset = Date.parse(new Date(daily[0].fxDate + ' ' + daily[0].sunset))
        const newDate = new Date().getTime()
        const now_Weather_Day_Night = (newDate > sunrise && newDate < sunset) ? 'd' : 'n'
        commit('set_FiveDay_Weather', { FiveDay_Weather: daily.filter((c, i) => i < 6), now_Weather_Day_Night })
      }
    }).catch(err => { throw new Error(err) })
  },
  get_Hot_City({ commit }) {
    fetch('https://geoapi.qweather.com/v2/city/top?number=8&range=cn&key=d2ae781d61744d65a2ef2156eef2cb64').then(response =>
      response.json()
    ).then(res => {
      const { code, topCityList } = res
      if (code === '200') {
        commit('set_Hot_City', topCityList.map(c => {
          c.adm11 = c.adm1
          c.adm1 = c.adm2
          c.adm2 = c.adm11
          return c
        }))
      }
    }).catch(err => { throw new Error(err) })
  }
}
