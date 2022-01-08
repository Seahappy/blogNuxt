/*
 * @Author: Cxy
 * @Date: 2021-12-25 11:47:36
 * @LastEditors: Cxy
 * @LastEditTime: 2022-01-04 17:31:24
 * @FilePath: \blog\blogNuxt\nuxt.config.js
 */
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'SeaHappy',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '本站旨在为小伙伴们提供交流学习的平台，在此站点上每个人都可以通过注册以后可以发布个人文章，界面简介易操作' },
      { hid: 'keywords', name: 'keywords', content: '个人博客，博客，站点，个人站点，seahappy' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: 'https://webapi.amap.com/maps?v=1.4.15&key=9d4cc76ab06922f9c6de4b7640d9f2c8', defer: true }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/reset.css',
    'qweather-icons/font/qweather-icons.css',
    '~/assets/fonts/css/font-awesome.min.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios',
    { src: '~/plugins/echarts', mode: 'client' },
    '~/plugins/filters',
    '~/plugins/lunar',
    '~/plugins/subgroups',
    { src: '~/plugins/qrcode', mode: 'client' }
  ],

  // 禁用进度条
  loading: false,

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios'
  ],

  axios: {
    proxy: true
  },

  proxy: {
    '/api': {
      target: 'http://127.0.0.1:1314',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
      // secure: false, // 去除https证书校验
    }
  },

  server: {
    port: 3001
    // https: {
    //   key: fs.readFileSync('../2_www.seahappy.xyz.key'),
    //   cert: fs.readFileSync('../1_www.seahappy.xyz_bundle.crt')
    // }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
