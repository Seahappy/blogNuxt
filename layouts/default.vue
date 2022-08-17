<!--
 * @Descripttion:
 * @Author: Cxy
 * @Date: 2021-12-27 19:40:31
 * @LastEditors: Cxy
 * @LastEditTime: 2022-08-15 01:25:51
 * @FilePath: \blogGitee\blogNuxt\layouts\default.vue
-->
<template>
  <div
    id='app'
    :style="{ backgroundImage: 'url(/homeBG/backGroundImage' + new Date().getHours() + '.png)'}">
    <div id='anchor_Point'/>
    <TopNav />
    <Nuxt />
    <Backtotop />
    <NavBottom />
  </div>
</template>

<script>
import TopNav from '~/components/navTopBottom/navTop'
import NavBottom from '~/components/navTopBottom/navBottom'
import Backtotop from '~/components/backtotop'
export default {
  components: {
    TopNav,
    NavBottom,
    Backtotop
  }
}
</script>

<style lang="less" scoped>
#app {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  overflow-y: scroll;
  background-size: cover;
  position: relative;
}
</style>
