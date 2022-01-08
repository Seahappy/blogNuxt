<!--
 * @Descripttion:
 * @Author: Cxy
 * @Date: 2021-08-31 11:18:06
 * @LastEditors: Cxy
 * @LastEditTime: 2021-11-13 16:25:37
 * @FilePath: \blog\blogweb\src\components\subgroups\table\loading.vue
-->
<template>
  <div class='LoadingUi'>
    <div/>
    <div/>
    <div/>
  </div>
</template>

<script>
export default {
  name: 'SHLoading'
}
</script>

<style lang="less" scoped>
.LoadingUi {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  div {
    width: 30px;
    height: 30px;
    margin: 0 10px;
    background: #8385aa;
    border-radius: 50%;
    animation: bouncing-loader 0.6s infinite alternate;
  }
  div:nth-child(2) {
    animation-delay: 0.2s;
  }
  div:nth-child(3) {
    animation-delay: 0.4s;
  }
  @keyframes bouncing-loader {
    to {
      opacity: 0.1;
      transform: translate3d(0, -16px, 0);
    }
  }
}
</style>
